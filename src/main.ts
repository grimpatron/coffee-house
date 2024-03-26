/* eslint-disable */
import './styles/normalize.css';
import './styles/my-reset.css';
import './styles/style.css';

import {createDiv} from './nodeGenerator.ts';
import {createButton} from './nodeGenerator.ts';

const newNode = createDiv('header', 'header');
const bodyElement = document.querySelector<HTMLDivElement>('body');
if (bodyElement) {
  bodyElement.insertBefore(newNode, bodyElement.firstChild);
}

const appDiv = document.getElementById('header')!;
const topBarDiv = createDiv('topbar');
const topBarInterfaceDiv = createDiv('topbar-interface');
const topBarPageDiv = createDiv('topbar-page');
const pageButtonsDiv = createDiv('page-buttons');
const garageBtn = createButton('Home', 'btn', 'garageBtn');
const scoreBtn = createButton('About', 'btn', 'scoreBtn');

pageButtonsDiv.appendChild(garageBtn);
pageButtonsDiv.appendChild(scoreBtn);
topBarInterfaceDiv.appendChild(pageButtonsDiv);
topBarDiv.append(topBarInterfaceDiv, topBarPageDiv);
appDiv.appendChild(topBarDiv);


interface PageConfig {
  title: string;
  background: string;
}

const pages: Record<string, PageConfig> = {
  garage: {
    title: "Garage",
    background: "garage.jpg",
  },
  winners: {
    title: "Winners",
    background: "blacklist.jpg",
  },
};

function showPage(pageName: keyof typeof pages): void {
  const app = document.querySelector(".topbar-page") as HTMLElement;
  const pageContent: string = `<h1 class="page-title">${pages[pageName].title} (<span>${0}</span>)</h1>
  <h2 class="page-subtitle">Page #<span>${0}</span></h2>`;
  bodyElement!.style.backgroundImage = `url(img/${pages[pageName].background})`;
  app.innerHTML = pageContent;
}

document
  .getElementById("garageBtn")!
  .addEventListener("click", () => showPage("garage"));
document
  .getElementById("scoreBtn")!
  .addEventListener("click", () => showPage("winners"));

showPage("garage");
