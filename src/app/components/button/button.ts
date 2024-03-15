export function createButton(text: string, id: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  button.id = id;
  button.classList.add('btn');
  return button;
}