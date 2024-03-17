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
  const puzzleLine = document.querySelector('.puzzle-line') as HTMLElement;
  const BtnCheckSentence = document.querySelector('#check-exercise') as HTMLElement;
  const currentAnswer = puzzleLine.querySelectorAll('.card-word');
  let currentResultArr: string[] = [];
  currentAnswer.forEach(element => {
    currentResultArr.push(element.innerHTML);
  });

  const currentResultString = currentResultArr.join(" ");
  BtnCheckSentence.classList.toggle('btn--disabled', currentResultString.length !== allAnswerSentences.length);
}

export function nextExercise() {
    engWordNumber += 1;
    let CW = document.querySelectorAll('.card-word');
    CW.forEach((element) => element.classList.add('card-word--disabled'));
    createPuzzlePart();
    transformButton('next-exercise', 'Check', 'check-exercise', 'btn btn--disabled', 'click', checkExercise, nextExercise);
}

export function checkExercise(e: Event) {
  const target = e.target as HTMLElement;
  if (!target.classList.contains('btn--disabled')) {
    target.classList.add('btn--disabled')
    let PL = document.querySelector('.puzzle-line') as HTMLElement;
    let CW = PL.querySelectorAll('.card-word');
    CW.forEach((element, i) => {
      let elHTML = element as HTMLElement;
      if (elHTML.innerHTML === englishSentenceArr[i]) {
        elHTML.style.backgroundColor = 'cadetblue';
      } else {
        elHTML.style.backgroundColor = 'coral';
      }
    });

    const puzzleLine = document.querySelector('.puzzle-line') as HTMLElement;
    const currentAnswer = puzzleLine.querySelectorAll('.card-word');
    let currentResultArr: string[] = [];
    currentAnswer.forEach(element => {
      currentResultArr.push(element.innerHTML);
    });

    const currentResultString = currentResultArr.join(" ");
    if (currentResultString === allAnswerSentences) {
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
  shuffledArr.forEach((element, index) => {
    deskEL.innerHTML += `<div style="width: ${countCardWidth(element, letterWDH)}%" 
    data-position="${index}" class="card-word card-on-desk">${element}</div>`;
  });
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