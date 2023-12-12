const prevBtn = document.querySelector('.slider__arrow--prev');
const nextBtn = document.querySelector('.slider__arrow--next');

const sliderContainer = document.querySelector('.slider__container');
const sliderLine = document.querySelector('.slider__line');
const slidesCollection = document.querySelectorAll('.slider__slide');
const slidesCount = Array.from(slidesCollection).length;
const slidesWidth = Array.from(slidesCollection)[0].clientWidth;


let slideSizeStep = sliderContainer.clientWidth;
let currentPosition = 0;
let slideIndex = 0;


let width;
function init() {
  width = sliderContainer.offsetWidth;
  sliderLine.style.width = width * slidesCount + 'px';
  slidesCollection.forEach(item => {
      item.style.width = width + 'px';
      item.style.height = 'auto';
  });
  move();
  // rollSlider();
}



// console.log( slidesWidth, sliderContainer.clientWidth );


prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

function prevSlide() {
  if (slideIndex <= 0) {
    slideIndex = slidesCount - 1;
  } else slideIndex -= 1;
  sliderLine.style.transform = 'translate(-' + slideIndex * width + 'px)';
  move();
}

function nextSlide() {
  if (slideIndex >= slidesCount - 1) {
    slideIndex = 0;
  } else slideIndex += 1;
  sliderLine.style.transform = 'translate(-' + slideIndex * width + 'px)';
  move();
}

function moveSlide(target) {
  slideIndex = target;
  sliderLine.style.transform = 'translate(-' + slideIndex * width + 'px)';
  move();
}

const barItems = document.querySelectorAll('.pagination__item');
barItems.forEach(item => {
  item.addEventListener('click', function (e) {
    moveSlide(Number(e.target.dataset.bar));
  });
});

let autoplayId;
let pagBars = document.querySelectorAll(".pagination__bar");
let curElem = pagBars[slideIndex];

let widthBar = 0;
let isFinish = 0;

function move() {
  widthBar = 0;
  isFinish = 0;
  curElem.style.width = 0 + "%";
  curElem = pagBars[slideIndex];
  clearInterval(autoplayId);
  if (isFinish === 0 && isPause === false) {
    isFinish = 1;
    autoplayId = setInterval(frame, 50);
  }
}

function frame() {
  if (widthBar >= 100) {
    isFinish = 0;
    widthBar = 0;
    // curElem.style.width = 0 + "%";
    // clearInterval(id);
    clearInterval(autoplayId);
    nextSlide();
  } else {
    widthBar++;
    curElem.style.width = widthBar + "%";
  }
}


const slider = document.querySelector('.slider');
let isPause = false;
slider.addEventListener('mouseenter', () => {
  clearInterval(autoplayId);
  isPause = true;
})
slider.addEventListener('mouseleave', () => {
  autoplayId = setInterval(frame, 50);
  isPause = false;
})
slider.addEventListener('touchstart', () => {
  clearInterval(autoplayId);
  isPause = true;
})
slider.addEventListener('touchend', () => {
  autoplayId = setInterval(frame, 50);
  isPause = false;
})


/* Свайп */
sliderContainer.addEventListener('touchstart', startHandleTouch, false); // Прикосновение
sliderContainer.addEventListener('touchmove', moveHandleTouch, false);   // Движение пальцем по экрану
let axisX = null;
let axisY = null;

function startHandleTouch(handleEvent) {                                         
  axisX = handleEvent.touches[0].clientX;                                      
  axisY = handleEvent.touches[0].clientY;                                      
};

function moveHandleTouch(handleEvent) {
  if ( ! axisX || ! axisY ) { return; }

  let xUp = handleEvent.touches[0].clientX;                                    
  let yUp = handleEvent.touches[0].clientY;
  let xDifference = axisX - xUp;
  let yDifference = axisY - yUp;

  if ( Math.abs( xDifference ) > Math.abs( yDifference ) ) {
    if ( xDifference > 0 ) {  nextSlide();  /* swipe to left  */
    } else                    prevSlide()   /* swipe to right  */
  }
  
  axisX = null;
  axisY = null;                                             
};

window.addEventListener('resize', init);
init();