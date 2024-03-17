export function createButton(text: string, id: string, classNames: string[]): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(...classNames);
  button.id = id;
  return button;
}

export function createButtonWithEvent(text: string, id: string, classNames: string[], eventType: string, callback: (e: Event) => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(...classNames);
  button.id = id;
  button.addEventListener(eventType, callback);
  return button;
}

export function transformButton(buttonID: string, text: string, id: string, classNames: string, eventType: string, callbackAdd: (e: Event) => void, callbackRemove: (e: Event) => void): void {
  let checkButton: HTMLButtonElement = document.getElementById(`${buttonID}`) as HTMLButtonElement;
  checkButton.removeEventListener(eventType, callbackRemove);
  checkButton.style.transition = '0.4s';
  checkButton.style.opacity = '0';
  setTimeout(() => {
    checkButton.id = id;
    checkButton.innerText = text;
    checkButton.className = classNames;
    checkButton.style.opacity = '1';
    checkButton.addEventListener(eventType, callbackAdd);
  }, 400);
}