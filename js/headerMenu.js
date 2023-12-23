// анимация
window.addEventListener('scroll', () => {
   const header = document.querySelector('header');

   if (scrollY > 400) {
      header.classList.add('header--scrolled');
      //header.classList.add('header--showed');
   }
   else {
      header.classList.remove('header--scrolled');
   }
});

// бургер
const headerBurger = document.getElementById('header-burger');

headerBurger.addEventListener('click', () => {
   const headerMenu = document.querySelector('.header__nav');
   headerMenu.classList.toggle('header__nav--appeared');
});


// скролл
const headerLinks = document.querySelectorAll('.header__link');

headerLinks.forEach(link => {
   link.addEventListener('click', (event) => {
      event.preventDefault();
      
      for (const headerLink of headerLinks) {
         if (headerLink !== event.target) {
            headerLink.classList.remove('header__link--active');
         }
      }

      link.classList.add('header__link--active');

      const targetSection = document.querySelector(link.getAttribute('href'));
      targetSection.scrollIntoView({behavior: 'smooth', block: 'start'});
   });
});




