const bodyNode = document.querySelector('body');
const scriptNode = document.querySelector('script');
let container = document.createElement('div');
container.className = 'container';
container.innerHTML = `
<header class='header'>
  <div class="timer">00:00</div>
  <button class="btn menu">Menu</button>
  <button class="btn restart">Reset game</button>
  <button class="btn restart">Records</button>
</header>
<main class='main'></main>
<audio class="js-win-sound" src="audio/sound-gong.ogg"></audio>
<audio class="js-paint" src="audio/paint.mp3"></audio>
<audio class="js-cross" src="audio/cross.mp3"></audio>
<audio class="js-empty" src="audio/empty.mp3"></audio>`;
bodyNode.insertBefore(container, scriptNode);

const easyLevelParams = [5, 3, '10%'];      //  80% / 8 = 10%;
const normalLevelParams = [10, 5, '5.33%']; //  80% / 15 = 5.33% или на 14?
const hardLevelParams = [15, 5, '4%'];      //  80% / 20 = 4%
let curLevelParams = easyLevelParams;
const mainNode = document.querySelector('.main');
function generateGame() {
  generateMarkup('miniature', curLevelParams[0], curLevelParams[0]);
  generateMarkup('clue-col', curLevelParams[1], curLevelParams[0]);
  generateMarkup('clue-row', curLevelParams[0], curLevelParams[1]);
  generateMarkup('playground', curLevelParams[0], curLevelParams[0]);
}
generateGame();

const cells = document.querySelectorAll('.playground .cell');
cells.forEach(el => el.addEventListener('click', (e) => {
  e.target.classList.remove('cell--cross');
  e.target.classList.toggle('cell--black');
  statusGame();
  playEffect(e.target);
}));
cells.forEach(el => el.addEventListener('contextmenu', (e) => {
  e.preventDefault(); // Убрал контекстное меню
  e.target.classList.remove('cell--black');
  e.target.classList.toggle('cell--cross');
  playEffect(e.target);
}));



const smile = [
  ['1','1','0','1','1'],
  ['1','1','0','1','1'],
  ['0','0','0','0','0'],
  ['1','0','0','0','1'],
  ['0','1','1','1','0']];
const sandglass = [
  ['1','1','1','1','1'],
  ['0','1','1','1','0'],
  ['0','0','1','0','0'],
  ['0','1','0','1','0'],
  ['1','1','1','1','1']];
const heart = [
  ['0','1','0','1','0'],
  ['1','0','1','0','1'],
  ['1','0','0','0','1'],
  ['0','1','0','1','0'],
  ['0','0','1','0','0']];
const hare = [
  ['0','1','1','0','0'],
  ['0','0','0','1','1'],
  ['0','1','1','1','1'],
  ['1','1','1','1','0'],
  ['0','1','1','1','1']];
const fountain = [
  ['0','1','0','1','0'],
  ['1','0','1','0','1'],
  ['0','0','1','0','0'],
  ['1','1','1','1','1'],
  ['0','1','1','1','0']];
let patternIMG;
startGame();  // ПОЕХАЛИ!!!




function countCells(mtrx, isRow = true) {
  let countsArr = isRow ? mtrx : mtrx[0].map((col, i) => mtrx.map(row => row[i]));
  
  let counts = countsArr.map(array => {
    let count = 0;
    let counts = [];
    for (let cell of array) {
      if (cell === '1') {
        count++;
      } else if (count > 0) {
        counts.push(count);
        count = 0;
      }
    }
    if (count > 0) counts.push(count);
    return counts;
  });

  return counts;
}
let resRow = countCells(patternIMG, true);
let resCol = countCells(patternIMG, false);







// заполняем пустыми строками отсутсвующие ячейки в подсказках.
function addEmptyValues(arr) {
  return arr.map(subArr => {
    while (subArr.length < 3) { subArr.unshift('') }
    return subArr.slice(0, 3);
  });
}
resCol = addEmptyValues(resCol);
resRow = addEmptyValues(resRow);



// переворачивает матрицу на 90 против часовой
function rotateMatrix(matrix) {
  let rotatedMatrix = [];
  for(let i = 0; i < matrix[0].length; i++) {
    rotatedMatrix[i] = [];
    for(let j = 0; j < matrix.length; j++) {
      rotatedMatrix[i][j] = matrix[matrix.length - j - 1][i];
    }
  }
  return rotatedMatrix;
}

function reverseArr(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].reverse();
  }
}

let rotatedMatrix = rotateMatrix(resCol);
reverseArr(rotatedMatrix);
let flattenedMtrxCol = rotatedMatrix.flat();
let flattenedMtrxRow = resRow.flat();

const clueRowMatrix = document.querySelectorAll('.clue-row .cell');
const clueColMatrix = document.querySelectorAll('.clue-col .cell');
fillInClue(clueRowMatrix, flattenedMtrxRow);
fillInClue(clueColMatrix, flattenedMtrxCol);

function fillInClue(clueElArr, valueArr) {
  clueElArr.forEach((el, i) => el.innerHTML = valueArr[i]);
}

///////////////////////////////////////////////////////




function generateMarkup(blockClassName, rows, cols) {
  let block = document.createElement('div');
  block.className = blockClassName;

  // Создаем rows строки
  for (let i = 0; i < rows; i++) {
    let row = document.createElement('div');
    row.className = 'row';

    // В каждой строке создаем cols ячеек
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      row.appendChild(cell);
    }

    block.appendChild(row);
  }

  // переписать чтобы сразусодзавались дивы а потом ячеййки
  if (blockClassName == 'miniature') {
    let wrap = document.createElement('div');
    wrap.className = 'miniature-wrap';
    wrap.appendChild(block);
    mainNode.appendChild(wrap);
    return;
  }
  
  mainNode.appendChild(block);
}


// Секундомер
let sec = 0;
let min = 0;
let endTime;
let timerID;
const timerNode = document.querySelector('.timer');
function startTimer() {
  timerID = setInterval(function() {
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    endTime = ((min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec);
    timerNode.innerHTML = endTime;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerID);
}
startTimer(); // Запуск таймера


function startGame() {
  // Должен запускать таймер.
  // Должен рандомно выбирать картинку.
  patternIMG = heart;
}

function stopGame() {
  stopTimer(); // Остановка таймера
  document.querySelector('.js-win-sound').play();
  alert(`УРА!!! Вы справились за ${endTime}`);
}

function statusGame() {
  let cls = document.querySelectorAll('.playground .cell');
  let canvasIMG = [];
  for (let i = 0; i < cls.length; i++) {
    if (cls[i].classList.contains('cell--black')) {
      canvasIMG[i] = '1';
    } else {
      canvasIMG[i] = '0';
    }
  }
  if (canvasIMG.toString() === patternIMG.flat().toString()) {
    stopGame();
  }
}

function playEffect(target) {
  if (target.classList.contains('cell--black')) {
    document.querySelector('.js-paint').play();
  } else if (target.classList.contains('cell--cross')) {
    document.querySelector('.js-cross').play();
  } else if (!target.classList.contains('cell--cross') && 
             !target.classList.contains('cell--black')) {
    document.querySelector('.js-empty').play();
  }
}


// function generateNumber() {
//   return Math.floor(Math.random() * 5);
// }




////////////////////////////////////////////////////////////////////////////////////
// Сделать систему сохранений!!
// let recordList = [];
// if (localStorage.getItem('random-game-records')) {
//   recordList = JSON.parse(localStorage.getItem('random-game-records'));
// } else localStorage.setItem('random-game-records', JSON.stringify(recordList));

// function saveScore(scoreValue) {
//   if (recordList.length < 10) {
//     recordList.push(scoreValue);
//   } else if (scoreValue > recordList[recordList.length - 1]) {
//     recordList.pop();
//     recordList.push(scoreValue);
//   }
//   recordList = recordList.sort(function(a, b) { return b - a; });
//   localStorage.setItem('random-game-records', JSON.stringify(recordList));
//   showRecords();
// }

// function showRecords() {
//   let recStr = '';
//   for (let recordEl of recordList) recStr += `<li>${recordEl}</li>`;
//   document.getElementById('records').innerHTML = recStr;
// }