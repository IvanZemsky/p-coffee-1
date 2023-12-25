import {items} from '../items.js'

document.addEventListener('DOMContentLoaded', () => {
   const searchInput = document.getElementById('search');
   const searchContent = document.getElementById('search-content');
   const cartElement = document.querySelector('.cart');

   searchInput.addEventListener('input', () => {
      if (searchInput.value.length > 1) {
         searchContent.innerHTML = '';

         const searchValue = searchInput.value.toLowerCase();
         const searchedProducts = items.filter(item => item.name.toLowerCase().includes(searchValue));
         console.log(searchedProducts);

         if (searchedProducts.length) {
            searchContent.classList.add('header__search-content--opened');
            cartElement.classList.remove('cart--opened'); // прячем корзину когда получили результат

            searchedProducts.forEach(product => {
               searchContent.innerHTML += `
                  <div class="header__seach-item">
                     <h3 class="header__seach-item-name">${product.name}</h3>
                     <p class="header__seach-item-desc">${product.desc}</p>
                  </div>
               `;
            });
         }
         else {
            searchContent.classList.remove('header__search-content--opened');
         }
      }
      else {
         searchContent.classList.remove('header__search-content--opened');
      }
   });

   document.addEventListener('click', (event) => {
      if (!event.target.closest('#search-content') && !event.target.closest('#search')) {
         searchContent.classList.remove('header__search-content--opened');
      }
   });
});