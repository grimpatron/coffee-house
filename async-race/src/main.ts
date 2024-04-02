/* eslint-disable */
import './styles/normalize.css';
import './styles/my-reset.css';
import './styles/style.css';

import { checkStorageData, getStorageData, saveUserData } from './local-storage.ts';
import { createButton, createDiv, generateInterface, saveCarToGarage, addEvent, generateCarItem } from './nodeGenerator.ts';
import { generateHexColor, generateUniqueID, generateModel } from './functions.ts';

const bodyElement = document.querySelector<HTMLDivElement>('body');
const newNode = createDiv('header', 'header');
const garageListDiv = createDiv('garage-list', 'garage-list');

if (bodyElement) {
  bodyElement.insertBefore(garageListDiv, bodyElement.firstChild);
  bodyElement.insertBefore(newNode, bodyElement.firstChild);
}

const appDiv = document.getElementById('header')!;
const topBarDiv = createDiv('topbar');
const topBarInterfaceDiv = createDiv('topbar-interface');
const topBarPageDiv = createDiv('topbar-page');
const pageButtonsDiv = createDiv('page-buttons');
const garageBtn = createButton('to Garage', 'btn', 'garageBtn');
const scoreBtn = createButton('to Winners', 'btn', 'scoreBtn');
const interfaceDiv = generateInterface();

pageButtonsDiv.appendChild(garageBtn);
pageButtonsDiv.appendChild(scoreBtn);
topBarInterfaceDiv.appendChild(pageButtonsDiv);
topBarDiv.append(interfaceDiv, topBarInterfaceDiv, topBarPageDiv);
appDiv.appendChild(topBarDiv);

function showPage(nameOfPage?: string): void {
  checkStorageData();
  const userData = getStorageData();
  generateCarList(userData);
  let currentPage = userData.pageName;
  if (nameOfPage) currentPage = nameOfPage;
  const app = document.querySelector('.topbar-page') as HTMLElement;
  const pageContent: string = `
    <h1 class='page-title'>${currentPage} (<span>${userData[currentPage].list.length}</span>)</h1>
    <h2 class='page-subtitle'>Page #<span>${userData[currentPage].page}</span></h2>`;
  bodyElement!.style.backgroundImage = `url(img/${userData[currentPage].background})`;
  app.innerHTML = pageContent;

  if (nameOfPage) userData.pageName = nameOfPage;
  saveUserData(userData);
}

document
  .getElementById('garageBtn')!
  .addEventListener('click', () => showPage('garage'));
document
  .getElementById('scoreBtn')!
  .addEventListener('click', () => showPage('winners'));

showPage();
addEvent('btn-create', 'click', saveCarToGarage);

interface Car {
  name: string;
  color: string;
  id: string;
}

interface Garage {
  list: Car[];
}

interface UserData {
  garage: Garage;
}

function generateCarList(userData: UserData) {
  userData.garage.list.forEach(element => {
    generateCarItem(element);
  });
}


const garageList = document.querySelector('#garage-list');
garageList?.addEventListener('click', deleteCarFromList);
garageList?.addEventListener('click', selectCar);
document.querySelector('#btn-update')?.addEventListener('click', updateCar);

function deleteCarFromList(e: Event) {
  if (e.target instanceof HTMLInputElement && e.target.value === 'Remove') {
    if (e.target.parentNode !== null) {
      const thisEl = (e.target.parentNode.parentNode as HTMLElement).id;
      const userData = getStorageData();
      userData.garage.list = (userData.garage.list as Car[]).filter((element: Car) => element.id != thisEl);
      let element = document.getElementById(thisEl);
      if (element) element.remove();
      saveUserData(userData);
    }
  }
}


function selectCar(e: Event) {
  if (e.target instanceof HTMLInputElement && e.target.value === 'Select') {
    if (e.target.parentNode !== null) {
      const thisEl = (e.target.parentNode.parentNode as HTMLElement);
      const carNameChange = document.querySelector('#car-name-change') as HTMLInputElement;
      const carColorChange = document.querySelector('#car-color-change') as HTMLInputElement;
      const carNameEl = thisEl.querySelector('.garage-item__name') as HTMLElement;
      const carColorEl = thisEl.querySelector('.garage-item__color') as HTMLElement;
      
      if (carNameChange) carNameChange.removeAttribute('disabled');
      if (carColorChange) carColorChange.removeAttribute('disabled');
      if (carNameChange && carNameEl !== undefined) {
        carNameChange.value = carNameEl.innerHTML;
        carNameChange.dataset.id = thisEl.id;
      }
      if (carColorChange && carColorEl !== undefined) {
        carColorChange.value = carColorEl.innerHTML;
      }
    }
  }
}

function updateCar() {
  const carNameChange = document.querySelector('#car-name-change') as HTMLInputElement;
  const carColorChange = document.querySelector('#car-color-change') as HTMLInputElement;
  const idCar = carNameChange.dataset.id;
  const userData = getStorageData();

  userData.garage.list.forEach((element: Car) => {
    if (element.id === idCar) {
      element.name = carNameChange.value;
      element.color = carColorChange.value;
    }
  });
  userData.garage.list = (userData.garage.list as Car[]).filter((element: Car) => element.id);

  if (garageList) garageList.innerHTML = '';
  generateCarList(userData);
  if (carNameChange) carNameChange.value = '';
  if (carNameChange) carNameChange.setAttribute('disabled', 'disabled');
  if (carColorChange) carColorChange.setAttribute('disabled', 'disabled');
  saveUserData(userData);
}

document.querySelector('#btn-generate')?.addEventListener('click', generateCars);
function generateCars() {
  for (let index = 0, RNGCarNumber = 100; index < RNGCarNumber; index++) {
    const element = {
      color: generateHexColor(),
      name: generateModel(),
      id: generateUniqueID()
    }
    generateCarItem(element);
    const userData = getStorageData();
    userData.garage.list.push(element);
    saveUserData(userData);
  }
}
