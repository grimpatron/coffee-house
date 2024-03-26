export function createDiv(className: string, id?: string): HTMLDivElement {
  const div = document.createElement('div');
  div.className = className;
  if (id) div.id = id;
  return div;
}

export function createButton(text: string, className: string, id: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = className;
  button.id = id;
  button.textContent = text;
  return button;
}
