import { CardView, CardController, CardModel } from "./Card/Card.js";
import {items} from '../items.js';

const cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
   const productCards = document.querySelectorAll('.coffee');

   const openCartBtn = document.querySelector('.header__cart');
   openCartBtn.addEventListener('click', () => console.log(cartItems))

   productCards.forEach(productCard => {
      const card = new CardView(productCard);
   });


});

export {cartItems};
