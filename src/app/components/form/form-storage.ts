const firstName = (document.querySelector('#first-name') as HTMLInputElement).value;
const lastName = (document.querySelector('#surname') as HTMLInputElement).value;

// Запихнуть в createLocalStorage и зделать свойства по умолчанию!!!!
let user = {
  firstName,
  lastName,
};

window.addEventListener('load', () => {
  const savedUserJSON = localStorage.getItem('puzzle-user-data');
  if (savedUserJSON) {
    console.log('zagrushaem!!!');
    console.log(JSON.parse(savedUserJSON));
  } else {
    createLocalStorage();
  }
});

function createLocalStorage() {
  const userJSON = JSON.stringify(user);
  localStorage.setItem('puzzle-user-data', userJSON);
}

export function saveUserData(a: string, b: string) {
  user = {
    firstName: a,
    lastName: b
  };
  localStorage.setItem('puzzle-user-data', JSON.stringify(user));
}
