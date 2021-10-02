<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\Config\Definition\Exception\Exception;
use FOS\RestBundle\Controller\FOSRestController;

class DefaultController extends FOSRestController{   
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

    /**
     * @return array
     */
    public function base64ToFile($string)
    {
        if($string=='') return null;
        $extensionImage=['jpg','png','gif','jpeg'];
        $path=$this->setting['uploads_directory'];

        $dataFile=explode("base64,",$string);

		if(!array_key_exists(0,$dataFile))
			throw new Exception('Formato inválido.',6);
		$dataFileInfo=explode(":",$dataFile[0]);

		if(!array_key_exists(1,$dataFileInfo))
			throw new Exception('Formato inválido.',6);
		$dataFileExtension=explode("/",$dataFileInfo[1]);

		if(!array_key_exists(1,$dataFileExtension))
			throw new Exception('Formato inválido.',6);
		$extension=str_replace(";", "", $dataFileExtension[1]);

		if(!array_key_exists(1,$dataFile))
			throw new Exception('Formato inválido.',6);
        if($dataFile[1]=='remove') return null;
        $data = base64_decode($dataFile[1]);
		$roughsize = strlen($data);
		// if($roughsize>2097152)
		// 	throw new Exception('La imagen es demasiado grande',6);

		$fileName = md5(uniqid()).'.'.$extension;
		$success = file_put_contents($path.$fileName, $data);
		if(!$success)
            throw new Exception('No se pudo subir la string.',6);
            
        if(!in_array($extension,$extensionImage))
            return $fileName;

        $resizes=$this->setting['resize'];
        foreach($resizes as $resize){
            $this->get('image.handling')->open($path.$fileName)
            ->resize($resize['width'],$resize['height'])
            ->save($resize['path'].$fileName);
        }
		return $fileName;
    }
}