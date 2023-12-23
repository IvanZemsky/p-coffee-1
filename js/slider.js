const sliderBlocks = document.getElementById('slider_blocks');
const leftArrow = document.getElementById('slider_left-arrow');
const rightArrow = document.getElementById('slider_right-arrow');

const sliderCardWidth = document.querySelector('.reviews__slider-block').clientWidth;

function defineOffset(gapWidth, cardAmount) {
   return (sliderCardWidth * cardAmount) + (gapWidth * cardAmount);
}

function defineSliderOffsetStep() {
   if (window.innerWidth > 633) {
      offsetStep = defineOffset(40, 2);
      finalOffsetStep = -offsetStep * 4;
   }
   else {
      offsetStep = defineOffset(40, 1);
      finalOffsetStep = -offsetStep * 8;
   }
}

let offsetStep;
let sliderOffset = 0;
let finalOffsetStep;
defineSliderOffsetStep();

window.addEventListener('resize', defineSliderOffsetStep);

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


