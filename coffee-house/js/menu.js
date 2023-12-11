
/* Получение данных */
let database;
function getGroceries(value) {
  // console.log(database);
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
    menuCard.addEventListener('click', setModalValue)
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


const showMoreBtn = document.querySelector('.show-more__btn');
showMoreBtn.addEventListener('click', showMore)
function showMore() {
  const hiddenCards = document.querySelectorAll('.hidden--768');
  hiddenCards.forEach(element => {
    element.classList.remove('hidden--768');
  });
  showMoreBtn.classList.add('visually-hidden');
}



function setModalValue(e) {
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

  document.querySelector('body').classList.add('noscroll');
  setAdditivesArr();
  setSize();
}


let additivesArr = [];
let sizeArr = [];
let productSizeChar = '';
let productName = '';
function setAdditivesArr() {
  additivesArr = document.querySelectorAll('.modal__radio-additives');
  additivesArr.forEach(element => {
    element.addEventListener('click', chooseAdditives)
  });
}

function setSize() {
  sizeArr = document.querySelectorAll('.modal__radio-size');
  sizeArr.forEach(element => {
    element.addEventListener('click', chooseSize)
  });
}

function chooseSize(e) {
  sizeArr.forEach(element => {
    element.classList.remove('menu__tab--active');
  });
  e.target.closest('.modal__radio-size').classList.add('menu__tab--active');
  productSizeChar = e.target.closest('.modal__radio-size').querySelector('.menu__category-wrap').innerHTML
  productSizeChar = String(productSizeChar).toLocaleLowerCase();
                // e.target.dataset('.modal__radio-size').classList.add('menu__tab--active');
  productName = document.querySelector('#product-name').innerHTML;
  countPrice(productName);
}


function chooseAdditives(e) {
  let card = e.target.closest('.modal__radio-additives');
  card.classList.toggle('menu__tab--active');
  productName = document.querySelector('#product-name').innerHTML;
                // let number = card.querySelector('.menu__category-wrap').innerHTML;
                // let itemDB = database.find(city => city.name === productName);
                // console.log(itemDB.price, productName, number, itemDB.additives[number - 1]['add-price']);
  countPrice(productName);
                // let cPrice = Number(itemDB.price);
                // for (let index = 0; index < 3; index++) {
                //   if (additivesArr[index].classList.contains('menu__tab--active'))
                //     cPrice += Number(itemDB.additives[index]['add-price']);
                //     // console.log(cPrice.toFixed(2), Number(itemDB.additives[index]['add-price']));
                // }
                // document.querySelector('#product-price').innerHTML = cPrice.toFixed(2);
}


function countPrice(productName) {
  
  let itemDB = database.find(ele => ele.name === productName);
  let cPrice = Number(itemDB.price);

                // for (let index = 0; index < 3; index++) {
                //   if (sizeArr[index].classList.contains('menu__tab--active'))
                //     cPrice += Number(itemDB.sizes[productSizeChar]['add-price']);
                // }
  if (productSizeChar != '') {
    cPrice += Number(itemDB.sizes[productSizeChar]['add-price']);

  }

  for (let index = 0; index < 3; index++) {
    if (additivesArr[index].classList.contains('menu__tab--active'))
      cPrice += Number(itemDB.additives[index]['add-price']);
  }
  document.querySelector('#product-price').innerHTML = cPrice.toFixed(2);
}