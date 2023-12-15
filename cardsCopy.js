document.addEventListener('DOMContentLoaded', () => {

   const cart = [];
   console.log(cart);

   const openCartBtn = document.querySelector('.header__cart');
   const cartBlock = document.querySelector('.cart');
   const cartContent = document.querySelector('.cart__content');

   function renderCart() {
      cartContent.innerHTML = ``;

      cart.forEach(product => {
         cartContent.innerHTML +=
            `<li class="cart__product">
               <div class="cart__product-img-wrap">
                  <img src=${product.img} />
               </div>
               <h3 class="cart__product-name">${product.name}</h3>
               <div class="cart__product-change">
                  <button type="button" data-action="plus" onclick="">-</button>
                  <p class="cart__product-amount">${product.amount}</p>
                  <button type="button" data-action="minus" onclick="">+</button>
               </div>
               <p class="cart__product-total-cost">${product.totalCost} K</p>
            </li>`;
      });
   }

   function addProduct(product) {
      const index = cart.findIndex(item => item.id === product.id);
      if (index === -1) {
         cart.push({
            ...product,
            amount: 1,
            totalCost: product.cost
         });
      }
      else {
         const selectedProduct = cart[index];
         ++selectedProduct.amount;
         selectedProduct.totalCost = selectedProduct.amount * selectedProduct.cost;
      }
      console.log('cart', cart);
      renderCart();
   }

   openCartBtn.addEventListener('click', () => {
      cartBlock.classList.toggle('cart--opened');
   });

   fetch('../items.json')
      .then(result => result.json())
      .then(products => {
         console.log(products);

         const productCards = document.querySelectorAll('.coffee');

         productCards.forEach(productCard => productCard.addEventListener('click', () => {
            const addBtn = productCard.querySelector('.coffee__buy');
            addBtn.classList.add('coffee__buy--selected');

            const productId = +productCard.dataset.productId;
            const selectedProduct = products.find(product => product.id === productId);

            addProduct(selectedProduct);

            addBtn.innerHTML = cart.find(product => product.id === productId).amount;
         }));

      });

});