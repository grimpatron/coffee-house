/* Бургер меню */
const body = document.querySelector('body');
const toggle = document.querySelector('.header__burger-button');
const burgerOverlay = document.querySelector('.header__nav');
const navLink = document.querySelectorAll('.nav__link');
const navLinkNonInt = document.querySelector('.header__link');

navLinkNonInt.addEventListener('click', function(e) {
  toggle.classList.remove('opened');
  body.classList.remove('noscroll-tablet');
  burgerOverlay.classList.remove('header__nav--active');
});

toggle.addEventListener('click', function(e) {
  this.classList.toggle('opened');
  body.classList.toggle('noscroll-tablet');
  burgerOverlay.classList.toggle('header__nav--active');
});

navLink.forEach(element => {
  element.addEventListener('click', function() {
    toggle.classList.toggle('opened');
    body.classList.remove('noscroll-tablet');
    burgerOverlay.classList.remove('header__nav--active');
  });
});



/* Переключение Табов */
const menuTabs = document.querySelectorAll('.category__tab');
let currentMenuTab = 'coffee';
menuTabs.forEach((tabElement, index) => {
  tabElement.addEventListener('click', () => {
    menuTabs.forEach((tabElement) => {
      tabElement.classList.remove('menu__tab--active');
    })
  tabElement.classList.add('menu__tab--active');
  currentMenuTab = tabElement.dataset.category;
  createCard(currentMenuTab);
  })
})










// const fs = require('fs');
// var fs = require('fs');
// const data = fs.readFileSync('database.json')
// console.log(data);

// let dataW = fetch('/coffee-house/js/database.json')
  // .then(response => response.json())
  // .then(data => console.log(data));





          /* Рабочая модель */
// let dataVariable;
// fetch('/coffee-house/js/database.json')
//   .then(response => response.json())
//   .then(data => {
//     dataVariable = data;
//     console.log(dataVariable);
// });
// console.log(dataVariable.category);

