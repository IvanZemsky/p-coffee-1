import {cartItems} from '../cards.js';

class CardView {
   constructor(cardElement) {
      this.cardElement = cardElement;
      this.incrementBtn = this.cardElement.querySelector('.coffee__buy');
      this.controller = new CardController(this.cardElement.dataset.productId);

      this.bindListeners();
   }

   updateCounter(value /*from controller*/) {
      this.incrementBtn.classList.add('coffee__buy--selected');
      this.incrementBtn.innerHTML = value;
   }

   onUpdateCounter = () => {
      this.updateCounter(this.controller.handleUpdateCounter());
   }

   bindListeners() {
      this.incrementBtn.addEventListener('click', this.onUpdateCounter);
   }

}


class CardController {
   constructor(productId) {
      this.model = new CardModel(productId);
   }

   handleUpdateCounter() {
      return this.model.changeAmount();
   }

}

ЗАДАЧА: Добавить продукт в cartItems

class CardModel {
   products = items;
   cartProducts = cartItems;

   constructor(selectedProductId) {
      this.product = this.products.find(product => product.id === +selectedProductId);
   }

   changeTotalCost() {
      const amount = this.product.amount;
      return this.product.totalCost = this.product.cost * amount;
   }

   changeAmount() {
      const amount = this.product.amount;
      this.product.amount = amount ? amount + 1 : 1;
      this.changeTotalCost();
      console.log(this.product)
      return this.product.amount;
   }

}

export {CardView, CardController, CardModel};