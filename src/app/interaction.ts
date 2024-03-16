// let result = await fetch('./data/wordCollectionLevel1.json')
let result = await fetch(
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json',
)
  .then((response) => response.json())
  .then((json) => json)
  .catch((err) => new Error(err));

export function createPuzzlePart() {
  const wordsArray = result.rounds[0].words[0].textExampleTranslate.split(' ');
  const shuffledArr: string[] = shuffle(wordsArray);

  const desk = document.querySelector('.board') as HTMLElement;
  shuffledArr.forEach((element) => {
    desk.innerHTML += `<div class="piece-word">${element}</div>`;
  });

  function shuffle(array: string[]) {
    // let arrayRes: string[];
    for (let arrIndex = array.length - 1; arrIndex > 0; arrIndex--) {
      let randomIndex = Math.floor(Math.random() * (arrIndex + 1));
      [array[arrIndex], array[randomIndex]] = [array[randomIndex], array[arrIndex]];
    }

    return array;
  }
}
