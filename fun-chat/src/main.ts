import './my-reset.css'
import './style.css'
import {generateLoginForm} from './templates.ts'
import {validateForm} from './validation.ts'

(document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();
(document.querySelector('#authorization-submit') as HTMLElement).addEventListener('click', validateForm);