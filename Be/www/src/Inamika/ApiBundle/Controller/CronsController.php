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
use Inamika\BackEndBundle\Entity\Department;
use Inamika\BackEndBundle\Entity\Locality;

class CronsController extends FOSRestController
{   
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

}