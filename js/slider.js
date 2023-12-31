const sliderBlocks = document.getElementById('slider_blocks');
const leftArrow = document.getElementById('slider_left-arrow');
const rightArrow = document.getElementById('slider_right-arrow');

const sliderCardWidth = document.querySelector('.reviews__slider-block').clientWidth;

function defineOffset(gapWidth, cardAmount) {
   return (sliderCardWidth * cardAmount) + (gapWidth * cardAmount);
}

function defineSliderOffsetStep() {
   let stepAmount; // количество шагов до конца
   if (window.innerWidth > 633) {
      offsetStep = defineOffset(40, 2);
      stepAmount = 4;
   }
   else {
      offsetStep = defineOffset(40, 1);
      stepAmount = 8;
   }
   finalOffsetStep = -offsetStep * stepAmount;
}

let offsetStep;
let sliderOffset = 0;
let finalOffsetStep;
defineSliderOffsetStep();

window.addEventListener('resize', () => {
   sliderOffset = 0;
   sliderBlocks.style.transform = `translateX(${sliderOffset}px)`;
   leftArrow.classList.add('reviews__stage-back--blocked');
   defineSliderOffsetStep();
});

rightArrow.addEventListener('click', () => {
   sliderOffset -= offsetStep;
   
   if (sliderOffset <= finalOffsetStep) {
      rightArrow.classList.add('reviews__stage-forth--blocked');
      sliderOffset = finalOffsetStep;
   }
   else {
      leftArrow.classList.remove('reviews__stage-back--blocked');
   }
   
   sliderBlocks.style.transform = `translateX(${sliderOffset}px)`;
});

leftArrow.addEventListener('click', () => {
   sliderOffset += offsetStep; 

   if (sliderOffset >= 0) {
      sliderOffset = 0;
      leftArrow.classList.add('reviews__stage-back--blocked');
   }
   else {
      rightArrow.classList.remove('reviews__stage-forth--blocked')
   }

   sliderBlocks.style.transform = `translateX(${sliderOffset}px)`;
});