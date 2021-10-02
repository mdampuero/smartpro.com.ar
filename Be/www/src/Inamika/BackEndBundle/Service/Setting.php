<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\Service;

use Doctrine\ORM\EntityManager;

/**
 * Class Setting
 *
 * @package Inamika\BackEndBundle\Service
 */
class Setting
{
    protected $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @return array
     */
    public function getData()
    {
        $settings=$this->em->getRepository('InamikaBackEndBundle:Setting')->find('setting');
        return $settings;
    }
    
}