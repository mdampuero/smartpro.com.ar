<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Inamika\BackEndBundle\Entity\Sinister;
use Inamika\BackEndBundle\Entity\Customer;
use Inamika\BackEndBundle\Entity\Log;
use Inamika\BackEndBundle\Entity\Cart;
use Inamika\BackEndBundle\Entity\SinisterStatus;
use Inamika\BackEndBundle\Form\Sinister\SinisterType;
use Inamika\BackEndBundle\Form\Customer\CustomerType;

class SinistersController extends FOSRestController
{   
    public function indexAction(Request $request){
        $search = $request->query->get('search', array());
        $query=(!isset($search['value']))?'':$search['value'];
        $offset = $request->query->get('start', 0);
        $limit = $request->query->get('length', 30);
        $sort = $request->query->get('sort', null);
        $direction = $request->query->get('direction', null);
        $recordsFiltered = $this->getDoctrine()->getRepository(Sinister::class)->searchTotal($query, $limit, $offset);
        return $this->handleView($this->view(array(
            'data' => $this->getDoctrine()->getRepository(Sinister::class)->search($query, $limit, $offset, $sort, $direction)->getQuery()->getResult(),
            'recordsTotal' => $this->getDoctrine()->getRepository(Sinister::class)->total(),
            'recordsFiltered' => $recordsFiltered,
            'offset' => $offset,
            'limit' => $limit,
            'pages' => (($recordsFiltered % $limit)>0)?(int)($recordsFiltered / $limit)+1:$recordsFiltered / $limit
        )));
    }
    
    private function displayErrors($field,$message){
        return [
            'form'=>[
                'errors'=>[
                    'children'=>[
                        $field=>[
                            'errors'=>[$message]
                        ]
                    ]
                ]
            ]
        ];
    }

    public function getAction($id){
        if(!$entity=$this->getDoctrine()->getRepository(Sinister::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        return $this->handleView($this->view($entity));
    }
    
    public function todayAction(){
        $today=new \DateTime();
        return $this->handleView($this->view($this->getDoctrine()->getRepository(Sinister::class)->getAll()->andWhere('e.createdAt>=:today')->setParameter('today',$today->format('Y-m-d').' 00:00:00')->getQuery()->getResult()));
    }

    public function byProductorAction($productor){
        return $this->handleView($this->view(array(
            'data'=>$this->getDoctrine()->getRepository(Sinister::class)->getAll()->andWhere('e.productor=:productor')->setParameter('productor',$productor)->getQuery()->getResult()
        )));
    }
   
    private function sendEmail($entity){
        //SEND EMAIL ADMINISTRATOR
        $message = (new \Swift_Message($this->get('setting')->getData()->getTitle().' - Nuevo siniestro #'.$entity->getSinister()->getNumber() ))
        ->setFrom(array($this->get('setting')->getData()->getEmailFrom()=>$this->get('setting')->getData()->getTitle()))
        ->setTo($this->get('setting')->getData()->getEmailTo())
        ->setBody($this->renderView('InamikaApiBundle:Emails:Sinister/post.html.twig', array('entity' => $entity)),'text/html');
        $this->get('mailer')->send($message);
        
        //SEND EMAIL CUSTOMER
        $message = (new \Swift_Message($this->get('setting')->getData()->getTitle() ))
        ->setFrom(array($this->get('setting')->getData()->getEmailFrom()=>$this->get('setting')->getData()->getTitle()))
        ->setTo($entity->getEmail())
        ->setBody($this->renderView('InamikaApiBundle:Emails:Sinister/welcome.html.twig', array('entity' => $entity)),'text/html');
        $this->get('mailer')->send($message);
    }

    public function postAction(Request $request){
        /**
         * Agrego Siniestro
         */
        $sinister = new Sinister();
        $formSinister = $this->createForm(SinisterType::class, $sinister);
        $content=json_decode($request->getContent(), true);
        $formSinister->submit($content);
        $em = $this->getDoctrine()->getManager();
        if ($formSinister->isSubmitted() && $formSinister->isValid()) {
            if($content["amount"]!==$content["amountRepeat"])
                return $this->handleView($this->view($this->displayErrors('amountRepeat','Los montos ingresados no son iguales'), Response::HTTP_BAD_REQUEST));
            $date = \DateTime::createFromFormat('Y-m-d', $content['date']);
            $sinister->setStatus($this->getDoctrine()->getRepository(SinisterStatus::class)->find(SinisterStatus::NEED_TO_DEFINE_PRODUCTS));
            $sinister->setDate($date);
            $em->persist($sinister);            
        }else{
            return $this->handleView($this->view($formSinister->getErrors(), Response::HTTP_BAD_REQUEST));
        }
        /**
         * Agrego el cliente
         */
        $customer = new Customer();
        $formCustomer = $this->createForm(CustomerType::class, $customer);
        $content=json_decode($request->getContent(), true);
        $formCustomer->submit($content);
        if ($formCustomer->isSubmitted() && $formCustomer->isValid()) {
            $customer->setBalance($sinister->getAmount());
            $customer->setUsername($sinister->getNumber());
            $customer->setPassword($customer->getDocument());
            $customer->setSinister($sinister);
            $em->persist($customer);    
        }else{
            return $this->handleView($this->view($formCustomer->getErrors(), Response::HTTP_BAD_REQUEST));
        }
        /**
         * Agrego su carrito
         */
        $cart=new Cart();
        $cart->setCustomer($customer);
        $em->persist($cart);
        /**
         * Guardo
         */
        $em->flush();

        /**
         * Guardo su Log
         */
        $log=new Log();
        $log->setUser($content["user"]);
        $log->setResource($sinister->getId());
        $log->setTitle("Nuevo");
        $log->setIcon("fa fa-star");
        $log->setStatus("warning");
        $log->setDescription("Siniestro creado Nº ".$sinister->getNumber()." de la compañia ".$sinister->getCompany()->getName()." por un monto de $ ".number_format($sinister->getAmount(), 0, ',', '.'));
        $em->persist($log);
        $em->flush();

        $this->sendEmail($customer);
        return $this->handleView($this->view($sinister, Response::HTTP_OK)); 
    }
    
    public function importAction(Request $request){
        $form = $this->createForm(ImportType::class, null);
        $content=json_decode($request->getContent(), true);
        $form->submit($content);
        if ($form->isSubmitted() && $form->isValid()) {
            $path='uploads/or/';
            $file=$this->get('Base64Service')->convertToFile($content["file"]["base64"],$path);
            try {
                $this->getDoctrine()->getRepository(Sinister::class)->import($path.$file);
                return $this->handleView($this->view("", Response::HTTP_OK));
            } catch (\Throwable $th) {
                return $this->handleView($this->view($th->getMessage(), Response::HTTP_BAD_REQUEST));
            }
            
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }
    
    public function changeSatusAction(Request $request,$id){
        if(!$entity=$this->getDoctrine()->getRepository(Sinister::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        $body=json_decode($request->getContent(), true);
        if(!$newStatus=$this->getDoctrine()->getRepository(SinisterStatus::class)->find($body["status"]))
            return $this->handleView($this->view(null, Response::HTTP_BAD_REQUEST));
        $em = $this->getDoctrine()->getManager();
        $entity->setStatus($newStatus);
        $em->persist($entity);
        $em->flush();
        return $this->handleView($this->view($entity, Response::HTTP_OK));
    }

    public function deleteAction(Request $request,$id){
        if(!$entity=$this->getDoctrine()->getRepository(Sinister::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        $form = $this->createFormBuilder(null, array('csrf_protection' => false))->setMethod('DELETE')->getForm();
        $form->submit(json_decode($request->getContent(), true));
        if ($form->isSubmitted() && $form->isValid()){
            $entity->setIsDelete(true);
            $this->getDoctrine()->getManager()->flush();
            return $this->handleView($this->view($entity, Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }

}