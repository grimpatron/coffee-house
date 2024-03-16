import { createButton } from './components/button/button';

export function generateMainScreen(): void {
  const bodyElement = document.querySelector('body') as HTMLElement;
  bodyElement.innerHTML = '';

  const container = createElement('div', 'container');
  const header = createElement('header', 'header');
  const grateful = createElement('div', 'grateful', 'Welcome back ');
  const gratefulName = createElement('span', 'grateful-name');
        gratefulName.id = 'grateful-name';
  const main = createElement('main', 'main');
  const topbar = createElement('div', 'topbar');
  const playground = createElement('div', 'playground');
  const board = createSentenceElement();
  const sentence = createElement('div', 'sentence');
  const puzzle = createElement('div', 'puzzle');
  const interfaceDiv = createElement('div', 'interface');

  const myButton = createButton('Log out', 'log-out', ['btn']);

  grateful.appendChild(gratefulName);
  header.append(grateful, myButton);
  playground.append(sentence, puzzle, board);
  main.append(topbar, playground, interfaceDiv);
  container.append(main);

  bodyElement.appendChild(header);
  bodyElement.appendChild(container);
}

function createElement(tag: string, className: string, textContent = ''): HTMLElement {
  const element = document.createElement(tag);
  element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

function createSentenceElement(): HTMLElement {
  const HTMLel = document.createElement('div');
  HTMLel.classList.add('board');
  HTMLel.addEventListener('click', function (event) {
    moveBlock(event, '.puzzle');
  });

  return HTMLel;
}

function moveBlock(event: Event, targetClass: string): void {
  if (event.target instanceof HTMLElement && event.target.classList.contains('piece-word')) {
    const targetElement = document.querySelector(targetClass);
    if (targetElement) {
      targetElement.appendChild(event.target);
    }
  }
}

// // Получаем родительский элемент, куда хотим добавить наш элемент
// const parentElement = document.querySelector('.your-parent-element'); // Замените на селектор вашего родительского элемента

// // Создаем элемент и добавляем его в родительский элемент
// const sentenceConstructor = createSentenceElement();
// parentElement.appendChild(sentenceConstructor);

// function moveBlock(event, targetClass) {
//   if (event.target.classList.contains('sentence-block')) {
//       document.querySelector(targetClass).appendChild(event.target);
//   }
// }
