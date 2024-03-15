import { saveUserData } from './form-storage';
import { generateMainLayout } from '../../page';

let loginSubmit;
window.addEventListener('load', () => generateLoginEvent());
export function generateLoginEvent() {
  loginSubmit = (document.querySelector('#log-in') as HTMLElement);
  loginSubmit?.addEventListener('click', validateForm);
}

function validateForm(e: Event) {
  e.preventDefault();
  const loginFirstName = (document.querySelector('#first-name') as HTMLInputElement);
  const loginSurname = (document.querySelector('#surname') as HTMLInputElement);
  const errorFirstName = (document.querySelector('#error-first-name') as HTMLInputElement);
  const errorSurname = (document.querySelector('#error-surname') as HTMLInputElement);
  errorFirstName.innerHTML = "";
  errorSurname.innerHTML = "";
  loginFirstName.classList.remove('form__input--error');
  loginSurname.classList.remove('form__input--error');

  const regexFirstName = /^[A-Z][a-z-]{2,}$/;
  const regexSurname = /^[A-Z][a-z-]{3,}$/;

  if (!regexFirstName.test(loginFirstName.value)) {
    loginFirstName.classList.add('form__input--error');
    errorFirstName.innerHTML = "The name must begin with a capital letter and be at least 3 characters long.";
  }

  if (!regexSurname.test(loginSurname.value)) {
    loginSurname.classList.add('form__input--error');
    errorSurname.innerHTML = 'The last name must begin with a capital letter and contain at least 4 characters.';
  }

  if (regexFirstName.test(loginFirstName.value) && regexSurname.test(loginSurname.value)) {
    saveUserData(true, loginFirstName.value, loginSurname.value);
    generateMainLayout();
  }
}