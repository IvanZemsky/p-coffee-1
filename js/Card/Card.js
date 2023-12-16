import { items } from '../../items.js';
import { cartProducts } from '../cards.js';

class CardView {
   cart = document.querySelector('.cart__content');

   constructor(cardElement) {
      this.cardElement = cardElement;
      this.addBtn = this.cardElement.querySelector('[data-action=plus]');
      this.controller = new CardController(this.cardElement.dataset.productId);

      this.bindListeners();
   }

   createCartItem(productInfo) {
      return `<li class="cart__product" data-product-id="${productInfo.id}">
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

   renderCartCard(productInfo) {
      let cartCard = this.cart.querySelector(`.cart__product[data-product-id="${productInfo.id}"]`);

      if (!cartCard) {
         const cartItem = this.createCartItem(productInfo);
         this.cart.insertAdjacentHTML('beforeend', cartItem);

         cartCard = this.cart.querySelector(`.cart__product[data-product-id="${productInfo.id}"]`);
         
         const addBtnCart = cartCard.querySelector('[data-action=plus]');
         const removeBtnCart = cartCard.querySelector('[data-action=minus]');
         this.bindCartListeners(addBtnCart, removeBtnCart);
      }
      else {
         cartCard.querySelector('.cart__product-amount').innerText = productInfo.amount;
         cartCard.querySelector('.cart__product-total-cost').innerText = `${productInfo.totalCost} K`;
      }
   }

   updateAmount(product) {
      this.addBtn.classList.add('coffee__buy--selected');
      this.addBtn.innerHTML = product.amount;

      this.renderCartCard(product);
   }

   onAddToCart = () => {
      this.updateAmount(this.controller.handleAddToCart());
   }

   onRemoveFromCart = () => {
      this.updateAmount(this.controller.handleRemoveFromCart());
   }

   bindListeners() {
      this.addBtn.addEventListener('click', this.onAddToCart)
   }

   bindCartListeners(addBtnCart, removeBtnCart) {
      addBtnCart.addEventListener('click', this.onAddToCart);
      removeBtnCart.addEventListener('click', this.onRemoveFromCart);
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

}

class CardModel {
   products = items;
   cartProducts = cartProducts;

   constructor(productId) {
      this.product = this.products.find(product => product.id === +productId);
      this.productId = productId;
   }

   addToCart() {
      const cartProductIndex = this.getCartProductIndex();

      if (cartProductIndex === -1) {
         const cartProduct = {
            ...this.product,
            amount: 1,
            get totalCost() {
               return this.cost * this.amount;
            }
         };

         this.cartProducts.push(cartProduct);
         console.log(cartProduct);
         return cartProduct;
      }
      else {
         const cartProduct = this.cartProducts[cartProductIndex];
         ++cartProduct.amount;
         console.log(cartProduct);
         return cartProduct;
      }
   }

   removeFromCart() {
      const cartProductIndex = this.getCartProductIndex();
      cartProducts[cartProductIndex].amount--;

      if (cartProducts[cartProductIndex].amount === 0) {
         cartProducts.splice(cartProductIndex, 1);
      }
      return cartProducts[cartProductIndex];
   }

   getCartProductIndex() {
      return this.cartProducts.findIndex(cartProduct => cartProduct.id === this.productId);
   }
}

export { CardView, CardController, CardModel };