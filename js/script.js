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

const headerBurger = document.getElementById('header-burger');

headerBurger.addEventListener('click', () => {
   const headerMenu = document.querySelector('.header__nav');
   headerMenu.classList.toggle('header__nav--appeared');
});


