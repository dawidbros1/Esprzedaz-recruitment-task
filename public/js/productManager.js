class ProductManager {
   #container;
   #addProductButton;
   #builder;
   #products;
   #counter;

   constructor() {
      this.#container = $('#products-container');
      this.#addProductButton = $('.add-product');
      this.#builder = new ProductBuilder("product_batch_form");
      this.#products = [];
      this.#counter = 0;
   }

   init() {
      // init entry products
      const products = this.#container.find('.product');

      for (let i = 0; i < products.length; i++) {
         this.addProduct(new Product(products[i]));
      }

      // init add product button
      this.#addProductButton.click(() => {
         const product = new Product();

         this.#builder
            .addInput("name", { class: "col-5" })
            .addInput("description", { class: "col-5" })
            .addRemoveButton({ class: "col-2" })
            .build(product, this.#counter);

         this.addProduct(product);
      });
   }

   addProduct(product) {
      this.addClickEventOnRemoveButton(product);
      this.#products.push(product);
      this.#container.append(product.getWrapper());
      this.#counter++;
   }

   addClickEventOnRemoveButton(product) {
      $(product.getWrapper()).find(".remove-product").click(() => {
         const index = this.#products.findIndex(item => item === product);

         if (index !== -1) {
            product.onDestroy();
            this.#products.splice(index, 1);
         }
      })
   }
}

$(document).ready(() => {
   (new ProductManager()).init();
});
