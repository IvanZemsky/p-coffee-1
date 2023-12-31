// хедер при прокрутке
function headerScrolled() {
   const header = document.querySelector('.header');

   if (scrollY > 400) {
      header.classList.add('header--scrolled');
   }
   else {
      header.classList.remove('header--scrolled');
   }
}

headerScrolled();

window.addEventListener('scroll', headerScrolled);

// бургер
const headerBurger = document.getElementById('header-burger');
const headerMenu = document.querySelector('.header__nav');

headerBurger.addEventListener('click', () => {
   const cartElement = document.querySelector('.cart');
   const searchContent = document.getElementById('search-content');

   headerMenu.classList.toggle('header__nav--appeared');
   cartElement.classList.remove('cart--opened');
   searchContent.classList.remove('header__search-content--opened');
});

document.body.addEventListener('click', (event) => {
   if (!event.target.closest('.header__nav') && !event.target.closest('.header__burger')) {
      headerMenu.classList.remove('header__nav--appeared');
   }
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

      if (window.innerWidth <= 800) {
         headerMenu.classList.remove('header__nav--appeared');
      }

      link.classList.add('header__link--active');

      const targetSection = document.querySelector(link.getAttribute('href'));
      targetSection.scrollIntoView({behavior: 'smooth', block: 'start'});
   });
});