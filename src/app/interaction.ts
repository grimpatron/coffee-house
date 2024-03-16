let dataCollection = await fetch('https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json')
  .then((response) => response.json())
  .then((json) => json)
  .catch((err) => new Error(err));

export function createPuzzlePart() {
  const sentenceSplit = dataCollection.rounds[0].words[0].textExampleTranslate.split(' ');
  const shuffledArr: string[] = shuffle(sentenceSplit);
  const letterWDH = countLetterWidth(sentenceSplit);
  
  const deskEL = document.querySelector('.board') as HTMLElement;
  shuffledArr.forEach((element) => {
    deskEL.innerHTML += `<div style="width: ${countCardWidth(element, letterWDH)}%" class="card-word">${element}</div>`;
  });

  function shuffle(array: string[]) {
    for (let arrIndex = array.length - 1; arrIndex > 0; arrIndex--) {
      let randomIndex = Math.floor(Math.random() * (arrIndex + 1));
      [array[arrIndex], array[randomIndex]] = [array[randomIndex], array[arrIndex]];
    }
    return array;
  }
}

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