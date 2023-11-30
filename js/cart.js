document.addEventListener('DOMContentLoaded', () => {
   let items = [];

   fetch('../items.json')
   .then(result => result.json())
   .then(result => {
      items = result;
      console.log(items);
   });
})