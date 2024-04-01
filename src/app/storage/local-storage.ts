export function getStorageData() {
  const localStorageData= localStorage.getItem('puzzle-user-data');
  if (localStorageData!== null) {
    return JSON.parse(localStorageData);
  }
}