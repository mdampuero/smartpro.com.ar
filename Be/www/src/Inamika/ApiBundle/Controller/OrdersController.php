<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Inamika\BackEndBundle\Entity\Order;
use Inamika\BackEndBundle\Entity\Cart;
use Inamika\BackEndBundle\Entity\Log;
use Inamika\BackEndBundle\Entity\OrderItem;
use Inamika\BackEndBundle\Entity\OrderPay;
use Inamika\BackEndBundle\Entity\SinisterStatus;
use Inamika\BackEndBundle\Entity\Sinister;
use Inamika\BackEndBundle\Form\Order\OrderType;

class OrdersController extends FOSRestController
{   
    public function indexAction(Request $request){
        $search = $request->query->get('search', array());
        $query=(!isset($search['value']))?'':$search['value'];
        $offset = $request->query->get('start', 0);
        $limit = $request->query->get('length', 30);
        $sort = $request->query->get('sort', null);
        $direction = $request->query->get('direction', null);
        $recordsFiltered = $this->getDoctrine()->getRepository(Order::class)->searchTotal($query, $limit, $offset);
        return $this->handleView($this->view(array(
            'data' => $this->getDoctrine()->getRepository(Order::class)->search($query, $limit, $offset, $sort, $direction)->getQuery()->getResult(),
            'recordsTotal' => $this->getDoctrine()->getRepository(Order::class)->total(),
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
        if(!$entity=$this->getDoctrine()->getRepository(Order::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        return $this->handleView($this->view($entity));
    }

    public function todayAction(){
        $today=new \DateTime();
        return $this->handleView($this->view($this->getDoctrine()->getRepository(Order::class)->getAll()->andWhere('e.createdAt>=:today')->setParameter('today',$today->format('Y-m-d').' 00:00:00')->getQuery()->getResult()));
    }

    public function checkAction(Request $request){
        $entity = new Order();
        $form = $this->createForm(OrderType::class, $entity);
        $content=json_decode($request->getContent(), true);
        $form->submit($content);
        if ($form->isSubmitted() && $form->isValid()) {
            if(!key_exists('cart',$content) || !key_exists('items',$content["cart"]) || !count($content["cart"]["items"]))
                return $this->handleView($this->view($this->displayErrors('items','No hay productos en su carrito'), Response::HTTP_BAD_REQUEST));
            $cart=$this->getDoctrine()->getRepository(Cart::class)->find($content["cart"]["id"]);
            if($cart->getTotal()!=$content["total"])
                return $this->handleView($this->view($this->displayErrors('items','Los totales no coinciden'), Response::HTTP_BAD_REQUEST));
            if(!$cart->getCustomer()->getIsActive())
                return $this->handleView($this->view($this->displayErrors('items','El cliente no esta activo'), Response::HTTP_BAD_REQUEST));
            if($cart->getCustomer()->getSinister()->getIsDelete())
                return $this->handleView($this->view($this->displayErrors('items','El siniestro esta eliminado'), Response::HTTP_BAD_REQUEST));
            return $this->handleView($this->view($entity, Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));   
    }

    public function postAction(Request $request){
        $entity = new Order();
        $form = $this->createForm(OrderType::class, $entity);
        $content=json_decode($request->getContent(), true);
        $form->submit($content);
        if ($form->isSubmitted() && $form->isValid()) {
            if(!key_exists('cart',$content) || !key_exists('items',$content["cart"]) || !count($content["cart"]["items"]))
            return $this->handleView($this->view($this->displayErrors('items','No hay productos en su carrito'), Response::HTTP_BAD_REQUEST));
            $cart=$this->getDoctrine()->getRepository(Cart::class)->find($content["cart"]["id"]);
            if($cart->getTotal()!=$content["total"])
                return $this->handleView($this->view($this->displayErrors('items','Los totales no coinciden'), Response::HTTP_BAD_REQUEST));
            if(!$cart->getCustomer()->getIsActive())
                return $this->handleView($this->view($this->displayErrors('items','El cliente no esta activo'), Response::HTTP_BAD_REQUEST));
            if($cart->getCustomer()->getSinister()->getIsDelete())
                return $this->handleView($this->view($this->displayErrors('items','El siniestro esta eliminado'), Response::HTTP_BAD_REQUEST));
                
            /**
             * Guardo la orden
             */
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            foreach($cart->getItems() as $item){
                $orderItem= new OrderItem($item);
                $orderItem->setOrder($entity);
                $em->persist($orderItem);
            }
            
            /**
             * Guardo el pago
             */
            if($cart->getTotal()!=$cart->getCustomer()->getBalance()){
                if(key_exists('pay',$content) && key_exists('status',$content["pay"]) && $content["pay"]["status"]=="approved" && $content["pay"]["external_reference"]==$cart->getId()){
                    $orderPay=new OrderPay($content["pay"]);
                    $orderPay->setOrder($entity);
                    $em->persist($orderPay);
                }else{
                    return $this->handleView($this->view($this->displayErrors('items','Error al procesar el pago'), Response::HTTP_BAD_REQUEST));
                }
            }

            /**
             * Inactivo el usuario
             */
            $cart->getCustomer()->setIsActive(false);
            $em->persist($cart);
            
            $em->flush();

            /**
             * Guardo Log para siniestro
             */
            $log=new Log();
            $log->setUser($cart->getCustomer()->getName());
            $log->setResource($cart->getCustomer()->getSinister()->getId());
            $log->setTitle("Cambio de estado por nuevo pedido");
            $log->setIcon("fa fa-truck");
            $log->setStatus("primary");
            $log->setDescription("El siniestro cambió de estado por la finalización del pedido #".$entity->getId());
            $em->persist($log);

            /**
             * Guardo Log para orden
             */
            $log=new Log();
            $log->setUser($cart->getCustomer()->getName());
            $log->setResource($entity->getId());
            $log->setTitle("Nueva pedido");
            $log->setIcon("fa fa-truck");
            $log->setStatus("primary");
            $log->setDescription("Nuevo pedido #".$entity->getId()." por un total de $ ".number_format($entity->getTotal(), 0, ',', '.'));
            $em->persist($log);
            
            /**
             * Change estado de siniestro
             */
            $sinister=$cart->getCustomer()->getSinister();
            $sinister->setStatus($this->getDoctrine()->getRepository(SinisterStatus::class)->find(SinisterStatus::WAITING_FOR_PRODUCTS));
            $sinister->setOrder($entity);
            $em->persist($sinister);

            /**
             * Agrego los productos
             */
            //return $this->handleView($this->view($cart->getItems(), Response::HTTP_OK));
            $this->getDoctrine()->getRepository(Sinister::class)->addProductByOrder($cart,$cart->getItems());

            $em->flush();

            $this->sendEmails($entity);

            $this->clearCart($cart);
            return $this->handleView($this->view($entity, Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }

    private function clearCart($cart){
        $em = $this->getDoctrine()->getManager();
        foreach($cart->getItems() as $item){
            $em->remove($item);
        }
        $cart->getCustomer()->setBalance($cart->getCustomer()->getBalance()-$cart->getTotal());
        $cart->setTotal(0);
        $em->persist($cart);
        $em->flush();
    }

    private function sendEmails($entity){
         //SEND EMAIL ADMINISTRATOR
        $message = (new \Swift_Message($this->get('setting')->getData()->getTitle().' - Nueva orden #'.$entity->getId()))
        ->setFrom(array($this->get('setting')->getData()->getEmailFrom()=>$this->get('setting')->getData()->getTitle()))
        ->setTo($this->get('setting')->getData()->getEmailTo())
        ->setBody($this->renderView('InamikaApiBundle:Emails:Orders/post.html.twig', array('entity' => $entity)),'text/html');
        $this->get('mailer')->send($message);
        
        //SEND EMAIL CUSTOMER
        $message = (new \Swift_Message($this->get('setting')->getData()->getTitle().' - Gracias por tu compra'))
        ->setFrom(array($this->get('setting')->getData()->getEmailFrom()=>$this->get('setting')->getData()->getTitle()))
        ->setTo($entity->getCustomer()->getEmail())
        ->setBody($this->renderView('InamikaApiBundle:Emails:Orders/post_customer.html.twig', array('entity' => $entity)),'text/html');
        $this->get('mailer')->send($message);
        
        $cartItems=$entity->getCustomer()->getCart()->getItems();
       
        $emailsOrder=[];
        foreach($cartItems as $cartItem){
            if($cartItem->getProduct()->getProvider() && $cartItem->getProduct()->getProvider()->getIsAutoOrder() && $cartItem->getProduct()->getProvider()->getEmail()){
                $emailsOrder[$cartItem->getProduct()->getProvider()->getEmail()][]=$cartItem;
            }
        }
        foreach($emailsOrder as $email=>$orderEmail){
            //SEND EMAIL ORDER
            $message = (new \Swift_Message($this->get('setting')->getData()->getTitle().' - Order de compra'))
            ->setFrom(array($this->get('setting')->getData()->getEmailFrom()=>$this->get('setting')->getData()->getTitle()))
            ->setTo($email)
            //->setBcc($this->get('setting')->getData()->getEmailTo())
            ->setBody($this->renderView('InamikaApiBundle:Emails:Purchases/post.html.twig', array('products' => $orderEmail)),'text/html');
            $this->get('mailer')->send($message);
        }
    }

    public function deleteAction(Request $request,$id){
        if(!$entity=$this->getDoctrine()->getRepository(Order::class)->find($id))
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