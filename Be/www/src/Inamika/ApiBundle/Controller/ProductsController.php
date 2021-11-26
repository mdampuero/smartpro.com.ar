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
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class ProductsController extends DefaultController
{   
    public function indexAction(Request $request){
        $search = $request->query->get('search', array());
        $inStock = $request->query->get('inStock', 1);
        $query=(!isset($search['value']))?'':$search['value'];
        $offset = $request->query->get('start', 0);
        $priceMin = $request->query->get('priceMin', 0);
        $priceMax = $request->query->get('priceMax', 0);
        $category = $request->query->get('category', 0);
        $limit = $request->query->get('length', 30);
        $sort = $request->query->get('sort', null);
        $direction = $request->query->get('direction', null);
        $filter=['priceMin'=>$priceMin,'priceMax'=>$priceMax,'category'=>$category,'inStock'=>$inStock];
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
    
    public function getListAction(Request $request){
        return $this->handleView($this->view(array(
            'data' => $this->getDoctrine()->getRepository(Product::class)->getAll()
            ->leftJoin('e.provider','p')
            ->select('e.id',"CONCAT(COALESCE(e.sku,''), ' - ',e.name) as name",'e.price','e.cost', '1 as amount','p.id as provider')
            ->getQuery()->getResult()
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
        ->andWhere('e.isSalient=:isSalient')->setParameter('isSalient',true)
        ->andWhere('e.inStock=:inStock')->setParameter('inStock',true)
        ->andWhere('e.price>:priceMin')->setParameter('priceMin',0)
        ->orderBy('RAND()')
        ->setMaxResults(100)
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

    public function downloadAction(){
        $phpExcelObject = $this->get('phpexcel')->createPHPExcelObject();
        $phpExcelObject->getProperties()->setCreator("SmartPro")
            ->setLastModifiedBy("SmartPro")
            ->setTitle("Lista de precios SmartPro")
            ->setSubject("Lista de precios SmartPro")
            ->setDescription("Este documento contiene la lista de precios de SmartPro");
        $data=$this->getDoctrine()->getRepository(Product::class)->getAll()
        ->orderBy('e.sku','DESC')
        ->getQuery()->getResult();
        
        $phpExcelObject->setActiveSheetIndex(0)
            ->setCellValue('A1','SKU')
            ->setCellValue('B1','Nombre')
            ->setCellValue('C1','Precio costo')
            ->setCellValue('D1','Precio venta')
            ;
        $row=2;
        foreach ($data as $key => $d) {
            $phpExcelObject->setActiveSheetIndex(0)
                ->setCellValue('A'.$row, $d->getSku())
                ->setCellValue('B'.$row, $d->getName())
                ->setCellValue('C'.$row, (String)round(($d->getCost()),2))
                ->setCellValue('D'.$row, (String)round(($d->getPrice()),2))
                ;
            $row++;
        }
        foreach(range('A','D') as $columnID) {
            $phpExcelObject->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
        }
        
        $phpExcelObject->getActiveSheet()->setTitle('Lista de precios');
        $phpExcelObject->setActiveSheetIndex(0);
        $writer = $this->get('phpexcel')->createWriter($phpExcelObject, 'CSV');
        $writer->setDelimiter(";");
        $writer->setEnclosure('"');
        $response = $this->get('phpexcel')->createStreamedResponse($writer);
        $dispositionHeader = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            'SmartProListaDePrecio'.date('d_m_Y_H_i').'.csv'
        );

        $response->headers->set('Content-Type', 'text/csv;');
        $response->headers->set('Pragma', 'public');
        $response->headers->set('Cache-Control', 'maxage=1');
        $response->headers->set('Content-Disposition', $dispositionHeader);

        return $response;
    }
    
    public function uploadAction(Request $request){
        $content=json_decode($request->getContent(), true);
        if(!key_exists("file",$content) || empty($content["file"]))
            return $this->handleView($this->view($this->displayErrors('file','</br>El archivo no es válido o esta vacío.'), Response::HTTP_BAD_REQUEST));
        $dataFile=explode("base64,",$content["file"]);
        $dataFileInfo=explode(":",$dataFile[0]);
        $dataFileExtension=explode("/",$dataFileInfo[1]);
        $extension=str_replace(";", "", $dataFileExtension[1]);
        if($extension!=='csv')
            return $this->handleView($this->view($this->displayErrors('file','</br>El formato del archivo no es válido o esta vacío.'), Response::HTTP_BAD_REQUEST));
        $fileName = md5(uniqid()).'.'.$extension;
        $data = base64_decode($dataFile[1]);
		$success = file_put_contents("uploads/".$fileName, $data);

        $em = $this->getDoctrine()->getManager();
        $i=0;
        if (($handle = fopen("uploads/".$fileName, "r")) !== FALSE) {            
            while (($data = fgetcsv($handle, null, ';')) !== FALSE) {
                $i++;
                if ($i<=1 || empty($data[0])) continue;
                if(!$product=$em->getRepository(Product::class)->findOneBySku($data[0]))
                    continue;
                $product->setCost($data[2]);
                $product->setPrice($data[3]);
                $em->persist($product);
                                
            }
            $em->flush();
            fclose($handle);
        }
        return $this->handleView($this->view("OK", Response::HTTP_OK));
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
}