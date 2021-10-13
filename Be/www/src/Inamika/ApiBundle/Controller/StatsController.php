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
use Inamika\BackEndBundle\Entity\Order;

class StatsController extends FOSRestController
{   
    public function totalAction(){
        $data=[
            'countSinister'=>$this->getDoctrine()->getRepository(Sinister::class)->total(),
            'amountSinister'=>$this->getDoctrine()->getRepository(Sinister::class)->amount(),
            'countOrder'=>$this->getDoctrine()->getRepository(Order::class)->total(),
            'amountOrder'=>$this->getDoctrine()->getRepository(Order::class)->amount()
        ];
        return $this->handleView($this->view($data));
    }

}