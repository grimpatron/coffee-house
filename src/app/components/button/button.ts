export function createButton(text: string, id: string, classNames: string[]): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(...classNames);
  button.id = id;
  return button;
}