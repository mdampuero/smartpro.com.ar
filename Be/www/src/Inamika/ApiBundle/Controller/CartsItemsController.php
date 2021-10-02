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
use Inamika\BackEndBundle\Entity\CartItem;
use Inamika\BackEndBundle\Entity\Customer;
use Inamika\BackEndBundle\Entity\Product;

class CartsItemsController extends FOSRestController
{   
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

    public function postAction(Request $request,$cart){
        $content=json_decode($request->getContent(), true);
        if(!$cart=$this->getDoctrine()->getRepository(Cart::class)->find($cart))
            return $this->handleView($this->view($this->displayErrors('cart','El valor ingresado no es válido'), Response::HTTP_BAD_REQUEST));
        if(!key_exists('product',$content) || !$product=$this->getDoctrine()->getRepository(Product::class)->find($content["product"]))
            return $this->handleView($this->view($this->displayErrors('product','El valor ingresado no es válido'), Response::HTTP_BAD_REQUEST));
        if(!key_exists('amount',$content) || (int)$content["amount"] <= 0)
            return $this->handleView($this->view($this->displayErrors('amount','El valor ingresado no es válido'), Response::HTTP_BAD_REQUEST));
        $em = $this->getDoctrine()->getManager();
        if(!$cartItem=$this->getDoctrine()->getRepository(CartItem::class)->findOneBy(['cart'=>$cart,'product'=>$product])){
            $cartItem=new CartItem();
            $cartItem->setCart($cart);
            $cartItem->setProduct($product);
        }
        $cartItem->setAmount($content["amount"]);
        $cartItem->setTotal($content["amount"]*$product->getPrice());
        $em->persist($cartItem);
        
        $em->flush();

        return $this->handleView($this->view($this->updateTotal($cart), Response::HTTP_OK));
    }
    
    private function updateTotal($cart){
        $em = $this->getDoctrine()->getManager();
        $cart=$em->getRepository(Cart::class)->find($cart);
        $total=0;
        foreach($cart->getItems() as $cartItem)
            $total+=$cartItem->getTotal();
        $cart->setTotal($total);
        $em->persist($cart);
        $em->flush();
        return $cart;
    }

    public function deleteAction($cart,$id){
        if(!$entity=$this->getDoctrine()->getRepository(CartItem::class)->find($id))
            return $this->handleView($this->view(null, Response::HTTP_NOT_FOUND));
        $em = $this->getDoctrine()->getManager();
        $em->remove($entity);
        $em->flush();

        return $this->handleView($this->view($this->updateTotal($cart), Response::HTTP_OK));
    }

}