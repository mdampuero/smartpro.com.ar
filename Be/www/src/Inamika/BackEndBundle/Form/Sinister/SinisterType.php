<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\Form\Sinister;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\NotBlank;

class SinisterType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('number',TextType::class)
        ->add('date',TextType::class)
        ->add('amount',TextType::class)
        ->add('amountRepeat',TextType::class,array('mapped'=>false))
        ->add('user',TextType::class,array('mapped'=>false,'constraints' => array(new NotBlank())))
        ->add('productor', EntityType::class, array(
            'class' => 'InamikaBackEndBundle:Productor',
            'query_builder' => function (EntityRepository $er) {
                $qb = $er->createQueryBuilder('e');
                return $qb->where("e.isDelete=:isDelete")->setParameter('isDelete',false)->orderBy('e.name', 'ASC');
            }
        ))
        ->add('company', EntityType::class, array(
            'class' => 'InamikaBackEndBundle:Company',
            'query_builder' => function (EntityRepository $er) {
                $qb = $er->createQueryBuilder('e');
                return $qb->where("e.isDelete=:isDelete")->setParameter('isDelete',false)->orderBy('e.name', 'ASC');
            }
        ))
        ->add('observations',TextareaType::class)
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'csrf_protection'=>false,
            'allow_extra_fields'=>true,
            'data_class' => 'Inamika\BackEndBundle\Entity\Sinister'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return '';
    }

}
