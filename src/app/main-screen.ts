import { createButton } from './components/button/button';
import { createButtonWithEvent } from './components/button/button';
import { transformButton } from './components/button/button';
import { checkAnswer } from './interaction';
import { autoCompleteExercise } from './interaction';
import { checkExercise } from './interaction';
import { nextExercise } from './interaction';
import { dropInContainer } from './interaction';

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
  const desk = createSentenceElement('div', 'desk', '.puzzle', '.desk');
  const sentence = createElement('div', 'sentence');
  const puzzle = createSentenceElement('div', 'puzzle', '.desk', '.puzzle');
  const interfaceDiv = createElement('div', 'interface');
  const buttonLogOut = createButton('Log out', 'log-out', ['btn']);
  const buttonCheckExercise = createButtonWithEvent('Check', 'check-exercise', ['btn', 'btn--disabled'], 'click', checkExercise);
  const buttonAutoComplete = createButtonWithEvent('Auto-Complete', 'auto-complete', ['btn'], 'click', autoCompleteExercise);
  
  grateful.appendChild(gratefulName);
  header.append(grateful, buttonLogOut);
  playground.append(sentence, puzzle, desk);
  interfaceDiv.append(buttonCheckExercise, buttonAutoComplete);
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

function createSentenceElement(tag: string, className: string, target: string, target2: string): HTMLElement {
  const HTMLelm = document.createElement(tag);
  HTMLelm.className = className;
  HTMLelm.addEventListener('click', function (event) {
    moveBlock(event, target);
  });
  HTMLelm.addEventListener('dragover', function (event) {
    dragOverContainer(event);
  });
  HTMLelm.addEventListener('drop', function (event) {
    dropInContainer(event, target2);
  });
  return HTMLelm;
}
function dragOverContainer(event: DragEvent) {
  event.preventDefault();
}

function moveBlock(event: Event, targetClass: string): void {
  if (document.querySelector('#next-exercise')) {
    transformButton('next-exercise', 'Check', 'check-exercise', 'btn', 'click', checkExercise, nextExercise);
  }
  
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
