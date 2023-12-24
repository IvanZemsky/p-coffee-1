import { CardView } from "./Card/Card.js";

const cartProducts = [];

document.addEventListener('DOMContentLoaded', () => {
   const productCards = document.querySelectorAll('.coffee');
   const openCartBtn = document.querySelector('.header__cart'); 

   productCards.forEach(productCard => new CardView(productCard));

   openCartBtn.addEventListener('click', () => {
      const cartElement = document.querySelector('.cart');
      const headerMenu = document.querySelector('.header__nav');

      cartElement.classList.toggle('cart--opened');
      headerMenu.classList.remove('header__nav--appeared');
   });

});

export {cartProducts};
