document.addEventListener('DOMContentLoaded', () => {
   function onEntryMoving(entries) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const animation = () => {
               entry.target.classList.add('element-show');
               requestAnimationFrame(animation);
            }
            requestAnimationFrame(animation);
         }
      });
   }
   // для .intro__product, .popular__cards
   const movingObserver = new IntersectionObserver(onEntryMoving, { threshold: 0.1 });
   const movingElements = document.querySelectorAll('.element-appearance');
   movingElements.forEach(element => movingObserver.observe(element));

   // для .delivery__cards
   const consistentObserver = new IntersectionObserver(onEntryMoving, { threshold: 0.1 });
   const consistentElements = document.querySelectorAll('.delivery__card');
   consistentElements.forEach(element => consistentObserver.observe(element));

   // для .about__image-wrap
   const aboutObserver = new IntersectionObserver(onEntryMoving, { threshold: 0.7 });
   const aboutImgElement = document.querySelectorAll('.about__image-wrap');
   aboutImgElement.forEach(element => aboutObserver.observe(element));

});