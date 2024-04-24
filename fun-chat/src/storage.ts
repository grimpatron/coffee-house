function setUserData(name: string, password: string) {
  return {
    userName: name,
    userPassword: password,
  };
}

export function saveUserData(name: string, password: string) {
  // const savedUserJSON = localStorage.getItem('fun-chat-user');
  // if (savedUserJSON !== null) {
    const user = setUserData(name, password);
    localStorage.setItem('fun-chat-user', JSON.stringify(user));
  // }
}

// function createLocalStorage(name: string, password: string) {
//   const user = setUserData(name, password);
//   const userJSON = JSON.stringify(user);
//   localStorage.setItem('fun-chat-user', userJSON);
// }


export function getStorageData() {
  const localStorageData = localStorage.getItem('fun-chat-user');
  if (localStorageData !== null) {
    return JSON.parse(localStorageData);
  }
}