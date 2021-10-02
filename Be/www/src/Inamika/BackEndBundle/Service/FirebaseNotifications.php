<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\Service;

use Doctrine\ORM\EntityManager;

/**
 * Class FirebaseNotifications
 *
 * @package Inamika\BackEndBundle\Service
 */
class FirebaseNotifications
{
    protected $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @return array
     */
    public function push($payload){
        $ch = curl_init('https://fcm.googleapis.com/fcm/send');
        $payload = json_encode($payload);
        $header = array(
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: key=AAAAmuOJ4-E:APA91bHP6T3kfCU1PmDyDej9ceYoC_jDQaGsC3SzJSzvlE6aw1ZAkYuCLO063LnaKFn6067ze0zTNthe_AJWj0-nWi_GJVUPQteumBnzauc9lGBEjCh8cyZMyLCVHhXMMUs6loQv3fcc'
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_HEADER, true);  
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        if (!curl_errno($ch))
            $return=array('code'=>curl_getinfo($ch, CURLINFO_HTTP_CODE),'result'=>json_decode($result,TRUE));
        curl_close($ch);
        return $return;
    }
    
}