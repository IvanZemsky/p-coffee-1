const sliderBlocks = document.getElementById('slider_blocks');
const leftArrow = document.getElementById('slider_left-arrow');
const rightArrow = document.getElementById('slider_right-arrow');

const sliderCardWidth = document.querySelector('.reviews__slider-block').clientWidth;

console.log(sliderBlocks.clientWidth);

function defineOffset(gapWidth) {
   return (sliderCardWidth * 2) + (gapWidth * 2);
}

let offsetStep = defineOffset(40);
let sliderOffset = 0;

//window.addEventListener('change', defineOffset(220, 82));

rightArrow.addEventListener('click', () => {
   sliderOffset -= offsetStep; 
   sliderBlocks.style.transform = `translateX(${sliderOffset}px)`;
   console.log(sliderOffset);
});

leftArrow.addEventListener('click', () => {
   sliderOffset += offsetStep; 
   sliderBlocks.style.transform = `translateX(${sliderOffset}px)`;
   console.log(sliderOffset);
});


