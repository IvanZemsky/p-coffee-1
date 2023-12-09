import { Cart } from './Cart.js';

document.addEventListener('DOMContentLoaded', () => {

   const cart = new Cart();
   console.log(cart);

   fetch('../items.json')
      .then(result => result.json())
      .then(products => {
         console.log(products);

         const productCards = document.querySelectorAll('.coffee');

         productCards.forEach(productCard => productCard.addEventListener('click', () => {
            const addBtn = productCard.querySelector('.coffee__buy');
            addBtn.classList.add('coffee__buy--selected'); // узнать больше про отсутствие условия
            
            const productId = +productCard.dataset.productId;
            const selectedProduct = products.find(product => product.id === productId);

            cart.addProduct(selectedProduct);
            addBtn.innerHTML = cart.products.find(product => product.id === productId).amount;
            console.log('total', cart.getTotalCost());
         }));

      });
});

// function addToCart(productCard) {
//    const addBtn = productCard.querySelector('.coffee__buy');
//    addBtn.classList.add('coffee__buy--selected');
//    addBtn.innerHTML = '1';

//    const productId = +productCard.dataset.productId;
//    const selectedProduct = products.find(product => product.id === productId);

//    if (!cart.some(cartProduct => cartProduct.id === productId)) {
//       cart.push({
//          ...selectedProduct,
//          amount: 1,
//          totalCost: selectedProduct.cost
//       });
//       console.log(1);
//    }
//    else {
//       const selectedCartProduct = cart.find(cartProduct => cartProduct.id === productId);
//       ++selectedCartProduct.amount;
//       selectedCartProduct.totalCost = selectedCartProduct.cost * selectedCartProduct.amount;
//       console.log(2);
//    }
// }