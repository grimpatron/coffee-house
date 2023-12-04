(function () {
  let toggle = document.querySelector('.header__burger-button');
  let burgerOverlay = document.querySelector('.header__nav');

  toggle.addEventListener('click', function(e) {
    this.classList.toggle('opened');
    burgerOverlay.classList.toggle('header__nav--active');
  });
})();


let menuCards = document.querySelectorAll('.coffee-on-offer .on-offer__card');
console.log(menuCards);

function hideCards(menuCards) {
  for (let index = 0; index < menuCards.length; index++) {
    if (index >= 4) menuCards[index].style.display = 'none';
  }
} hideCards(menuCards);