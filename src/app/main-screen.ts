import { createButton } from './components/button/button';
import { createButtonWithEvent } from './components/button/button';
import { checkAnswer } from './interaction';
// import { nextExercise } from './interaction';
import { checkExercise } from './interaction';

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
  const desk = createSentenceElement('div', 'desk', '.puzzle-line');
  const sentence = createElement('div', 'sentence');
  const puzzle = createSentenceElement('div', 'puzzle', '.desk');
  for (let index = 0; index < 10; index++) {
    const puzzleLine = createElement('div', `puzzle-line puzzle-line--${index + 1}`);
    puzzle.append(puzzleLine);
  }
  const interfaceDiv = createElement('div', 'interface');
  const buttonLogOut = createButton('Log out', 'log-out', ['btn']);
  const buttonCheckExercise = createButtonWithEvent('Check', 'check-exercise', ['btn', 'btn--disabled'], 'click', checkExercise);
  // const buttonNextExercise = createButtonWithEvent('Continue', 'next-exercise', ['btn', 'btn--disabled'], 'click', nextExercise);
  
  grateful.appendChild(gratefulName);
  header.append(grateful, buttonLogOut);
  playground.append(sentence, puzzle, desk);
  // interfaceDiv.append(buttonCheckExercise, buttonNextExercise);
  interfaceDiv.append(buttonCheckExercise);
  main.append(topbar, playground, interfaceDiv);
  container.append(main);

  bodyElement.appendChild(header);
  bodyElement.appendChild(container);
}

function createElement(tag: string, className: string, textContent = ''): HTMLElement {
  const HTMLelm = document.createElement(tag);
  HTMLelm.className = className;
  if (textContent) HTMLelm.textContent = textContent;
  return HTMLelm;
}

function createSentenceElement(tag: string, className: string, target: string): HTMLElement {
  const HTMLelm = document.createElement(tag);
  HTMLelm.className = className;
  HTMLelm.addEventListener('click', function (event) {
    moveBlock(event, target);
  });
  return HTMLelm;
}

function moveBlock(event: Event, targetClass: string): void {
  if (event.target instanceof HTMLElement && 
      event.target.classList.contains('card-word') && 
      !event.target.classList.contains('card-word--disabled')) {
    if (event.target.classList.contains("card-on-desk")) {
      event.target.classList.remove("card-on-desk");
      event.target.classList.add("card-on-puzzle");
    } else {
      event.target.classList.add("card-on-desk");
      event.target.classList.remove("card-on-puzzle");
    }
    const targetElement = document.querySelector(targetClass);
    
    event.target.style.color = '';
    if (targetElement) {
      targetElement.appendChild(event.target);
    }
  }
  checkAnswer();
}
