export function validateForm(e: Event) {
  e.preventDefault();
  const loginFirstName = (document.querySelector('#authorization-username') as HTMLInputElement);
  const loginSurname = (document.querySelector('#authorization-password') as HTMLInputElement);
  const errorUserName = (document.querySelector('#error-username') as HTMLInputElement);
  const errorPassword = (document.querySelector('#error-password') as HTMLInputElement);

  errorUserName.innerHTML = "";
  errorPassword.innerHTML = "";
  loginFirstName.classList.remove('form__input--error');
  loginSurname.classList.remove('form__input--error');

  const regexFirstName = /^[A-Z][a-z-]{2,}$/;
  const regexSurname = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  if (!regexFirstName.test(loginFirstName.value)) {
    loginFirstName.classList.add('form__input--error');
    errorUserName.innerHTML = "The name must begin with a capital letter and be at least 3 characters long.";
  }

  if (!regexSurname.test(loginSurname.value)) {
    loginSurname.classList.add('form__input--error');
    errorPassword.innerHTML = 'The password must be at least 6 characters and must contain lowercase and uppercase Latin letters, and numbers.';
  }
}