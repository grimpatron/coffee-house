import { createButton } from './components/button/button';

export function generateMainScreen(): HTMLElement {
  (document.querySelector('body') as HTMLElement).innerHTML = "";

  const container = createElement('div', 'container');
  const header = createElement('header', 'header');
  const grateful = createElement('div', 'grateful', 'Welcome back ');
  const gratefulName = createElement('span', 'grateful-name');
        gratefulName.id = 'grateful-name';
  const main = createElement('main', 'main');
  const topbar = createElement('div', 'topbar');
  const playground = createElement('div', 'playground');
  const sentence = createElement('div', 'sentence');
  const puzzle = createElement('div', 'puzzle');
  const interfaceDiv = createElement('div', 'interface');

  const myButton = createButton('Log out', 'log-out', ['btn']);
  
  grateful.appendChild(gratefulName);
  header.append(grateful, myButton);
  playground.append(sentence, puzzle);
  main.append(topbar, playground, interfaceDiv);
  container.append(header, main);

  return container;
}

function createElement(tag: string, className: string, textContent = ''): HTMLElement {
  const element = document.createElement(tag);
  element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}