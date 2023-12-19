import { CardView } from "./Card/Card.js";

const cartProducts = [];

document.addEventListener('DOMContentLoaded', () => {
   const productCards = document.querySelectorAll('.coffee');
   const openCartBtn = document.querySelector('.header__cart');

   openCartBtn.addEventListener('click', () => {
      const cartElement = document.querySelector('.cart');
      cartElement.classList.toggle('cart--opened');
   });

   productCards.forEach(productCard => {
      const card = new CardView(productCard);
   });


});

export {cartProducts};
