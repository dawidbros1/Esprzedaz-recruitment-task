class Product {
   constructor(wrapper) {
      this.wrapper = wrapper ?? $("<tr></tr>");
   }

   initRemoveEvent() {
      let removeButton = $(this.wrapper).find(".remove-product");
      removeButton.click(() => this.remove());
   }

   remove() {
      this.wrapper.remove();
   }
}
