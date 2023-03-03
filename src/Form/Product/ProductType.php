<?php

namespace App\Form\Product;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class ProductType extends AbstractType
{
   public function buildForm(FormBuilderInterface $builder, array $options): void
   {
      $builder
         ->add('id', HiddenType::class)
         ->add('name', TextType::class, [
            'label' => false,
            'attr' => [
               'class' => "form-control w-100"
            ]
         ])
         ->add('description', TextType::class, [
            'label' => false,
            'attr' => [
               'class' => "form-control w-100"
            ]
         ])
      ;
   }
}