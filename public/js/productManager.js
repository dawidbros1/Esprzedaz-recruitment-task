class ProductManager {
   constructor() {
      this.container = $('#products-container');
      this.addProductButton = $('.add-product');
      this.builder = new ProductBuilder("product_batch_form");
      this.products = [];
      this.counter = this.container.find('tr').length;
   }

   init() {
      // init entry products
      const products = this.container.find('.product');

      for (let i = 0; i < products.length; i++) {
         const product = new Product(products[i]);
         product.initRemoveEvent();
         this.products.push(product);
      }

      // init add product button
      this.addProductButton.click(() => {
         const product = new Product();

         this.builder
            .addInput("name")
            .addInput("description")
            .addRemoveButton()
            .build(product, this.counter);

         product.initRemoveEvent();

         this.addProduct(product);
      });
   }

   addProduct(product) {
      this.counter++;
      this.products.push(product);
      this.container.append(product.wrapper);
   }
}

$(document).ready(() => {
   (new ProductManager()).init();
});
