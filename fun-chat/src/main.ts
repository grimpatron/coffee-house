import './my-reset.css';
import './style.css';
import './chat.css';
import {generateLoginForm, generateChatLayout} from './templates.ts';
import {validateForm} from './validation.ts';

(document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();
(document.querySelector('#authorization-submit') as HTMLElement).addEventListener('click', validateForm);
(document.querySelector('body') as HTMLElement).innerHTML = generateChatLayout();