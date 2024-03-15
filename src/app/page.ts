import { createButton } from './components/button/button';
import { createModal } from './components/modal/modal-window';
import { saveUserData } from './components/form/form-storage';

let logOutBtn = (document.querySelector('#log-out') as HTMLElement);
export function generateMainLayout(){
  (document.querySelector('body') as HTMLElement).innerHTML = '';

  const myButton = createButton('Log out', 'log-out');
  document.body.appendChild(myButton);
  logOutBtn = (document.querySelector('#log-out') as HTMLElement);
  logOutBtn.addEventListener('click', openModal);

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