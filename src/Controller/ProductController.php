<?php

namespace App\Controller;

use App\Entity\Product;
use App\Form\Product\ProductBatchFormType;
use App\Service\ProductManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="app_product_show", methods={"GET"})
     */
    public function show(EntityManagerInterface $entityManager): Response
    {
        $products = $entityManager->getRepository(Product::class)->findAll();

        $form = $this->createForm(ProductBatchFormType::class, null, [
            'action' => $this->generateUrl("app_product_save")
        ]);

        $productData = array_map(function ($product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
            ];
        }, $products);

        $form->setData(['products' => $productData]);

        return $this->render('product/list.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/save", name="app_product_save", methods={"POST"})
     */
    public function save(Request $request, EntityManagerInterface $entityManager, ProductManager $productManager): Response
    {
        $form = $this->createForm(ProductBatchFormType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $productsInForm = $form->get('products')->getData();
            foreach ($productsInForm as $productData) {

                if ($productData['id'] != null) {
                    # edit existing product
                    $product = $productManager->extractProduct($productData['id']);
                } else {
                    # add new product
                    $product = new Product();
                }

                if ($product != null) {
                    $product->setName($productData['name']);
                    $product->setDescription($productData['description']);
                    $entityManager->persist($product);
                }
            }

            # [ allow_delete = true ] delete products which are not sent in form
            if ($form->get('products')->getConfig()->getOption("allow_delete") === true) {
                foreach ($productManager->getRemainingProducts() as $product) {
                    $entityManager->remove($product);
                }
            }

            $entityManager->flush();
        }

        return $this->redirectToRoute('app_product_show');
    }
}