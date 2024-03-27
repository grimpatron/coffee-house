export function getStorageData() {
  const localStorageData = localStorage.getItem('async-race-data');
  if (localStorageData !== null) {
    return JSON.parse(localStorageData);
  }
  return null;
}

export function saveUserData(data: object) {
  const savedUserJSON = localStorage.getItem('async-race-data');
  if (savedUserJSON !== null) {
    localStorage.setItem('async-race-data', JSON.stringify(data));
  }
}

function createLocalStorage() {
  const data = {
    pageName: 'garage',
    garage: {
      background: 'garage.jpg',
      counter: 1,
      page: 1,
      list: [],
    },
    winners: {
      background: 'blacklist.jpg',
      counter: 1,
      page: 1,
      list: [],
    },
  };

  const dataJSON = JSON.stringify(data);
  localStorage.setItem('async-race-data', dataJSON);
}

export function checkStorageData() {
  const userData = getStorageData();
  if (!userData) createLocalStorage();
}
