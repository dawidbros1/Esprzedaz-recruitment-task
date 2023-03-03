<?php

namespace App\Service;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;

class ProductManager
{
   private $em;
   private $products;
   public function __construct(EntityManagerInterface $em)
   {
      $this->em = $em;
      $this->products = $this->em->getRepository(Product::class)->findAll();
   }

   # return product by id and remove this product from list of all products 
   public function extractProduct($id)
   {
      foreach ($this->products as $index => $product) {
         if ($id == $product->getId()) {
            return array_splice($this->products, $index, 1)[0];
         }
      }

      return null;
   }

   # [ allow_delete = true ] return remaining products as products to delete
   public function getRemainingProducts()
   {
      return $this->products;
   }
}