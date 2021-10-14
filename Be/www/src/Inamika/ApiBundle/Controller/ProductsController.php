<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Inamika\BackEndBundle\Entity\Product;
use Inamika\BackEndBundle\Form\Product\ProductType;

class ProductsController extends DefaultController
{   
    public function indexAction(Request $request){
        $search = $request->query->get('search', array());
        $query=(!isset($search['value']))?'':$search['value'];
        $offset = $request->query->get('start', 0);
        $priceMin = $request->query->get('priceMin', 0);
        $priceMax = $request->query->get('priceMax', 0);
        $category = $request->query->get('category', 0);
        $limit = $request->query->get('length', 30);
        $sort = $request->query->get('sort', null);
        $direction = $request->query->get('direction', null);
        $filter=['priceMin'=>$priceMin,'priceMax'=>$priceMax,'category'=>$category];
        $recordsFiltered = $this->getDoctrine()->getRepository(Product::class)->searchTotal($query, $limit, $offset,$filter);
        return $this->handleView($this->view(array(
            'data' => $this->getDoctrine()->getRepository(Product::class)->search($query, $limit, $offset, $sort, $direction,$filter)->getQuery()->getResult(),
            'recordsTotal' => $this->getDoctrine()->getRepository(Product::class)->total(),
            'recordsFiltered' => $recordsFiltered,
            'offset' => $offset,
            'limit' => $limit,
            'pages' => (($recordsFiltered % $limit)>0)?(int)($recordsFiltered / $limit)+1:$recordsFiltered / $limit
        )));
    }
    
    public function getAction($id){
        if(!$entity=$this->getDoctrine()->getRepository(Product::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        return $this->handleView($this->view($entity));
    }
    public function getBySkuAction($sku){
        if(!$entity=$this->getDoctrine()->getRepository(Product::class)->findOneBySku($sku))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        return $this->handleView($this->view($entity));
    }
    public function similarAction($sku){
        if(!$entity=$this->getDoctrine()->getRepository(Product::class)->findOneBySku($sku))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        
        return $this->handleView($this->view($this->getDoctrine()->getRepository(Product::class)->search($entity->getTags(), 4, 0, null, null,null)
        ->andWhere("e.id<>:entity")->setParameter('entity',$entity->getId())
        ->getQuery()->getResult()));
    }
    
    public function salientsAction(){
        return $this->handleView($this->view($this->getDoctrine()->getRepository(Product::class)->getAll()
        ->andWhere('e.isSalient=:isSalient')
        ->setParameter('isSalient',true)
        ->orderBy('RAND()')
        ->setMaxResults(8)
        ->getQuery()->getResult()));
    }

    public function postAction(Request $request){
        $entity = new Product();
        $form = $this->createForm(ProductType::class, $entity);
        $form->submit(json_decode($request->getContent(), true));
        if ($form->isSubmitted() && $form->isValid()) {
            $entity->setPicture($this->base64ToFile($form->get('picture')->getData(),"uploads/"));
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
            return $this->handleView($this->view($entity, Response::HTTP_OK));
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
                $this->getDoctrine()->getRepository(Product::class)->import($path.$file);
                return $this->handleView($this->view("", Response::HTTP_OK));
            } catch (\Throwable $th) {
                return $this->handleView($this->view($th->getMessage(), Response::HTTP_BAD_REQUEST));
            }
            
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }
    
    public function putAction(Request $request,$id){
        if(!$entity=$this->getDoctrine()->getRepository(Product::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        $form = $this->createForm(ProductType::class, $entity);
        $form->submit(json_decode($request->getContent(), true));
        if ($form->isSubmitted() && $form->isValid()) {
            if($form->get('picture')->getData())
                $entity->setPicture($this->base64ToFile($form->get('picture')->getData(),"uploads/"));
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();
            return $this->handleView($this->view($entity, Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }

    public function deleteAction(Request $request,$id){
        if(!$entity=$this->getDoctrine()->getRepository(Product::class)->find($id))
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