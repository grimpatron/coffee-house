import './my-reset.css'
import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'





// import { createButton } from "./components/button";
// export const generateStartScreen = (): HTMLElement => {
// // (document.querySelector('body') as HTMLElement).innerHTML = "";

// const container = document.createElement('div');
// container.className = 'start-container';

// const title = document.createElement('h1');
// title.className = 'start-title';
// title.textContent = 'english puzzle';

// const subtitle = document.createElement('div');
// subtitle.className = 'start-subtitle';
// subtitle.textContent = 'English Puzzle is an interactive mini-game aimed at enhancing English language skills. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork. Click on words, collect phrases. Words can be grab and drop. Select tooltips in the menu.';

// const startBtn = createButton('Start', 'start-btn', ['btn']);

// container.append(title, subtitle, startBtn);

// return container;
// };

// (document.querySelector('body') as HTMLElement).appendChild(generateStartScreen());



export function generateLoginForm() {
  return `
  <div class="registration_container">
    <h2 class="registration_title">User authorization</h2>
    <form id="registration_form">
        <input class="registration_username" id="authorization-username" type="text" placeholder="Username" required>
        <input class="registration_pass" id="authorization-password" type="password" placeholder="Password" required>
        <button class="registration_submit" id="authorization-submit" type="submit">Authorization</button>
        <p class="registration_error" id="authorization-error-message" class="error-message"></p>
    </form>
  </div>
  `;
}
(document.querySelector('body') as HTMLElement).innerHTML = generateLoginForm();





// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
