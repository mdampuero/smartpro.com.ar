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

class CartsController extends FOSRestController
{   
    public function getAction($customer){
        return $this->handleView($this->view($this->updateTotal($this->getDoctrine()->getRepository(Cart::class)->findOneByCustomer($customer)), Response::HTTP_OK));
    }
    
    public function getPreferenceAction($id){
        $credentials=$this->getParameter('credentials');
        $cart=$this->getDoctrine()->getRepository(Cart::class)->find($id);

        \MercadoPago\SDK::setAccessToken($credentials["access_token"]);
        $preference = new \MercadoPago\Preference();
        $item = new \MercadoPago\Item();
        $item->id = "00001";
        $item->title = "Smartpro diferencia siniestro Nº ".$cart->getCustomer()->getSinister()->getNumber(); 
        $item->quantity = 1;
        $item->unit_price = $cart->getTotal()-$cart->getCustomer()->getBalance();
        $preference->items = array($item);
        $preference->external_reference = $cart->getId();
        $global=$this->getParameter('global');
        $preference->back_urls = array(
            "success" => $global["ecommerce"]."feedback",
            "failure" => $global["ecommerce"]."feedback", 
            "pending" => $global["ecommerce"]."feedback",
        );
        //http://localhost:8080/feedback?collection_id=1246874958&collection_status=approved&payment_id=1246874958&status=dsa&external_reference=cc5ba127-a640-11ec-b62f-0242ac120002&payment_type=credit_card&merchant_order_id=4353290153&preference_id=b97f4484-a5e7-11ec-b62f-0242ac120002&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
        $preference->save();
        $response=[
            "publicKey"=>$credentials["public_key"],
            'preferenceId'=>$preference->id
        ];
        return $this->handleView($this->view($response, Response::HTTP_OK));
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

    public function postAction(Request $request){
        $entity = new Cart();
        $content=json_decode($request->getContent(), true);
        if(!key_exists('customer',$content) || !$customer=$this->getDoctrine()->getRepository(Customer::class)->find($content["customer"]))
            return $this->handleView($this->view($this->displayErrors('customer','El valor ingresado no es válido'), Response::HTTP_BAD_REQUEST));
        if(!key_exists('product',$content) || !$product=$this->getDoctrine()->getRepository(Product::class)->find($content["product"]))
            return $this->handleView($this->view($this->displayErrors('product','El valor ingresado no es válido'), Response::HTTP_BAD_REQUEST));
        if(!key_exists('amount',$content) || (int)$content["amount"] <= 0)
            return $this->handleView($this->view($this->displayErrors('amount','El valor ingresado no es válido'), Response::HTTP_BAD_REQUEST));
        $em = $this->getDoctrine()->getManager();
        if(!$cart=$this->getDoctrine()->getRepository(Cart::class)->findOneByCustomer($customer)){
            $cart=new Cart();
            $cart->setCustomer($customer);
            $em->persist($cart);
        }
        $em->flush();
        if(!$cartItem=$this->getDoctrine()->getRepository(CartItem::class)->findOneBy(['cart'=>$cart,'product'=>$product])){
            $cartItem=new CartItem();
            $cartItem->setCart($cart);
            $cartItem->setProduct($product);
        }
        $cartItem->setAmount($content["amount"]);
        $cartItem->setTotal($content["amount"]*$product->getPrice());
        $em->persist($cartItem);
        
        $em->flush();

        return $this->handleView($this->view($this->updateTotal($customer), Response::HTTP_OK));
    }
    
    private function updateTotal($customer){
        $em = $this->getDoctrine()->getManager();
        $cart=$em->getRepository(Cart::class)->findOneByCustomer($customer);
        $total=0;
        foreach($cart->getItems() as $cartItem)
            $total+=$cartItem->getTotal();
        $cart->setTotal($total);
        $em->persist($cart);
        $em->flush();
        return $cart;
    }

}