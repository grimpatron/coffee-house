const prevBtn = document.querySelector('.slider__arrow--prev');
const nextBtn = document.querySelector('.slider__arrow--next');

const sliderContainer = document.querySelector('.slider__container');
const sliderLine = document.querySelector('.slider__line');
const slidesCollection = document.querySelectorAll('.slider__slide');
const slidesCount = Array.from(slidesCollection).length;
const slidesWidth = Array.from(slidesCollection)[0].clientWidth;


let slideSizeStep = sliderContainer.clientWidth;
let curentPosition = 0;
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



console.log( slidesWidth, sliderContainer.clientWidth );
// sliderContainer.style.width = sliderContainer.clientWidth * 3 + 'px';


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
    // const target = e.target.dataset.bar;
    moveSlide(Number(e.target.dataset.bar));
  });
});

let autoplayId;
let pagBars = document.querySelectorAll(".pagination__bar");
let curElem = pagBars[slideIndex];


function move() {
  console.log(slideIndex);
            // pagBars.forEach(item => {
            //   item.classList.remove('pagination__item--active');
            // });
            // curElem.classList.add('pagination__item--active');
  let widthBar = 0;
  let isFinish = 0;
  curElem.style.width = 0 + "%";
  curElem = pagBars[slideIndex];
  clearInterval(autoplayId);
  if (isFinish == 0) {
    isFinish = 1;
    // let id = setInterval(frame, 50);
    autoplayId = setInterval(frame, 50);
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
  }
}



/* Свайп */
sliderContainer.addEventListener('touchstart', handleTouchStart, false); // Вешаем на прикосновение функцию handleTouchStart
sliderContainer.addEventListener('touchmove', handleTouchMove, false);   // А на движение пальцем по экрану - handleTouchMove

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {                                         
  xDown = evt.touches[0].clientX;                                      
  yDown = evt.touches[0].clientY;                                      
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) { return; }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            nextSlide();  /* left swipe */
        } else {
            prevSlide()   /* right swipe */
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};


init();