<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Inamika\BackEndBundle\Entity\SinisterStatus;

class SinisterStatusFixture extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface{

    private $container;

    public function setContainer(ContainerInterface $container = null){
        $this->container = $container;
    }
    public function load(ObjectManager $manager){
        $ordersStatus = new SinisterStatus();
        $ordersStatus->setId(SinisterStatus::NEED_TO_DEFINE_PRODUCTS);
        $ordersStatus->setName('Falta definir productos');
        $ordersStatus->setPosition(100);
        $ordersStatus->setColor("warning");
        $ordersStatus->setIsDefault(true);
        $manager->persist($ordersStatus);
        
        $ordersStatus = new SinisterStatus();
        $ordersStatus->setId(SinisterStatus::WAITING_FOR_PRODUCTS);
        $ordersStatus->setName('En espera de productos');
        $ordersStatus->setColor("primary");
        $ordersStatus->setPosition(200);
        $ordersStatus->setIsDefault(false);
        $manager->persist($ordersStatus);
        
        $ordersStatus = new SinisterStatus();
        $ordersStatus->setId(SinisterStatus::UNDELIVERED);
        $ordersStatus->setName('Ingresado sin entregar');
        $ordersStatus->setColor("warning");
        $ordersStatus->setPosition(250);
        $ordersStatus->setIsDefault(false);
        $ordersStatus->setIsDelete(true);
        $manager->persist($ordersStatus);
        
        $ordersStatus = new SinisterStatus();
        $ordersStatus->setId(SinisterStatus::DELIVERED);
        $ordersStatus->setName('Entregado');
        $ordersStatus->setColor("info");
        $ordersStatus->setPosition(300);
        $ordersStatus->setIsDefault(false);
        $manager->persist($ordersStatus);
        
        $ordersStatus = new SinisterStatus();
        $ordersStatus->setId(SinisterStatus::INVOICED);
        $ordersStatus->setName('Facturado');
        $ordersStatus->setColor("success");
        $ordersStatus->setPosition(400);
        $ordersStatus->setIsDefault(false);
        $manager->persist($ordersStatus);
        
        $ordersStatus = new SinisterStatus();
        $ordersStatus->setId(SinisterStatus::DISCHARDGED);
        $ordersStatus->setName('Dado de baja');
        $ordersStatus->setPosition(500);
        $ordersStatus->setColor("danger");
        $ordersStatus->setIsDefault(false);
        $manager->persist($ordersStatus);

        $manager->flush();
    }
    
    public function getOrder(){
        return 6;
    }
}
