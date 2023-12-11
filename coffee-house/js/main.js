// import database from "database.json";
/* Бургер меню */
const body = document.querySelector('body');
const toggle = document.querySelector('.header__burger-button');
const burgerOverlay = document.querySelector('.header__nav');
const navLink = document.querySelectorAll('.nav__link');

toggle.addEventListener('click', function(e) {
  this.classList.toggle('opened');
  body.classList.toggle('noscroll');
  burgerOverlay.classList.toggle('header__nav--active');
});

navLink.forEach(element => {
  element.addEventListener('click', function() {
    toggle.classList.toggle('opened');
    body.classList.remove('noscroll');
    burgerOverlay.classList.remove('header__nav--active');
  });
});



/* Переключение Табов */
const menuTabs = document.querySelectorAll('.menu__tab');
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


/* Получение данных */
let database;
function getGroceries(value) {
  console.log(database);
  const arrayProducts = [];
  database.forEach((product) => {
    if (product.category === value) {
      arrayProducts.push(product);
    }
  });
  return arrayProducts;
}



/* Отрисовка по умолчанию */
let renderInterval;
// fetch('/coffee-house/js/database.json')
fetch('js/database.json')
// fetch('http://127.0.0.1:5500/js/database.json')
  .then(response => response.json())
  .then(data => database = data);
console.log(database);
renderInterval = setInterval(() => {
  if (database) createCard('coffee');
}, 50);



/* Сгенерировать карточки товаров */
function createCard(category) {
  const onOffer = document.querySelector('.on-offer');
  onOffer.innerHTML = '';
  const ArrProducts = getGroceries(category);
  ArrProducts.forEach((el, index) => {
    const menuCard = document.createElement('div');
    menuCard.classList.add('on-offer__card');
    if (index >= 4 ) {
      menuCard.classList.add('hidden--768');
      showMoreBtn.classList.remove('visually-hidden');
    } else {
      showMoreBtn.classList.add('visually-hidden');
    }
    menuCard.addEventListener('click', QWER)
    menuCard.dataset.name =`${el.name}`;
    menuCard.dataset.image =`on-offer__image--${currentMenuTab}-${index + 1}`;
    menuCard.innerHTML = 
      `<div class="on-offer__image on-offer__image--${currentMenuTab}-${index + 1}"></div>
      <div class="on-offer__info">
        <div class="on-offer__name">${el.name}</div>
        <div class="on-offer__description">${el.description}</div>
        <div class="on-offer__price">$${el.price}</div>
      </div>`
    onOffer.append(menuCard);
  });
  clearInterval(renderInterval);
}





function QWER(e) {
  let target = e.target.closest('.on-offer__card');
  let item = database.find(city => city.name === target.dataset.name);
  console.log(item, target.dataset.image);
  document.querySelector('#product-img').className = "modal__img-wrapper";
  document.querySelector('#product-img').classList.add(`${target.dataset.image}`);
  document.querySelector('#product-name').innerHTML = `${item.name}`;
  document.querySelector('#product-text').innerHTML = `${item.description}`;
  document.querySelector('#product-additives-1').innerHTML = `${item.additives[0].name}`;
  document.querySelector('#product-additives-2').innerHTML = `${item.additives[1].name}`;
  document.querySelector('#product-additives-3').innerHTML = `${item.additives[2].name}`;
  document.querySelector('#product-size-1').innerHTML = `${item.sizes.s.size}`;
  document.querySelector('#product-size-2').innerHTML = `${item.sizes.m.size}`;
  document.querySelector('#product-size-3').innerHTML = `${item.sizes.l.size}`;
  document.querySelector('#product-price').innerHTML = `${item.price}`;
  modal.style.display = "block";
}


const showMoreBtn = document.querySelector('.show-more__btn');
showMoreBtn.addEventListener('click', showMore)
function showMore() {
  const hiddenCards = document.querySelectorAll('.hidden--768');
  hiddenCards.forEach(element => {
    element.classList.remove('hidden--768');
  });
  showMoreBtn.classList.add('visually-hidden');
}









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

