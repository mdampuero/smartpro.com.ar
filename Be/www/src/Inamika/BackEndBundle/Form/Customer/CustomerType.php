<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\Form\Customer;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class CustomerType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('name',TextType::class)
        ->add('document',TextType::class)
        ->add('email',TextType::class)
        ->add('postalCode',TextType::class)
        ->add('phone',TextType::class)
        ->add('provence', EntityType::class, array(
            'class' => 'InamikaBackEndBundle:Provence',
            'query_builder' => function (EntityRepository $er) {
                $qb = $er->createQueryBuilder('e');
                return $qb->where("e.isDelete=:isDelete")->setParameter('isDelete',false)->orderBy('e.name', 'ASC');
            }
        ))
        ->add('locality', EntityType::class, array(
            'class' => 'InamikaBackEndBundle:Locality',
            'query_builder' => function (EntityRepository $er) {
                $qb = $er->createQueryBuilder('e');
                return $qb->where("e.isDelete=:isDelete")->setParameter('isDelete',false)->orderBy('e.name', 'ASC');
            }
        ))
        ->add('street',TextType::class)
        ->add('department',TextType::class)
        ->add('floor',TextType::class)
        ->add('streetNumber',TextType::class)
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
            'data_class' => 'Inamika\BackEndBundle\Entity\Customer'
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
