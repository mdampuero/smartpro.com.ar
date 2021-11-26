<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\Form\Product;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class ProductType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('name',TextType::class)
        ->add('sku',TextType::class)
        ->add('brand',TextType::class)
        ->add('picture',TextType::class,array('mapped'=>false))
        ->add('price',NumberType::class)
        ->add('cost',NumberType::class)
        ->add('tags',TextType::class)
        ->add('description',TextareaType::class)
        ->add('descriptionLarge',TextareaType::class)
        ->add('isSalient',ChoiceType::class, array('choices' => array(
            'SI' => 1,
            'NO' =>0
        )))
        ->add('inStock',ChoiceType::class, array('choices' => array(
            'SI' => 1,
            'NO' =>0
        )))
        ->add('categories', EntityType::class, array(
            'class' => 'InamikaBackEndBundle:Category',
            'choice_label' => 'name',
            'multiple' => true,
            'expanded' => true,
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('e')
                ->where('e.isDelete=0')
                ->orderBy('e.name', 'ASC');
            }
        ))
        ->add('provider', EntityType::class, array(
            'class' => 'InamikaBackEndBundle:Provider',
            'query_builder' => function (EntityRepository $er) {
                $qb = $er->createQueryBuilder('e');
                $choices=$qb->where("e.isDelete=:isDelete")->setParameter('isDelete',false)
                    ->orderBy('e.name', 'ASC');
                return $choices;
            }
        ))
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
            'data_class' => 'Inamika\BackEndBundle\Entity\Product'
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
