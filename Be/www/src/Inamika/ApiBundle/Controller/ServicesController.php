<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Inamika\BackEndBundle\Form\Services\ContactType;

class ServicesController extends FOSRestController
{   
    public function contactAction(Request $request){
        $form = $this->createForm(ContactType::class);
        $content=json_decode($request->getContent(), true);
        $form->submit($content);
        if ($form->isSubmitted() && $form->isValid()) {
            $message = (new \Swift_Message($this->get('setting')->getData()->getTitle().' - Consulta desde el formulario de la tienda'))
            ->setFrom(array($this->get('setting')->getData()->getEmailFrom()=>$this->get('setting')->getData()->getTitle()))
            ->setTo($this->get('setting')->getData()->getEmailTo())
            ->setBody($this->renderView('InamikaApiBundle:Emails:Services/contact.html.twig', array('content' => $content)),'text/html');
            $this->get('mailer')->send($message);
            return $this->handleView($this->view([], Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
    }

}