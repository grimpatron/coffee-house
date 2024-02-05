const bodyNode = document.querySelector('body');
const scriptNode = document.querySelector('script');
const container = document.createElement('div');
bodyNode.insertBefore(container, scriptNode);
// 0) разделить на области(собрать по сымыслу и блок вызовов функций)
// 1) создавать контейнер.
// 2) создавать первый экран.
// 3) создавать игровое поле.

generateGameLayout();
function generateGameLayout() {
  container.className = 'container';
  container.innerHTML = `
  <header class='header'>
    <div class="timer">00:00</div>
    <button class="btn btn--menu" id="menu-game">Menu</button>
    <button class="btn btn--restart" id="restart-game">Reset game</button>
    <button class="btn btn--records">Records</button>
  </header>
  <main class='main main--5'></main>
  <audio class="js-win-sound" src="audio/sound-gong.ogg"></audio>
  <audio class="js-paint" src="audio/paint.mp3"></audio>
  <audio class="js-cross" src="audio/cross.mp3"></audio>
  <audio class="js-empty" src="audio/empty.mp3"></audio>`;
}

const easyLevelParams = [5, 3, '10%'];      //  80% / 8 = 10%;
const normalLevelParams = [10, 5, '5.33%']; //  80% / 15 = 5.33% или на 14?
const hardLevelParams = [15, 5, '4%'];      //  80% / 20 = 4%
// const levelParams = {
//   easy: [5, 3, '10%'],
//   normal: [10, 5, '5.33%'],
//   hard: [15, 5, '4%']
// }
const mainNode = document.querySelector('.main');
const timerNode = document.querySelector('.timer');



function generateGame(LevelParams) {
  let curLevelParams = LevelParams;
  generateMarkup('miniature', curLevelParams[0], curLevelParams[0], curLevelParams[0]);
  generateMarkup('clue-col', curLevelParams[0], curLevelParams[1], curLevelParams[0]);
  generateMarkup('clue-row', curLevelParams[0], curLevelParams[0], curLevelParams[1]);
  generateMarkup('playground', curLevelParams[0], curLevelParams[0], curLevelParams[0]);
}

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const fs = require('node:fs');
// const exp = require('patterns.js');
// import exp from "patterns.js";
// console.log(exp);
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
  const leaf = [
    ['0','0','0','0','1','1','1','1','1','1'],
    ['0','0','0','1','0','1','0','1','0','1'],
    ['0','0','1','1','0','1','0','1','1','0'],
    ['0','1','0','1','0','1','1','0','1','0'],
    ['0','1','0','1','1','1','1','1','1','0'],
    ['0','1','0','1','1','0','0','0','1','0'],
    ['0','1','1','1','1','1','1','1','1','0'],
    ['0','0','1','0','0','0','0','1','0','0'],
    ['0','1','0','1','1','1','1','0','0','0'],
    ['1','1','0','0','0','0','0','0','0','0']];
let patternIMG;

let resRow;
let resCol;
// let rotatedMatrix;  // избавится от этой перемемнной
let flattenedMtrxCol;
let flattenedMtrxRow;
let clueRowMatrix;
let clueColMatrix;

// Секундомер
let timerSec = 0;
let timerMin = 0;
let timerRes = '';
let timerID;




function countCells(pttrn, isRow = true) {
  let countsArr = isRow ? pttrn : pttrn[0].map((_, i) => pttrn.map(row => row[i]));
  return countsArr.map(array => {
    let counts = [];
    let count = 0;
    array.forEach(cell => {
      if (cell === '1') {
        count++;
      } else if (count > 0) {
        counts.push(count);
        count = 0;
      }
    });
    if (count > 0) counts.push(count);
    return counts;
  });
}



startGame();  // ПОЕХАЛИ!!!
blalba(); // создание подсказки!!!
function blalba(){
  resCol = countCells(patternIMG, false);
  resRow = countCells(patternIMG, true);
  resCol = addEmptyValues(resCol, 5);
  resRow = addEmptyValues(resRow, 5);
  resCol = rotateMatrix(resCol);
  reverseArr(resCol);
  flattenedMtrxCol = resCol.flat();
  flattenedMtrxRow = resRow.flat();
  clueRowMatrix = document.querySelectorAll('.clue-row .cell');
  clueColMatrix = document.querySelectorAll('.clue-col .cell');
  fillInClue(clueRowMatrix, flattenedMtrxRow);
  fillInClue(clueColMatrix, flattenedMtrxCol);
}


// заполняем пустыми строками отсутсвующие ячейки в подсказках.
function addEmptyValues(arr, wdt) {
  return arr.map(subArr => {
    while (subArr.length < wdt) { subArr.unshift('') }
    return subArr.slice(0, wdt);
  });
}


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

function fillInClue(clueElArr, valueArr) {
  clueElArr.forEach((el, i) => el.innerHTML = valueArr[i]);
}

/////////////////////////////////////////////////////////////////////////////


function generateMarkup(blockClassName, size, rows, cols) {
  let block = document.createElement('div');
  // block.className = blockClassName;
  block.classList.add(blockClassName);
  mainNode.className = `main main--${size}`;

  for (let i = 0; i < rows; i++) {
    let row = document.createElement('div');
    row.className = 'row';  // Создаем строки

    for (let j = 0; j < cols; j++) {
      let cell = document.createElement('div');
      cell.className = `cell cell--${size}`; // В каждой строке создаем ячейки
      row.appendChild(cell);
    }
    block.appendChild(row);
  }

  let wrap;
  if (blockClassName == 'miniature') {
    block.classList.add(`miniature--${size}`);
    wrap = document.createElement('div');
    wrap.className = 'miniature-wrap';
    wrap.appendChild(block);
  } else { wrap = block }
  
  mainNode.appendChild(wrap);
}


// startTimer(); // Запуск таймера
function startTimer() {
  timerID = setInterval(function() {
    timerSec++;
    if (timerSec >= 60) {
      timerSec = 0;
      timerMin++;
    }
    timerRes = ((timerMin < 10 ? "0" : "") + timerMin + ":" + (timerSec < 10 ? "0" : "") + timerSec);
    timerNode.innerHTML = timerRes;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerID);
}

document.querySelector('#menu-game').addEventListener('click', startGame);
function startGame() {
  // Нужно создать все необходимые переменные и поместить остальной код в функции.
  startTimer(timerID);// Должен запускать таймер.
  generateGame(easyLevelParams);
  patternIMG = smile;
}

function stopGame() {
  stopTimer(); // Остановка таймера
  document.querySelector('.js-win-sound').play();
  alert(`УРА!!! Вы справились за ${timerRes}`);
}

document.querySelector('#restart-game').addEventListener('click', resetGame);
function resetGame() {
  // patternIMG = leaf; // незачем!
  cells.forEach(el => {
    el.classList.remove('cell--cross');
    el.classList.remove('cell--black');
  });
  clearInterval(timerID);
  timerSec = 0;
  timerMin = 0;
  startTimer(timerID);
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

////////////////////////////////////////////////////////////////////////////////////


// function generateNumber() {
//   return Math.floor(Math.random() * 5);
// }



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