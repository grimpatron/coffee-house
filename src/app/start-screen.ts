import { createButton } from "./components/button/button";

export const generateStartScreen = (): HTMLElement => {
  (document.querySelector('body') as HTMLElement).innerHTML = "";

  const container = document.createElement('div');
  container.className = 'start-container';

  const title = document.createElement('h1');
  title.className = 'start-title';
  title.textContent = 'english puzzle';

  const subtitle = document.createElement('div');
  subtitle.className = 'start-subtitle';
  subtitle.textContent = 'RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork. Click on words, collect phrases. Words can be grab and drop. Select tooltips in the menu.';

  const startBtn = createButton('Start', 'start-btn', ['btn']);

  container.append(title, subtitle, startBtn);

  return container;
};
