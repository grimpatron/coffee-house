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
fetch('/coffee-house/js/database.json')
  .then(response => response.json())
  .then(data => database = data);

renderInterval = setInterval(() => {
  if (database) createCard('coffee');
}, 20);



/* Сгенерировать карточки товаров */
function createCard(a) {
  const onOffer = document.querySelector('.coffee-on-offer');
  onOffer.innerHTML = '';
  const ArrProducts = getGroceries(a);
  ArrProducts.forEach((el, index) => {
    const menuCard = document.createElement('div');
    menuCard.classList.add('on-offer__card');
    if (index >= 4 ) menuCard.classList.add('hidden--768');
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





// console.log(database);
// import products from "products.json";





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







// import products from "./products.js";

// const preloader = document.querySelector('.preloader');
// const tabItems = document.querySelectorAll('.tab-item');
// const CATEGORY = ['coffee', 'tea', 'dessert'];

// tabItems.forEach((tabItem, index) => {
//     tabItem.addEventListener('click', () => {
//         tabItems.forEach((tabItem) => {
//             tabItem.classList.remove('active');
//         })
//     tabItem.classList.add('active');
//     createItems(CATEGORY[index]);
//     })
// })

// function getCategory(value) {
//     const arr = []
//     products.forEach((product) => {
//         if (product.category === value) {
//             arr.push(product);
//         }
//     })
//     return arr;
// }

// function createItems(a) {
//     const menuGrid = document.querySelector('.menu-grid');
//     menuGrid.innerHTML = '';
//     const category = getCategory(a);

//     category.forEach((el, index) => {
//         const menuCard = document.createElement('div');
//         menuCard.classList.add('menu-card');
//         menuCard.innerHTML = `<div class="menu-card__img-container">
//                                 <img src=${el.url} alt="coffee ${index}">
//                                 </div>
//                                 <div class="menu-card__info">
//                                     <h3 class="h3">${el.name}</h3>
//                                     <p class="text">
//                                         ${el.description}
//                                     </p>
//                                     <p class="h3 product-price">$${el.price}</p>
//                                  </div>`
//         menuGrid.append(menuCard)
//     })
// }
// createItems('coffee');


