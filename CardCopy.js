import { items } from '../../items.js';
import { cartProducts } from '../cards.js';

class CardView {
   constructor(cardElement) {
      this.cardElement = cardElement;
      this.addBtn = this.cardElement.querySelector('[data-action=plus]');
      this.controller = new CardController(this.cardElement.dataset.productId);

      this.bindListeners();
   }

   cart = document.querySelector('.cart__content');
   addBtnCart;

   updateAmount(amount) {
      this.addBtn.classList.add('coffee__buy--selected');
      this.addBtn.innerHTML = amount;
   }

   mount(productInfo) {
      let cartCard = this.cart.querySelector(`.cart__product[data-product-id="${productInfo.id}"]`);

      if (!cartCard) {
         this.cart.innerHTML += `
            <li class="cart__product" data-product-id="${productInfo.id}">
               <div class="cart__product-img-wrap">
                  <img src=${productInfo.img} />
               </div>
               <h3 class="cart__product-name">${productInfo.name}</h3>
               <div class="cart__product-change">
                  <button type="button" data-action="minus">-</button>
                  <p class="cart__product-amount">${productInfo.amount}</p>
                  <button type="button" data-action="plus">+</button>
               </div>
               <p class="cart__product-total-cost">${productInfo.totalCost} K</p>
            </li>`;
      }
      else {
         // !!! изменить в updateAmount !!!
         cartCard.querySelector('.cart__product-amount').innerText = productInfo.amount;
         cartCard.querySelector('.cart__product-total-cost').innerText = `${productInfo.totalCost} K`;
      }
   }

   onAddToCart = () => {
      this.updateAmount(this.controller.handleAddToCart(), this.addBtnCart);
   }

   onRemoveFromCart = () => {
      this.updateAmount(this.controller.handleRemoveFromCart());
   }

   getProductInfo() {
      this.mount(this.controller.handleGetProductInfo());
   }

   bindListeners() {
      this.addBtn.addEventListener('click', () => {
         this.onAddToCart();
         this.getProductInfo();
      });
      // this.removeBtn.addEventListener('click', this.onRemoveFromCart);
   }

}

class CardController {
   constructor(productId) {
      this.model = new CardModel(+productId, cartProducts);
   }

   handleAddToCart() {
      return this.model.addToCart();
   }

   handleRemoveFromCart() {
      return this.model.removeFromCart();
   }

   handleGetProductInfo() {
      return this.model.getCartProduct();
   }

}

class CardModel {
   products = items;

   constructor(productId, cartProducts) {
      this.product = this.products.find(product => product.id === +productId);
      this.productId = productId;
      this.cartProducts = cartProducts;
   }

   addToCart() {
      const cartProduct = this.getCartProduct();
      ++cartProduct.amount;
      return cartProduct.amount;
   }

   removeFromCart() {

   }

   getCartProduct() {
      let cartProduct = this.cartProducts.find(product => product.id === this.productId);

      if (!cartProduct) {
         cartProduct = {
            ...this.product,
            amount: 0,
            get totalCost() {
               return this.cost * this.amount;
            }
         };

         this.cartProducts.push(cartProduct);
         return cartProduct;
      }

      return cartProduct;

   }
}

export { CardView, CardController, CardModel };