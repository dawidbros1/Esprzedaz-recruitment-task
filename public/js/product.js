class Product {
   #wrapper;

   constructor(wrapper) {
      this.#wrapper = wrapper ?? $("<tr></tr>").addClass("product");
   }

   getWrapper() {
      return this.#wrapper;
   }

   onDestroy() {
      this.#wrapper.remove();
   }
}
