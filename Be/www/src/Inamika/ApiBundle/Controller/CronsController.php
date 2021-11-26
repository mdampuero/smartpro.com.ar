<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Inamika\BackEndBundle\Entity\Provence;
use Inamika\BackEndBundle\Entity\Product;
use Inamika\BackEndBundle\Entity\Sinister;
use Inamika\BackEndBundle\Entity\Category;
use Inamika\BackEndBundle\Entity\Department;
use Inamika\BackEndBundle\Entity\Provider;
use Inamika\BackEndBundle\Entity\Locality;

class CronsController extends FOSRestController
{   
    public function updateDaysAction(){
        $this->getDoctrine()->getRepository(Sinister::class)->getAllNotClosed();
        return $this->handleView($this->view("OK"));
    }

    protected $setting=array(
        'uploads_directory'=>'uploads/or/',
        'resize'=>array(
            'xs'=>array(
                'width'=> 50,
                'height'=> null,
                'path'=> 'uploads/xs/',
            ),
            'sm'=>array(
                'width'=> 240,
                'height'=> null,
                'path'=> 'uploads/sm/',
            ),
            'md'=>array(
                'width'=> 480,
                'height'=> null,
                'path'=> 'uploads/md/',
            ),
            'lg'=>array(
                'width'=> 800,
                'height'=> null,
                'path'=> 'uploads/lg/',
            ),
            'xl'=>array(
                'width'=> 1920,
                'height'=> null,
                'path'=> 'uploads/xl/',
            )
        )
    );


    public function testAction(){
        $data=[
            "localidades"=> [
            [
            "categoria"=> "Localidad simple",
            "fuente"=> "INDEC",
            "municipio"=> [
            "nombre"=> "Alberti",
            "id"=> "060021"
            ],
            "departamento"=> [
            "nombre"=> "Alberti",
            "id"=> "06021"
            ],
            "nombre"=> "ALBERTI",
            "id"=> "06021010000",
            "provincia"=> [
            "nombre"=> "Buenos Aires",
            "id"=> "06"
            ],
            "localidad_censal"=> [
            "nombre"=> "Alberti",
            "id"=> "06021010"
            ],
            "centroide"=> [
            "lat"=> -35.0330734347841,
            "lon"=> -60.2806197287099
            ]
            ],
            [
            "categoria"=> "Localidad simple",
            "fuente"=> "INDEC",
            "municipio"=> [
            "nombre"=> "Alberti",
            "id"=> "060021"
            ],
            "departamento"=> [
            "nombre"=> "Alberti",
            "id"=> "06021"
            ],
            "nombre"=> "CORONEL SEGUI",
            "id"=> "06021020000",
            "provincia"=> [
            "nombre"=> "Buenos Aires",
            "id"=> "06"
            ],
            "localidad_censal"=> [
            "nombre"=> "Coronel Seguí",
            "id"=> "06021020"
            ],
            "centroide"=> [
            "lat"=> -34.8681189984321,
            "lon"=> -60.3939708823404
            ]
        ]]]
        ;
        return $this->handleView($this->view($data));
    }
    
    public function generateAction(){
        $ch = curl_init(); 
		$ret = curl_setopt($ch, CURLOPT_URL,            "https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json");
		$ret = curl_setopt($ch, CURLOPT_HEADER,         0);
		$ret = curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
		$ret = curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$ret = curl_setopt($ch, CURLOPT_TIMEOUT,        30);
		$ret = curl_exec($ch);
		$return = json_decode($ret,true);
        $em = $this->getDoctrine()->getManager();
        foreach($return["localidades"] as $localidad){
            if(!$provence=$this->getDoctrine()->getRepository(Provence::class)->findOneByName($localidad["provincia"]["nombre"])){
                $provence=new Provence();
                $provence->setName($localidad["provincia"]["nombre"]);
                $em->persist($provence);
            }
            if(!$departament=$this->getDoctrine()->getRepository(Department::class)->findOneBy(['name'=>$localidad["departamento"]["nombre"],'provence'=>$provence])){
                $departament=new Department();
                $departament->setName($localidad["departamento"]["nombre"]);
                $departament->setProvence($provence);
                $em->persist($departament);
            }
            $locality=new Locality();
            $locality->setName($localidad["nombre"]);
            $locality->setLat($localidad["centroide"]["lat"]);
            $locality->setLng($localidad["centroide"]["lon"]);
            $locality->setProvence($provence);
            $locality->setDepartment($departament);
            $em->persist($locality);
            $em->flush();
        }
        return $this->handleView($this->view("OK"));
    }
    
    public function importAction(){
        $em = $this->getDoctrine()->getManager();
        if (($handle = fopen("productos2.csv", "r")) !== FALSE) {
            $i = 0;
            // [0] => ﻿ID
            // [1] => Tipo
            // [2] => SKU
            // [3] => Nombre
            // [4] => Publicado
            // [5] => ¿Está destacado?
            // [6] => Visibilidad en el catálogo
            // [7] => Descripción corta
            // [8] => Descripción
            // [9] => Fecha en que empieza el precio rebajado
            // [10] => Fecha en que termina el precio de oferta
            // [11] => Estado del impuesto
            // [12] => Clase de impuesto
            // [13] => ¿En inventario?
            // [14] => Inventario
            // [15] => Cantidad de bajo inventario
            // [16] => ¿Permitir reservas de productos agotados?
            // [17] => Vendido Individualmente?
            // [18] => Peso (kg)
            // [19] => Longitud (cm)
            // [20] => Ancho (cm)
            // [21] => Altura (cm)
            // [22] => ¿Permitir reseñas de clientes?
            // [23] => Notas de la compra
            // [24] => Precio de oferta
            // [25] => Precio normal
            // [26] => Categorías
            // [27] => Etiquetas
            // [28] => Clase de envío
            // [29] => Imágenes
            // [30] => Límite de descargas
            // [31] => Días de caducidad de la descarga
            // [32] => Superior
            // [33] => Productos agrupados
            // [34] => Ventas dirigidas
            // [35] => Ventas cruzadas
            // [36] => URL externa
            // [37] => Texto del botón
            // [38] => Posición
            // [39] => Meta: _last_editor_used_jetpack
            // [40] => Meta: _wp_page_template
            // [41] => Meta: _video_url
            // [42] => Meta: rs_page_bg_color
            // [43] => Meta: puca_post_views_count
            // [44] => Nombre del atributo 1
            // [45] => Valor(es) del atributo 1
            // [46] => Atributo visible 1
            // [47] => Atributo global 1
            // [48] => Meta: _wp_old_date
            $path=$this->setting['uploads_directory'];
            $provider= new Provider();
            $provider->setName("Audio insumos");
            $em->persist($provider);
            
            while (($data = fgetcsv($handle, null, ',')) !== FALSE) {
                $i++;
                if ($i<=1 || empty($data[2])) continue;

                // if($product=$em->getRepository(Product::class)->findOneBySku($data[2]))
                //     continue;
                $product=new Product();
                $product->setName($data[3]);
                $product->setProvider($provider);
                $product->setPrice($data[25]);
                $product->setCost(0);
                $product->setSku($data[2]);
                $product->setIsSalient(($data[5]==0)?false:true);
                $product->setInStock(($data[13]==0)?false:true);
                $product->setBrand(null);
                $product->setTags($data[27]);
                $product->setDescription($data[7]);
                $product->setDescriptionLarge($data[8]);

                if(!empty($data[29])){
                    $pictures=explode(",",$data[29]);
                    $pictureName=explode(".",$pictures[0]);
                    $extension=end($pictureName);
                    $fileName = md5(uniqid()).'.'.$extension;
                    file_put_contents($path.$fileName, file_get_contents($pictures[0]));
                    $resizes=$this->setting['resize'];
                    foreach($resizes as $resize){
                        $this->get('image.handling')->open($path.$fileName)
                        ->resize($resize['width'],$resize['height'])
                        ->save($resize['path'].$fileName);
                    }
                    $product->setPicture($fileName);
                }
                if(!empty($data[26])){
                    $categories=explode(",",$data[26]);
                    foreach($categories as $categoryName){
                        //$category=$em->getRepository(Category::class)->findOneByName($categoryName);
                        if(!$category=$em->getRepository(Category::class)->findOneByName(trim($categoryName))){
                            $category=new Category();
                            $category->setName(trim($categoryName));
                        }
                        $product->setCategories($category);
                    }
                }

                $em->persist($product);
                $em->flush();
                
                // echo '<pre>';
                // print_r();
                // echo '</pre>';
                //exit();
                
                
                // echo '<pre>';
                // print_r($data);
                // echo '</pre>';
                // echo '<pre>';
                // print_r($data);
                // echo '</pre>';
                // if($i>=10){
                //     $em->flush();
                //     exit();
                // }
                
            }
            
            fclose($handle);
        }
        return $this->handleView($this->view("OK"));
    }

    
}