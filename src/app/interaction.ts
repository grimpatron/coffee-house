let engLVL: number = 1;
let engRoundNumber: number = 0;
let engWordNumber: number = 0;
let englishSentence: string = '';
// let dataCollection = await getSentence();
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
  const currentAnswer = puzzleLine.querySelectorAll('.card-word');
  let currentResultArr: string[] = [];
  currentAnswer.forEach(element => {
    currentResultArr.push(element.innerHTML);
  });
  const currentResultArrString = currentResultArr.join(" ");

  console.log(currentResultArrString, "||" ,allAnswerSentences);

  if (currentResultArrString === allAnswerSentences) {
    const BtnCheckSentence = document.querySelector('#continue-task') as HTMLElement;
    BtnCheckSentence.classList.remove('btn--disabled');
  }
}

export function makeExercise(e: Event) {
  const target = e.target as HTMLElement;
  if (!target.classList.contains('btn--disabled')) {
    target.classList.add('btn--disabled')
    engWordNumber += 1;
    createPuzzlePart();
  }
}


export async function createPuzzlePart() {
  const data = await getSentence();
  
  const sentenceEL = document.querySelector('.sentence') as HTMLElement;
  sentenceEL.innerHTML = englishSentence;

  allAnswerSentences += " ";
  allAnswerSentences += data.join(" ");
  allAnswerSentences = allAnswerSentences.trim();
  const sentenceSplit = data;
  const shuffledArr: string[] = shuffle(sentenceSplit);
  const letterWDH = countLetterWidth(sentenceSplit);

  const deskEL = document.querySelector('.desk') as HTMLElement;
  shuffledArr.forEach((element) => {
    deskEL.innerHTML += `<div style="width: ${countCardWidth(element, letterWDH)}%" class="card-word card-on-desk">${element}</div>`;
  });
}

async function getSentence() {
  const response = await fetch(`https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${engLVL}.json`);
  const json = await response.json();
  englishSentence = json.rounds[engRoundNumber].words[engWordNumber].textExample;
  return json.rounds[engRoundNumber].words[engWordNumber].textExampleTranslate.split(' ')
}

function shuffle(array: string[]) {
  for (let arrIndex = array.length - 1; arrIndex > 0; arrIndex--) {
    let randomIndex = Math.floor(Math.random() * (arrIndex + 1));
    [array[arrIndex], array[randomIndex]] = [array[randomIndex], array[arrIndex]];
  }
  return array;
}