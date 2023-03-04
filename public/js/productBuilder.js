class ProductBuilder {
   #queue;

   constructor(formName) {
      this.#queue = [];
      this.formName = formName;
   }

   addInput(name, options) {
      this.#queue.push((product, index) => {
         const td = $("<td></td>").addClass(options.class ?? null)
         const input = $("<input>").addClass("form-control w-100")
            .attr("required", "required")
            .attr("id", `${this.formName}_products_${index}_${name}`)
            .attr("name", `${this.formName}[products][${index}][${name}]`)
            .attr("type", "text");

         td.append(input);
         product.getWrapper().append(td);
      });

      return this;
   }

   addRemoveButton(options) {
      this.#queue.push((product, index) => {
         const td = $("<td></td>").addClass(options.class ?? null)
         const a = $("<a></a>")
            .addClass("btn btn-danger remove-product w-100")
            .text("Usuń")
            .attr("href", "#")

         $(td).append(a);
         $(product.getWrapper()).append(td);
      });

      return this;
   }

   build(product, index) {
      this.#queue.forEach(method => {
         method(product, index);
      });

      this.#queue = [];
   }
}
