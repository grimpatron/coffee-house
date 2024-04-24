import './style/my-reset.css';
import './style/style.css';
import './style/chat.css';
import {generateLoginForm, generateChatLayout} from './templates.ts';
import {validateUserName, validatePassword} from './validation.ts';
import {saveUserData, getStorageData} from './storage.ts';
import {userLogin, userLogout} from './client.ts';

const socket: WebSocket = new WebSocket('ws://localhost:4000');
// let submit: HTMLButtonElement = (document.querySelector('#authorization-submit'));

function generateFirstScreen() {
  (document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();
  (document.querySelector('#authorization-username') as HTMLElement).addEventListener('input', validateUserName);
  (document.querySelector('#authorization-password') as HTMLElement).addEventListener('input', validatePassword);
  
  const submit = (document.querySelector('#authorization-submit') as HTMLButtonElement);
  submit.addEventListener('click', submitEvent);
}
generateFirstScreen();


(function userLoggedIn() {
  const userData = getStorageData();
  const nameOfUser = userData.userName;
  const passOfUser = userData.userPassword;
  if (userData.userName) {
    userLogin(socket, nameOfUser, passOfUser);
    (document.querySelector('body') as HTMLElement).innerHTML = generateChatLayout(nameOfUser);
    (document.querySelector('#logout') as HTMLElement).addEventListener('click', logOutChat);
  }
})();

function submitEvent(e: Event) {
  e.preventDefault();
  
  const submit = (document.querySelector('#authorization-submit') as HTMLButtonElement);
  if(!submit?.hasAttribute('disabled')) {
    const nameOfUser = (document.querySelector('#authorization-username') as HTMLInputElement).value;
    const passOfUser = (document.querySelector('#authorization-password') as HTMLInputElement).value;

    userLogin(socket, nameOfUser, passOfUser);
    saveUserData(nameOfUser, passOfUser);

    (document.querySelector('body') as HTMLElement).innerHTML = generateChatLayout(nameOfUser);
    (document.querySelector('#logout') as HTMLElement).addEventListener('click', logOutChat);
  }
}


function logOutChat() {
  const userData = getStorageData();
  const nameOfUser = userData.userName;
  const passOfUser = userData.userPassword;
  userLogout(socket, nameOfUser, passOfUser);
  generateFirstScreen();
  localStorage.clear();
}



// При загрузке обращается к хранилищу, если там есть пользователь, то пробуем его авторизировать.
// Если возвращает наверный пароль то нельзя зайти!
