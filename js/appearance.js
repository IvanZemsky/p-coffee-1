document.addEventListener('DOMContentLoaded', () => {
   function onEntryMoving(entries) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('element-show');
         }
      });
   }

   function onEntryConsistent(entries) {
      if (entries[0].isIntersecting) {
         cards.forEach((card, i) => {
            setTimeout(() => {
               card.classList.add('delivery__card-show');
            }, 300 * i);
         });
      }
   }

   // для .intro__product, .popular__cards
   const movingObserver = new IntersectionObserver(onEntryMoving, { threshold: 0.1 });
   const movingElements = document.querySelectorAll('.element-appearance');
   movingElements.forEach(element => movingObserver.observe(element));

   // для .about__image-wrap
   const aboutObserver = new IntersectionObserver(onEntryMoving, { threshold: 0.7 });
   const aboutImgElement = document.querySelectorAll('.about__image-wrap');
   aboutImgElement.forEach(element => aboutObserver.observe(element));

   // для .delivery__cards
   const consistentObserver = new IntersectionObserver(onEntryConsistent, { threshold: 0.1 });
   const consistentElement = document.querySelectorAll('.delivery__cards');
   const cards = document.querySelectorAll('.delivery__card');
   consistentElement.forEach(element => consistentObserver.observe(element));



});