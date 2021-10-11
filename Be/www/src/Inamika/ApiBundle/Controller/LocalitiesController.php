<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Inamika\BackEndBundle\Entity\Locality;

class LocalitiesController extends FOSRestController
{   
    public function indexAction(Request $request){
        $search = $request->query->get('search', array());
        $query=(!isset($search['value']))?'':$search['value'];
        $offset = $request->query->get('start', 0);
        $limit = $request->query->get('length', 30);
        $sort = $request->query->get('sort', null);
        $direction = $request->query->get('direction', null);
        $recordsFiltered = $this->getDoctrine()->getRepository(Locality::class)->searchTotal($query, $limit, $offset);
        return $this->handleView($this->view(array(
            'data' => $this->getDoctrine()->getRepository(Locality::class)->search($query, $limit, $offset, $sort, $direction)->getQuery()->getResult(),
            'recordsTotal' => $this->getDoctrine()->getRepository(Locality::class)->total(),
            'recordsFiltered' => $recordsFiltered,
            'offset' => $offset,
            'limit' => $limit,
            'pages' => (($recordsFiltered % $limit)>0)?(int)($recordsFiltered / $limit)+1:$recordsFiltered / $limit
        )));
    }
    public function byProvenceAction($provence){
        return $this->handleView($this->view($this->getDoctrine()->getRepository(Locality::class)->getAll()->andWhere('e.provence=:provence')->setParameter('provence',$provence)->getQuery()->getResult()));
    }

}