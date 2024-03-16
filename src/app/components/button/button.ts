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