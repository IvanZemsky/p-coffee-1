import { items } from '../../items.js';
import { cartProducts } from '../cards.js';

class CardView {
   // элементы корзины
   static cart = document.querySelector('.cart__content');
   static cartTitle = CardView.cart.querySelector('.cart__title-wrap');
   static cartPurchaseBlock = document.getElementById('cart_purchase');
   static cartTotalCost = document.getElementById('cart_total-cost');
   static cardBtnIcon = `<img src="./icons/buy.svg" alt="Purchase button">`;

   cartCard;

   constructor(cardElement) {
      this.cardElement = cardElement;
      this.addBtn = this.cardElement.querySelector('.coffee__buy');
      this.controller = new CardController(this.cardElement.dataset.productId);

      this.bindListeners();
   }

   createCartCard(productInfo) {
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
      CardView.cartTitle.classList.add('cart__title-wrap--disappeared');
      CardView.cartPurchaseBlock.classList.add('cart__purchase--showed');

      if (!this.cartCard) {
         const cartItem = this.createCartCard(product);
         CardView.cart.insertAdjacentHTML('beforeend', cartItem);

         this.cartCard = CardView.cart.querySelector(`.cart__product[data-product-id="${product.id}"]`);

         const addBtnCart = this.cartCard.querySelector('[data-action=plus]');
         const removeBtnCart = this.cartCard.querySelector('[data-action=minus]');
         this.bindCartListeners(addBtnCart, removeBtnCart);
      }
   }

   unmountCartCard(product) {
      this.cartCard.remove();
      this.cartCard = null;

      // проверка на пустоту корзины
      if (!CardView.cart.contains(CardView.cart.querySelector('.cart__product'))) {
         CardView.cartTitle.classList.remove('cart__title-wrap--disappeared');
         CardView.cartPurchaseBlock.classList.remove('cart__purchase--showed');
      }
   }

   renderCartTotalCost(totalCost) {
      CardView.cartTotalCost.innerText = `${totalCost} K`
   }

   updateAmount(product) {
      this.onRenderCartTotalCost();

      if (product.amount > 0) {
         this.mountCartCard(product);
         this.addBtn.classList.add('coffee__buy--selected');
         this.addBtn.innerHTML = product.amount;

         this.cartCard.querySelector('.cart__product-amount').innerText = product.amount;
         this.cartCard.querySelector('.cart__product-total-cost').innerText = `${product.totalCost} K`;
      }
      else {
         this.unmountCartCard(product);
         this.addBtn.innerHTML = CardView.cardBtnIcon;
         this.addBtn.classList.remove('coffee__buy--selected');
      }
   }

   onAddToCart = () => {
      this.updateAmount(this.controller.handleAddToCart());
   }

   onRemoveFromCart = () => {
      this.updateAmount(this.controller.handleRemoveFromCart());
   }

   onRenderCartTotalCost = () => {
      this.renderCartTotalCost(this.controller.handleRenderCartTotalCost());
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

   handleRenderCartTotalCost() {
      return this.model.getCartTotalCost();
   }

}

class CardModel {
   static products = items;
   static cartProducts = cartProducts;

   constructor(productId) {
      this.product = CardModel.products.find(product => product.id === productId);
      this.productId = productId;
   }

   getCartProductIndex() {
      return CardModel.cartProducts.findIndex(cartProduct => cartProduct.id === this.productId);
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

         CardModel.cartProducts.push(cartProduct);
      }
      else {
         cartProduct = CardModel.cartProducts[cartProductIndex];
         ++cartProduct.amount;
      }

      return cartProduct;
   }

   removeFromCart() {
      const cartProductIndex = this.getCartProductIndex();
      const cartProduct = CardModel.cartProducts[cartProductIndex];

      cartProduct.amount--;

      if (cartProduct.amount === 0) {
         CardModel.cartProducts.splice(cartProductIndex, 1);
      }

      return cartProduct;
   }

   getCartTotalCost() {
      return CardModel.cartProducts.reduce((cartTotalCost, cartProduct) => {
         return cartTotalCost + cartProduct.totalCost;
      }, 0);
   }
}

export { CardView, CardController, CardModel };