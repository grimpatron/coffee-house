/* eslint-disable */
import "./styles/normalize.css";
import "./styles/my-reset.css";
import "./styles/style.css";

import "./local-storage.ts";
import { checkStorageData } from "./local-storage.ts";
import { getStorageData } from "./local-storage.ts";
import { saveUserData } from "./local-storage.ts";
import { createDiv } from "./nodeGenerator.ts";
import { createButton } from "./nodeGenerator.ts";

const newNode = createDiv("header", "header");
const bodyElement = document.querySelector<HTMLDivElement>("body");
if (bodyElement) {
  bodyElement.insertBefore(newNode, bodyElement.firstChild);
}

const appDiv = document.getElementById("header")!;
const topBarDiv = createDiv("topbar");
const topBarInterfaceDiv = createDiv("topbar-interface");
const topBarPageDiv = createDiv("topbar-page");
const pageButtonsDiv = createDiv("page-buttons");
const garageBtn = createButton("to Garage", "btn", "garageBtn");
const scoreBtn = createButton("to Winners", "btn", "scoreBtn");

pageButtonsDiv.appendChild(garageBtn);
pageButtonsDiv.appendChild(scoreBtn);
topBarInterfaceDiv.appendChild(pageButtonsDiv);
topBarDiv.append(topBarInterfaceDiv, topBarPageDiv);
appDiv.appendChild(topBarDiv);

function showPage(nameOfPage?: string): void {
  checkStorageData();
  const userData = getStorageData();
  let currentPage = userData.pageName;
  if (nameOfPage) currentPage = nameOfPage;
  const app = document.querySelector(".topbar-page") as HTMLElement;
  const pageContent: string = `
    <h1 class="page-title">${currentPage} (<span>${userData[currentPage].list.length}</span>)</h1>
    <h2 class="page-subtitle">Page #<span>${userData[currentPage].page}</span></h2>`;
  bodyElement!.style.backgroundImage = `url(img/${userData[currentPage].background})`;
  app.innerHTML = pageContent;

  if (nameOfPage) userData.pageName = nameOfPage;
  saveUserData(userData);
}

document
  .getElementById("garageBtn")!
  .addEventListener("click", () => showPage("garage"));
document
  .getElementById("scoreBtn")!
  .addEventListener("click", () => showPage("winners"));

showPage();
