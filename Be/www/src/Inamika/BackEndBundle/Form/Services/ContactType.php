<?php

//
//  Created by Mauricio Ampuero <mdampuero@gmail.com> on 2019.
//  Copyright © 2019 Inamika S.A. All rights reserved.
//

namespace Inamika\BackEndBundle\Form\Services;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Email;
class ContactType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('name',TextType::class,array('constraints' => array(new NotBlank())))
        ->add('phone',TextType::class,array('constraints' => array(new NotBlank())))
        ->add('email',TextType::class,array('constraints' => array(new NotBlank(), new Email())))
        ->add('query',TextType::class,array('constraints' => array(new NotBlank())))
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
            'data_class' => null
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
