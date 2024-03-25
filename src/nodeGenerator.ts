export default function createDiv(className: string, id: string): HTMLDivElement {
  const div = document.createElement('div');
  div.className = className;
  div.id = id;
  return div;
}
