export class Cart{
   constructor() {
      this.products = [];
   }

   addProduct(product) { 
      const index = this.products.findIndex(item => item.id === product.id);
      if (index === -1) {
         this.products.push({
            ...product,
            amount: 1,
            totalCost: product.cost
         });
      }
      else {
         const selectedProduct = this.products[index];
         ++selectedProduct.amount;
         selectedProduct.totalCost = selectedProduct.amount * selectedProduct.cost;
      }
      console.log('cart', this.products);
   }

   removeProduct(product) {
      this.products.splice(index, 1);
   }

   getTotalCost() {
      return this.products.reduce((sum, item) => sum + item.totalCost, 0);
   }

}