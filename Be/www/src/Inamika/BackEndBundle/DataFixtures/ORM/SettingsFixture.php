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
use Inamika\BackEndBundle\Entity\Setting;

class SettingsFixture extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface{

    private $container;

    public function setContainer(ContainerInterface $container = null){
        $this->container = $container;
    }
    
    public function load(ObjectManager $manager){
        
        $setting = new Setting();
        $setting->setId("setting");
        $setting->setTitle("SmartPro");
        $setting->setCopyright("© ".date('Y')." - SmartPro");
        $setting->setEmailFrom("siniestros@smartpro.com.ar");
        $setting->setEmailTo("mdampuero@gmail.com");
        $manager->persist($setting);
        $manager->flush();
    }
    
    public function getOrder(){
        return 3;
    }
}
