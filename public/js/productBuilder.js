class ProductBuilder {
   constructor(formName) {
      this.queue = [];
      this.formName = formName;
   }

   addInput(name) {
      this.queue.push((product, index) => {
         const td = $("<td></td>");
         const input = $("<input>").addClass("form-control w-100")
            .attr("required", "required")
            .attr("id", `${this.formName}_products_${index}_${name}`)
            .attr("name", `${this.formName}[products][${index}][${name}]`)
            .attr("type", "text");
         td.append(input);
         product.wrapper.append(td);
      });

      return this;
   }

   addRemoveButton() {
      this.queue.push((product, index) => {
         const td = $("<td></td>");
         const a = $("<a></a>");

         td.addClass("col-2");
         a.addClass("btn btn-danger remove-product w-100");
         a.text("Usuń");
         a.attr("href", "#");

         $(td).append(a);
         $(product.wrapper).append(td);

         a.click(() => product.remove());
      });

      return this;
   }

   build(product, index) {
      this.queue.forEach(method => {
         method(product, index);
      });

      this.queue = [];
   }
}
