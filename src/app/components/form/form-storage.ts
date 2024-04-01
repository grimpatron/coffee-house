import { generateLoginForm } from './form-generation';
import { generateLoginEvent } from './form-validation';
import { generateMainLayout } from '../../index';
import { generateStartScreen } from '../../start-screen';
import { getStorageData } from '../../storage/local-storage';

let userData = getStorageData();
if (userData !== null && userData !== undefined) {
  if (userData.authorization == true) {
    generateMainLayout();
  } else {
    (document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();
  }
} else {
  createLocalStorage(false, '', '');
  (document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();
}

function createLocalStorage(access: boolean, name: string, surname: string) {
  const user = setUserData(access, name, surname);
  const userJSON = JSON.stringify(user);
  localStorage.setItem('puzzle-user-data', userJSON);
}

function setUserData(access: boolean, name: string, surname: string) {
  return {
    authorization: access,
    firstName: name,
    lastName: surname,
  };
}

export function saveUserData(access: boolean, name: string, surname: string) {
  const savedUserJSON = localStorage.getItem('puzzle-user-data');
  if (savedUserJSON !== null) {
    const user = setUserData(access, name, surname);
    localStorage.setItem('puzzle-user-data', JSON.stringify(user));
  }
  if (access === false) {
    (document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();
    generateLoginEvent();
  }
  if (access === true) {
    openStartScreen();
  }
}

function openStartScreen() {
  (document.querySelector('body') as HTMLElement).appendChild(generateStartScreen());
  const startBtn = document.querySelector('#start-btn') as HTMLElement;
  startBtn.addEventListener('click', generateMainLayout);
}
