import { transformButton } from "./components/button/button";

let engLVL: number = 1;
let engRoundNumber: number = 0;
let engWordNumber: number = 0;
let russianSentence: string = '';
let englishSentenceArr: string[] = [];
let allAnswerSentences: string = '';


function countLetterWidth(sentenceSplit: string[]): number {
  const totalWords = sentenceSplit.length;
  const totalLetters = sentenceSplit.reduce((acc: number, word: string) => acc + word.length, 0);
  const spaceSymbols = totalWords * 2;
  const letterWidth = 100 / (totalLetters + spaceSymbols);
  return letterWidth;
}

function countCardWidth(element: string, letterWDH: number): number {
  return element.length * letterWDH + (letterWDH * 2);
}


export async function checkAnswer() {
  const puzzleLine = document.querySelector('.puzzle') as HTMLElement;
  const BtnCheckSentence = document.querySelector('#check-exercise') as HTMLElement;
  const currentAnswer = puzzleLine.querySelectorAll('.card-word');
  let currentResultArr: string[] = [];
  currentAnswer.forEach(element => {
    currentResultArr.push(element.innerHTML);
  });

  const currentResultString = currentResultArr.join(" ");
  if (BtnCheckSentence) {
    BtnCheckSentence.classList.toggle('btn--disabled', currentResultString.length !== allAnswerSentences.length);
  }
}

export function nextExercise() {
    engWordNumber += 1;
    let CW = document.querySelectorAll('.card-word');
    CW.forEach((element) => element.classList.add('card-word--disabled'));
    createPuzzlePart();
}

export function checkExercise(e: Event) {
  const target = e.target as HTMLElement;
  if (!target.classList.contains('btn--disabled')) {
    let PL = document.querySelector('.puzzle') as HTMLElement;
    let CW = PL.querySelectorAll('.card-word');
    CW.forEach((element, i) => {
      let elHTML = element as HTMLElement;
      if (elHTML.innerHTML === englishSentenceArr[i]) {
        elHTML.style.backgroundColor = 'chartreuse';
      } else {
        elHTML.style.backgroundColor = 'coral';
      }
    });

    const puzzleLine = document.querySelector('.puzzle') as HTMLElement;
    const currentAnswer = puzzleLine.querySelectorAll('.card-word');
    let currentResultArr: string[] = [];
    currentAnswer.forEach(element => {
      currentResultArr.push(element.innerHTML);
    });

    const currentResultString = currentResultArr.join(" ");
    if (currentResultString === allAnswerSentences) {
      target.classList.add('btn--disabled');
      transformButton('check-exercise', 'Continue', 'next-exercise', 'btn', 'click', nextExercise, checkExercise);
    }
  }
}


export async function createPuzzlePart() {
  const data = await getSentence();
  
  const sentenceEL = document.querySelector('.sentence') as HTMLElement;
  sentenceEL.innerHTML = russianSentence;

  allAnswerSentences += " ";
  allAnswerSentences += data.join(" ");
  allAnswerSentences = allAnswerSentences.trim();
  const sentenceSplit = data;
  const shuffledArr: string[] = shuffle(sentenceSplit);
  const letterWDH = countLetterWidth(sentenceSplit);

  const deskEL = document.querySelector('.desk') as HTMLElement;
  
  shuffledArr.forEach((element) => {
    deskEL.appendChild(createDiv(element, countCardWidth(element, letterWDH)));
  });
}

function createDiv(content: string, width: number): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'card-word card-on-desk';
  div.style.width = width + '%';
  div.draggable = true;
  div.ondragover = (event: DragEvent) => dragOver(event);
  div.ondragstart = (event: DragEvent) => dragStart(event);
  div.textContent = content;
  return div;
}

let draggedEl: HTMLElement | null;
function dragOver(event: DragEvent) {
  const targetElement = event.target as HTMLElement;
  if (targetElement.classList.contains("card-word--disabled")) {
    return;
  }
  event.preventDefault();
  if (isBefore(draggedEl, event.target as HTMLElement)) {
    (event.target as HTMLElement).parentNode!.insertBefore(draggedEl!, event.target as HTMLElement);
  } else {
    (event.target as HTMLElement).parentNode!.insertBefore(draggedEl!, (event.target as HTMLElement).nextSibling);
  }
}
function isBefore(el1: HTMLElement | null, el2: HTMLElement | null) {
  if (el2 && el1 && el2.parentNode === el1.parentNode) {
    for (let cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling) {
      if (cur === el2) { return true; }
    }
  }
  return false;
}

function dragStart(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", "");
  }
  draggedEl = event.target as HTMLElement;
}

export function dropInContainer(_event: Event, targetClass: string) {
  const parentContainer = document.querySelector(`${targetClass}`) as HTMLElement;
  if (draggedEl && !parentContainer.contains(draggedEl)) {
    parentContainer.appendChild(draggedEl);
  }
  
  checkAnswer();
}

async function getSentence() {
  const response = await fetch(`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${engLVL}.json`);
  const json = await response.json();
  russianSentence = json.rounds[engRoundNumber].words[engWordNumber].textExampleTranslate;
  englishSentenceArr = englishSentenceArr.concat(json.rounds[engRoundNumber].words[engWordNumber].textExample.split(' '));
  return json.rounds[engRoundNumber].words[engWordNumber].textExample.split(' ')
}

function shuffle(array: string[]) {
  for (let arrIndex = array.length - 1; arrIndex > 0; arrIndex--) {
    let randomIndex = Math.floor(Math.random() * (arrIndex + 1));
    [array[arrIndex], array[randomIndex]] = [array[randomIndex], array[arrIndex]];
  }
  return array;
}

export function autoCompleteExercise() {
  englishSentenceArr.forEach(element => {
    for (let i = 0; i < englishSentenceArr.length; i++) {
      const CWCollection = Array.from(document.querySelectorAll('.card-word'));
      if (element == CWCollection[i].innerHTML) {
        (CWCollection[i] as HTMLElement).click();
        CWCollection.pop();
      }
    }
  });
}
