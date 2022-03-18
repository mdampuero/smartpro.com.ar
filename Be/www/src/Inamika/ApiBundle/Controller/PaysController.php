<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Inamika\BackEndBundle\Entity\Cart;

class PaysController extends FOSRestController
{   
    public function saveAction(Request $request){
        $content=json_decode($request->getContent(), true);
        if(!$entity=$this->getDoctrine()->getRepository(Cart::class)->find($content["external_reference"]))
            return $this->handleView($this->view($content, Response::HTTP_NOT_FOUND));
        return $this->handleView($this->view($entity, Response::HTTP_OK));
    }

    public function testAction(){

        \MercadoPago\SDK::setAccessToken("TEST-6855942644171528-030916-9dd174b345a9c9ba5b51294c1f5a0cd9-82841009");
        $preference = new \MercadoPago\Preference();
        # Building an item

        $item = new \MercadoPago\Item();
        
        $item->id = "00001";
        $item->title = "item"; 
        $item->quantity = 1;
        $item->unit_price = 100;

        $preference->items = array($item);

        $preference->save();

        return $this->handleView($this->view($preference->id, Response::HTTP_OK));
    }

}