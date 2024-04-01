export function createModal(message: string): HTMLElement {

  const wrapper = document.createElement('div');
  wrapper.classList.add('modal__wrapper');
  wrapper.id = 'modal-wrapper';

  const modalEL = document.createElement('div');
  modalEL.classList.add('modal-window');
  modalEL.id = 'modal';

  const title = document.createElement('div');
  title.classList.add('modal__message');
  title.innerHTML = message;

  const buttons = document.createElement('div');
  buttons.classList.add('modal__buttons');

  const acceptButton = document.createElement('button');
  acceptButton.innerHTML = 'Accept';
  acceptButton.classList.add('btn');
  acceptButton.classList.add('modal__button--accept');
  acceptButton.id = 'modal-accept';

  const rejectButton = document.createElement('button');
  rejectButton.innerHTML = 'Reject';
  rejectButton.classList.add('btn');
  rejectButton.classList.add('modal__button--reject');
  rejectButton.id = 'modal-reject';

  modalEL.appendChild(title);
  modalEL.appendChild(buttons);
  buttons.appendChild(acceptButton);
  buttons.appendChild(rejectButton);
  wrapper.appendChild(modalEL);
  return wrapper;
}
