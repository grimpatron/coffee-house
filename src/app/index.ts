import { generateMainScreen } from './main-screen';
import { createModal } from './components/modal/modal-window';
import { saveUserData } from './components/form/form-storage';
import { getStorageData } from './storage/local-storage';

let logOutBtn = (document.querySelector('#log-out') as HTMLElement);
export function generateMainLayout() {
  // (document.querySelector('body') as HTMLElement).innerHTML = generateMainScreen();
  (document.querySelector('body') as HTMLElement).appendChild(generateMainScreen());
  logOutBtn = (document.querySelector('#log-out') as HTMLElement);
  logOutBtn.addEventListener('click', openModal);
  showGrateful();
}

function openModal() {
  const modalWindow = createModal('Do you want to log out?');
  document.body.appendChild(modalWindow);
  const modal = document.querySelector('#modal-wrapper') as HTMLElement;
  modal.style.display = 'block';
  const modalAccept = (document.querySelector('#modal-accept') as HTMLElement);
  modalAccept.addEventListener('click', acceptLogOur);
  const modalReject = (document.querySelector('#modal-reject') as HTMLElement);
  modalReject.addEventListener('click', closeModalWindow);
}

function acceptLogOur() {
  saveUserData(false, "", "");
}

function closeModalWindow() {
  const modal = document.querySelector('#modal-wrapper') as HTMLElement;
  modal.style.display = 'none';
}

function showGrateful() {
  const gratefulName = document.querySelector('#grateful-name') as HTMLElement;
  const dataPerson = getStorageData();
  gratefulName.innerHTML = `${dataPerson.firstName} ${dataPerson.lastName}`
}