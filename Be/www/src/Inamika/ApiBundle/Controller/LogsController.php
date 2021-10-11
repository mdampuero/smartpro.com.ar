<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Inamika\BackEndBundle\Entity\Log;
use Inamika\BackEndBundle\Form\Log\LogType;

class LogsController extends FOSRestController
{   
    public function indexAction(Request $request){
        $search = $request->query->get('search', array());
        $query=(!isset($search['value']))?'':$search['value'];
        $offset = $request->query->get('start', 0);
        $limit = $request->query->get('length', 30);
        $sort = $request->query->get('sort', null);
        $direction = $request->query->get('direction', null);
        $recordsFiltered = $this->getDoctrine()->getRepository(Log::class)->searchTotal($query, $limit, $offset);
        return $this->handleView($this->view(array(
            'data' => $this->getDoctrine()->getRepository(Log::class)->search($query, $limit, $offset, $sort, $direction)->getQuery()->getResult(),
            'recordsTotal' => $this->getDoctrine()->getRepository(Log::class)->total(),
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
        if(!$entity=$this->getDoctrine()->getRepository(Log::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        return $this->handleView($this->view($entity));
    }
    
    public function getByResourceAction($resource){
        return $this->handleView($this->view($this->getDoctrine()->getRepository(Log::class)->getAll()->andWhere('e.resource=:resource')->setParameter('resource',$resource)->getQuery()->getResult()));
    }

    public function postAction(Request $request){
        $entity = new Log();
        $form = $this->createForm(LogType::class, $entity);
        $form->submit(json_decode($request->getContent(), true));
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
            return $this->handleView($this->view($this->getDoctrine()->getRepository(Log::class)->getAll()->andWhere('e.resource=:resource')->setParameter('resource',$entity->getResource())->getQuery()->getResult(), Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }
    
    public function importAction(Request $request){
        $form = $this->createForm(ImportType::class, null);
        $content=json_decode($request->getContent(), true);
        $form->submit($content);
        if ($form->isSubmitted() && $form->isValid()) {
            $path='uploads/or/';
            $file=$this->get('Base64Service')->convertToFile($content["file"]["base64"],$path);
            try {
                $this->getDoctrine()->getRepository(Log::class)->import($path.$file);
                return $this->handleView($this->view("", Response::HTTP_OK));
            } catch (\Throwable $th) {
                return $this->handleView($this->view($th->getMessage(), Response::HTTP_BAD_REQUEST));
            }
            
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }
    
    public function putAction(Request $request,$id){
        if(!$entity=$this->getDoctrine()->getRepository(Log::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        $form = $this->createForm(LogType::class, $entity);
        $form->submit(json_decode($request->getContent(), true));
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
            return $this->handleView($this->view($entity, Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }

    public function deleteAction(Request $request,$id){
        if(!$entity=$this->getDoctrine()->getRepository(Log::class)->find($id))
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