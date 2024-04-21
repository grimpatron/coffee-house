export function validateUserName(e: Event) {
  e.preventDefault();
  const loginFirstName = (document.querySelector('#authorization-username') as HTMLInputElement);
  const errorUserName = (document.querySelector('#error-username') as HTMLInputElement);
  const regexFirstName = /^[A-Z][a-z-]{2,}$/;

  errorUserName.innerHTML = "";
  loginFirstName.classList.remove('form__input--error');

  if (!regexFirstName.test(loginFirstName.value)) {
    loginFirstName.classList.add('form__input--error');
    errorUserName.innerHTML = "The name must begin with a capital letter and be at least 3 characters long.";
  }

  authorization();
}


export function validatePassword(e: Event) {
  e.preventDefault();
  const loginPassword = (document.querySelector('#authorization-password') as HTMLInputElement);
  const errorPassword = (document.querySelector('#error-password') as HTMLInputElement);
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/;

  errorPassword.innerHTML = "";
  loginPassword.classList.remove('form__input--error');

  if (!regexPassword.test(loginPassword.value)) {
    loginPassword.classList.add('form__input--error');
    errorPassword.innerHTML = 'The password must be at least 6 characters and must contain lowercase and uppercase Latin letters, and numbers.';
  }

  authorization();
}

function authorization() {
  const submit = document.querySelector('#authorization-submit');
  let check = 2;
  const loginFirstName = (document.querySelector('#authorization-username') as HTMLInputElement);
  const loginPassword = (document.querySelector('#authorization-password') as HTMLInputElement);
  const regexFirstName = /^[A-Z][a-z-]{2,}$/;
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/;

  if (!regexFirstName.test(loginFirstName.value)) check -= 1;
  if (!regexPassword.test(loginPassword.value)) check -= 1;
  
  if (check == 2) {
    submit?.classList.remove('registration__submit--disable');
    submit?.removeAttribute('disabled');
  } else {
    submit?.classList.add('registration__submit--disable');
    submit?.setAttribute('disabled', 'disabled');
  }
}