import './style/my-reset.css';
import './style/style.css';
import './style/chat.css';
import {generateLoginForm, generateChatLayout} from './templates.ts';
import {validateUserName, validatePassword} from './validation.ts';
import {serverAuthentication} from './client.ts';

(document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();
(document.querySelector('#authorization-username') as HTMLElement).addEventListener('input', validateUserName);
(document.querySelector('#authorization-password') as HTMLElement).addEventListener('input', validatePassword);



const submit = (document.querySelector('#authorization-submit') as HTMLButtonElement);
submit.addEventListener('click', submitEvent);
function submitEvent(e: Event) {
  e.preventDefault();
  
  if(!submit?.hasAttribute('disabled')) {
    const nameOfUser = (document.querySelector('#authorization-username') as HTMLInputElement).value;
    const passOfUser = (document.querySelector('#authorization-password') as HTMLInputElement).value;

    serverAuthentication(nameOfUser, passOfUser);
    (document.querySelector('body') as HTMLElement).innerHTML = generateChatLayout(nameOfUser);
  }
}
