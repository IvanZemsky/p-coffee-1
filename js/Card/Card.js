import { items } from '../../items.js';
import { cartProducts } from '../cards.js';

class CardView {
   cart = document.querySelector('.cart__content');
   cartTitle = this.cart.querySelector('.cart__title-wrap');
   cartCard;

   cardBtnIcon = `<img src="./icons/buy.svg" alt="Purchase button">`;

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

   mountCartCard(product) {
      this.cartTitle.classList.add('cart__title-wrap--disappeared');

      if (!this.cartCard) {
         const cartItem = this.createCartItem(product);
         this.cart.insertAdjacentHTML('beforeend', cartItem);

         this.cartCard = this.cart.querySelector(`.cart__product[data-product-id="${product.id}"]`);
         
         const addBtnCart = this.cartCard.querySelector('[data-action=plus]');
         const removeBtnCart = this.cartCard.querySelector('[data-action=minus]');
         this.bindCartListeners(addBtnCart, removeBtnCart);
      }
   }

   unmountCartCard(product) {
      this.cartCard.remove();
      this.cartCard = null;
      
      if (!this.cart.contains(this.cart.querySelector('.cart__product'))) {
         this.cartTitle.classList.remove('cart__title-wrap--disappeared');
      }
   }

   updateAmount(product) {
      if (product.amount > 0) {
         this.mountCartCard(product);
         this.addBtn.classList.add('coffee__buy--selected');
         this.addBtn.innerHTML = product.amount;

         this.cartCard.querySelector('.cart__product-amount').innerText = product.amount;
         this.cartCard.querySelector('.cart__product-total-cost').innerText = `${product.totalCost} K`;
      }
      else {
         this.unmountCartCard(product);
         this.cardElement.querySelector('.coffee__buy').innerHTML = this.cardBtnIcon;
         this.cardElement.querySelector('.coffee__buy').classList.remove('coffee__buy--selected');
      }
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
      this.product = this.products.find(product => product.id === productId);
      this.productId = productId;
   }

   getCartProductIndex() {
      return this.cartProducts.findIndex(cartProduct => cartProduct.id === this.productId);
   }

   addToCart() {
      const cartProductIndex = this.getCartProductIndex();
      let cartProduct;

      if (cartProductIndex === -1) {
         cartProduct = {
            ...this.product,
            amount: 1,
            get totalCost() {
               return this.cost * this.amount;
            }
         };

         this.cartProducts.push(cartProduct);
         console.log(cartProduct);
      }
      else {
         cartProduct = this.cartProducts[cartProductIndex];
         ++cartProduct.amount;
         console.log(cartProduct);
      }

      return cartProduct;
   }

   removeFromCart() {
      const cartProductIndex = this.getCartProductIndex();
      const cartProduct = cartProducts[cartProductIndex];

      cartProduct.amount--;

      if (cartProduct.amount === 0) {
         const cartProductAmountObj = {amount: cartProduct.amount};
         cartProducts.splice(cartProductIndex, 1);
         return cartProductAmountObj;
      }

      return cartProduct;
   }
}

export { CardView, CardController, CardModel };