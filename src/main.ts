import './styles/normalize.css';
import './styles/my-reset.css';
import './styles/style.css';

import createDiv from './nodeGenerator.ts';

const newNode = createDiv('app', 'app');
const parentElement = document.querySelector<HTMLDivElement>('body');
if (parentElement) {
  parentElement.insertBefore(newNode, parentElement.firstChild);
}
