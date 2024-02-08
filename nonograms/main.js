const bodyNode = document.querySelector('body');
const scriptNode = document.querySelector('script');
const container = document.createElement('div');
const settings = document.createElement('div');
const modals = document.createElement('div');
bodyNode.insertBefore(container, scriptNode);
bodyNode.insertBefore(modals, scriptNode);
bodyNode.prepend(settings);


function generateGameLayout() {
  settings.classList.add('settings');
  settings.innerHTML = `
  <button class="setting-btn" id="btn-menu">Menu</button>
  <button class="setting-btn" id="btn-sound">sound</button>
  <button class="setting-btn" id="btn-theme">theme</button>
  <button class="setting-btn" id="btn-score">score</button>`;
  modals.innerHTML += `
  <div class="modal" id="myModal">
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <h2 class="record-header">List of records</h2>
      <ul id='record-list'></ul>
    </div>
  </div>
  <div class="modal" id="winModal">
    <div class="modal-content">
      <span class="win-modal-close">&times;</span>
      <div class="win-text">Great! You have solved the nonogram in <span id="modal-timer"></span> seconds!</div>  
    </div>
  </div>`;

  container.className = 'container';
  container.innerHTML = `
  <div class="menu">
    <h1 class="menu-title">Nonogram</h1>
    <h2 class="menu-subtitle">Select difficulty:</h2>
    <button class="menu-level menu-level--list" data-lvl='easy'>Easy (5x5)</button>
    <button class="menu-level menu-level--list" data-lvl='normal'>Normal (10x10)</button>
    <button class="menu-level menu-level--list" data-lvl='hard'>Hard (15x15)</button>
    <button class="menu-level menu-level--rand" data-lvl='random'>Random (??x??)</button>
    <button class="menu-level menu-level--cont" data-lvl='continue'>Continue Last Game</button>
  </div>
  <ul class="menu-list"></ul>
  <header class='header'>
    <div class="timer">00:00</div>
    <button class="btn btn--save" id="save-game">Save game</button>
    <button class="btn btn--restart" id="restart-game">Reset game</button>
    <button class="btn btn--solution" id="solution-game">Solution</button>
  </header>
  <main class='main main--5'></main>
  <audio class="js-sound js-win-sound" src="audio/sound-gong.ogg"></audio>
  <audio class="js-sound js-paint" src="audio/paint.mp3"></audio>
  <audio class="js-sound js-cross" src="audio/cross.mp3"></audio>
  <audio class="js-sound js-empty" src="audio/empty.mp3"></audio>`;
} generateGameLayout();

const mainNode = document.querySelector('.main');
const headerNode = document.querySelector('.header');
const timerNode = document.querySelector('.timer');
const menuNode = document.querySelector('.menu');
const menuListNode = document.querySelector('.menu-list');

const easyPictures = {
smile: [
['1','1','0','1','1'],
['1','1','0','1','1'],
['0','0','0','0','0'],
['1','0','0','0','1'],
['0','1','1','1','0']],
sandglass: [
['1','1','1','1','1'],
['0','1','1','1','0'],
['0','0','1','0','0'],
['0','1','0','1','0'],
['1','1','1','1','1']],
heart: [
['0','1','0','1','0'],
['1','0','1','0','1'],
['1','0','0','0','1'],
['0','1','0','1','0'],
['0','0','1','0','0']],
hare: [
['0','1','1','0','0'],
['0','0','0','1','1'],
['0','1','1','1','1'],
['1','1','1','1','0'],
['0','1','1','1','1']],
fountain: [
['0','1','0','1','0'],
['1','0','1','0','1'],
['0','0','1','0','0'],
['1','1','1','1','1'],
['0','1','1','1','0']]
}
const normalPictures = {
cherry: [
['0','0','0','0','1','1','1','0','0','0'],
['0','0','1','1','1','1','0','1','0','0'],
['0','1','0','1','0','1','1','0','1','0'],
['1','1','1','0','0','1','0','1','1','1'],
['0','0','0','0','0','1','0','0','0','0'],
['0','0','1','1','1','0','1','1','1','0'],
['0','1','1','1','1','1','0','1','1','1'],
['0','1','1','1','0','1','0','1','0','1'],
['0','1','1','1','1','1','0','1','1','1'],
['0','0','1','1','1','0','1','1','1','0']],
leaf: [
['0','0','0','0','1','1','1','1','1','1'],
['0','0','0','1','0','1','0','1','0','1'],
['0','0','1','1','0','1','0','1','1','0'],
['0','1','0','1','0','1','1','0','1','0'],
['0','1','0','1','1','1','1','1','1','0'],
['0','1','0','1','1','0','0','0','1','0'],
['0','1','1','1','1','1','1','1','1','0'],
['0','0','1','0','0','0','0','1','0','0'],
['0','1','0','1','1','1','1','0','0','0'],
['1','1','0','0','0','0','0','0','0','0']],
cup: [
['0','0','1','0','1','0','1','0','0','0'],
['0','0','1','0','1','0','1','0','0','0'],
['0','0','0','0','0','0','0','0','0','0'],
['0','1','1','1','1','1','1','1','0','0'],
['0','1','1','0','1','1','1','1','1','1'],
['0','1','1','0','1','1','1','1','0','1'],
['0','1','1','1','1','1','1','1','1','0'],
['0','1','1','1','1','1','1','1','0','0'],
['1','0','1','1','1','1','1','0','0','1'],
['0','1','1','1','1','1','1','1','1','0']],
tree: [
['0','0','1','1','1','1','1','1','0','0'],
['0','1','1','1','1','0','1','1','1','0'],
['1','1','1','1','1','0','1','1','1','1'],
['1','1','0','1','1','1','0','0','1','1'],
['1','1','1','0','1','1','1','1','1','0'],
['0','1','1','1','1','1','0','0','0','0'],
['0','0','0','0','1','1','1','0','0','0'],
['0','0','0','0','1','1','0','0','0','0'],
['0','1','0','0','1','1','0','0','1','0'],
['1','1','1','1','1','1','1','1','1','1']],
mouse: [
['0','0','1','1','0','0','0','1','1','0'],
['0','1','0','0','1','0','1','0','0','1'],
['0','1','0','1','1','1','1','1','0','1'],
['0','0','1','1','0','1','0','1','1','0'],
['0','0','0','1','1','1','1','1','0','0'],
['0','0','1','1','1','0','1','1','1','0'],
['1','0','1','1','1','1','1','1','1','1'],
['1','0','1','1','1','1','1','1','1','1'],
['1','0','1','1','1','1','1','1','1','1'],
['0','1','1','1','1','1','1','1','1','0']]
}
const hardPictures = {
octopus: [
['0','0','1','1','1','0','0','0','0','0','1','0','0','0','1'],
['0','1','1','1','1','1','1','0','0','1','0','0','0','1','0'],
['1','1','1','1','1','1','1','1','0','1','1','0','0','1','0'],
['1','1','1','1','1','1','0','1','0','0','1','0','0','1','1'],
['1','1','1','1','0','1','0','1','0','0','1','1','0','0','1'],
['0','1','1','1','0','1','1','1','0','0','0','1','1','0','1'],
['0','1','1','1','1','1','1','1','1','0','0','1','1','1','0'],
['0','0','0','1','1','1','1','1','1','1','1','1','1','0','1'],
['1','0','0','1','1','1','1','1','1','1','1','1','0','0','1'],
['1','0','1','1','1','1','1','1','1','1','0','0','0','1','0'],
['0','1','1','1','1','0','1','1','1','1','1','1','1','0','1'],
['0','0','0','1','1','0','1','1','0','1','1','0','0','0','0'],
['0','0','0','1','1','0','0','1','0','0','1','0','0','0','1'],
['0','0','1','1','0','1','0','1','0','0','1','1','0','0','1'],
['1','1','1','0','0','1','0','0','1','1','0','1','1','1','0']],
alarm: [
['0','0','1','1','1','0','0','0','0','0','1','1','1','0','0'],
['0','1','1','1','0','0','1','1','1','0','0','1','1','1','0'],
['1','1','1','0','1','1','1','0','1','1','1','0','1','1','1'],
['1','1','0','1','1','1','1','0','1','1','1','1','0','1','1'],
['1','0','1','1','1','1','1','1','1','1','0','1','1','0','1'],
['0','0','1','1','1','1','1','1','1','0','1','1','1','0','0'],
['0','1','1','1','1','1','1','1','0','1','1','1','1','1','0'],
['0','1','0','0','1','0','0','0','1','1','1','0','0','1','0'],
['0','1','1','1','1','1','1','1','1','1','1','1','1','1','0'],
['0','0','1','1','1','1','1','1','1','1','1','1','1','0','0'],
['0','0','1','1','1','1','1','0','1','1','1','1','1','0','0'],
['0','0','0','1','1','1','1','0','1','1','1','1','0','0','0'],
['0','0','1','0','0','1','1','1','1','1','0','0','1','0','0'],
['0','1','0','0','1','0','1','1','1','0','1','0','0','1','0'],
['0','0','1','1','0','0','0','0','0','0','0','1','1','0','0']],
duck: [
['0','0','0','0','0','0','0','0','0','1','1','1','0','0','0'],
['0','0','0','0','0','0','0','0','1','1','1','1','1','0','0'],
['0','0','0','0','0','0','0','1','1','1','1','0','1','1','1'],
['0','0','0','0','0','0','0','1','1','1','1','1','1','1','0'],
['0','0','0','0','0','0','0','0','1','1','1','1','1','0','0'],
['0','0','0','0','0','0','0','0','0','1','1','1','0','0','0'],
['0','0','0','0','0','0','0','0','1','1','1','1','1','0','0'],
['1','0','0','0','0','0','1','1','1','1','1','1','1','1','0'],
['1','1','1','0','0','1','1','1','0','0','0','1','1','1','0'],
['1','1','1','1','1','1','1','0','1','1','1','0','1','1','0'],
['0','1','1','1','1','1','0','1','1','1','1','0','1','1','0'],
['0','1','1','1','1','1','1','1','1','0','0','1','1','0','0'],
['0','0','1','1','1','1','1','1','1','1','1','1','0','0','0'],
['0','0','0','0','1','1','0','1','1','1','0','0','0','0','0'],
['0','0','0','0','0','0','1','1','1','1','1','1','0','0','0']],
flower: [
['0','0','0','1','1','0','1','1','0','0','0','0','0','0','0'],
['0','0','0','1','0','0','0','1','1','1','1','1','0','0','0'],
['0','1','1','1','0','0','0','0','1','0','0','1','1','0','0'],
['1','1','0','0','1','1','1','0','0','0','0','0','1','0','0'],
['1','0','0','0','0','1','1','0','1','0','0','1','1','0','0'],
['1','1','1','0','1','0','0','0','0','1','1','1','0','0','0'],
['0','1','1','1','0','0','1','0','0','0','1','0','0','0','0'],
['0','0','1','0','0','1','1','1','0','0','1','0','0','0','0'],
['0','0','1','1','1','1','1','1','1','1','1','0','0','1','0'],
['1','1','0','0','1','1','0','1','1','0','0','0','0','0','1'],
['1','1','1','0','0','1','0','1','0','0','1','1','1','1','1'],
['1','0','1','0','0','1','1','1','0','1','1','1','1','1','1'],
['0','1','1','1','0','0','1','0','0','1','1','1','0','1','1'],
['0','0','1','1','1','1','1','0','1','1','1','0','1','1','0'],
['0','0','0','0','0','1','1','1','0','0','1','1','1','0','0']],
rat: [
['0','0','0','0','0','0','0','0','0','0','0','0','1','1','1'],
['0','0','0','0','0','1','1','1','1','0','0','1','1','0','1'],
['0','0','0','1','1','1','0','0','1','0','0','1','0','1','0'],
['1','1','1','0','1','0','0','1','1','0','0','1','0','0','0'],
['1','1','0','0','0','0','0','1','0','0','0','1','1','0','0'],
['0','1','1','1','1','0','0','1','1','0','0','0','1','1','0'],
['0','0','0','0','1','1','0','0','1','1','0','0','0','1','1'],
['0','0','0','0','0','1','0','0','0','1','1','1','0','0','1'],
['0','0','0','0','0','1','1','0','0','0','0','1','1','0','1'],
['0','0','0','1','1','1','1','0','0','0','0','0','1','1','1'],
['0','0','0','1','0','1','0','0','1','1','0','0','0','1','1'],
['0','0','0','0','0','1','0','0','1','0','0','0','0','1','0'],
['0','0','0','0','0','0','1','0','1','0','0','0','0','1','0'],
['0','0','0','0','0','1','1','1','1','1','0','0','1','1','0'],
['0','0','0','1','1','1','0','1','1','0','1','1','1','0','0']]
}

const levels = {
  'easy': easyPictures,
  'normal': normalPictures,
  'hard': hardPictures
};
const levelParams = {
  easy:   [5, 3, '10%'],
  normal: [10, 5, '5.33%'],
  hard:   [15, 5, '4%']
}

let patternIMG;
let resRow;
let resCol;
let flattenedMtrxCol;
let flattenedMtrxRow;
let clueRowMatrix;
let clueColMatrix;
let canvasIMG = [];

// Секундомер
let timerSec = 0;
let timerMin = 0;
let timerRes = '';
let timerAct = false;
let timerID;
let LVLX;
let IMGX;


const menuLevelList = document.querySelectorAll('.menu-level--list');
menuLevelList.forEach(el => el.addEventListener('click', showLvlList));
function showLvlList(e) {
  let levelList = levels[e.target.dataset.lvl] || [];
  menuListNode.innerHTML = "";
  for (let key in levelList) {
    if (levelList.hasOwnProperty(key)) {
      menuListNode.innerHTML += `<li class="list-item" data-level=${e.target.dataset.lvl} data-img=${key}>${key}</li>`;
      // console.log(`Ключ: ${key}, Значение: ${levelList[key]}`);
    }
  }
  document.querySelectorAll('.list-item').forEach(el => el.addEventListener('click', selectImage));
  menuNode.style.display = 'none';
  menuListNode.style.display = 'flex';
}

function selectImage(e) {
  LVLX = e.target.dataset.level;
  IMGX = e.target.dataset.img;
  
  mainNode.style.display = 'grid';
  headerNode.style.display = 'flex';
  menuListNode.style.display = 'none';
  mainNode.innerHTML = '';
  gameProgressStatus.winStatus = true;
  startGame(levelParams[LVLX], levels[LVLX][IMGX]);
  countClues(levelParams[LVLX][1]);
  statusGame(LVLX, IMGX);
  hangEvents(LVLX, IMGX);
}


const menuLVLRand = document.querySelector('.menu-level--rand');
menuLVLRand.addEventListener('click', randomGame);
function randomGame() {
  const lvlsKeys = Object.keys(levels);
  let LVLX = lvlsKeys[generateNumber(3)];
  const imgKeys = Object.keys(levels[LVLX]);
  let IMGX = imgKeys[generateNumber(5) * 1];
  
  // gameProgressStatus.level = LVLX;
  // gameProgressStatus.imgName = IMGX;
  mainNode.style.display = 'grid';
  headerNode.style.display = 'flex';
  menuListNode.style.display = 'none';
  menuNode.style.display = 'none';
  mainNode.innerHTML = '';
  gameProgressStatus.winStatus = true;
  startGame(levelParams[LVLX], levels[LVLX][IMGX]);
  countClues(levelParams[LVLX][1]);
  statusGame(LVLX, IMGX);
  hangEvents(LVLX, IMGX);
}
function generateNumber(x) {
  return Math.floor(Math.random() * x);
}


const menuLVLCont = document.querySelector('.menu-level--cont');
menuLVLCont.addEventListener('click', continueGame);
function continueGame() {
  mainNode.style.display = 'grid';
  headerNode.style.display = 'flex';
  menuNode.style.display = 'none';
  // menuListNode.style.display = 'none';
  mainNode.innerHTML = '';
  loadProgress();
  canvasIMG = gameProgressStatus.progress;
  patternIMG = gameProgressStatus.img;
  LVLX = gameProgressStatus.level;
  IMGX = gameProgressStatus.imgName;
  timerRes = `${((gameProgressStatus.min < 10 ? "0" : "") + gameProgressStatus.min + ":" + (gameProgressStatus.sec < 10 ? "0" : "") + gameProgressStatus.sec)}`;
  timerNode.innerHTML = timerRes;
  startGame(levelParams[LVLX], patternIMG);
  fillInProgress();
  countClues(levelParams[LVLX][1]);
  // countClues(gameProgressStatus.size);
  hangEvents(LVLX, IMGX);
}

//............................................................................................................
//............................................................................................................
//............................................................................................................


let cellNodes = document.querySelectorAll('.playground .cell');
function hangEvents(LVLX, IMGX) {
  cellNodes = document.querySelectorAll('.playground .cell');
  cellNodes.forEach(el => el.addEventListener('click', (e) => {
    e.target.classList.remove('cell--cross');
    e.target.classList.toggle('cell--black');
    statusGame(LVLX, IMGX);
    playEffect(e.target);
    checkWin();
  }));
  cellNodes.forEach(el => el.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Убрал контекстное меню
    e.target.classList.remove('cell--black');
    e.target.classList.toggle('cell--cross');
    statusGame(LVLX, IMGX);
    playEffect(e.target);
    checkWin();
  }));
}

function  checkWin() {
  const canvasIMGClean = canvasIMG.slice(0);  // копирую массив
  for (let i = 0; i < canvasIMGClean.length; i++) {
    if (canvasIMGClean[i] == 'X') canvasIMGClean[i] = '0';
  }
  
  if (canvasIMGClean.toString() === patternIMG.flat().toString()) {
    stopGame();
  }
}

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

function countClues(clueSize){
  resCol = countCells(patternIMG, false);
  resRow = countCells(patternIMG, true);
  resCol = addEmptyValues(resCol, clueSize);
  resRow = addEmptyValues(resRow, clueSize);
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

/////////////////////////////////////////////////////////////////////////////////////////
function generateGame(LevelParams) {
  let curLevelParams = LevelParams;
  generateMarkup('miniature', curLevelParams[0], curLevelParams[0], curLevelParams[0]);
  generateMarkup('clue-col', curLevelParams[0], curLevelParams[1], curLevelParams[0]);
  generateMarkup('clue-row', curLevelParams[0], curLevelParams[0], curLevelParams[1]);
  generateMarkup('playground', curLevelParams[0], curLevelParams[0], curLevelParams[0]);
}

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
  // console.log(timerID);
}

function stopTimer() {
  clearInterval(timerID);
}

function resetTimer() {
  clearInterval(timerID);
  timerSec = 0;
  timerMin = 0;
  timerNode.innerHTML = "00:00";
  timerAct = false;
  gameProgressStatus.winStatus = true;
  // saveProgress();
}


// document.querySelector('#menu-game').addEventListener('click', startGame);
function startGame(lvlParam, img) {
  generateGame(lvlParam);
  patternIMG = img;
}

function stopGame() {
  if (gameProgressStatus.winStatus == true) {
    stopTimer();
    document.querySelector('.js-win-sound').play();
    // alert(`УРА!!! Вы справились за ${timerRes}`);
    showWinMessage();
    let ttiimmee = `${((gameProgressStatus.min < 10 ? "0" : "") + gameProgressStatus.min + ":" + (gameProgressStatus.sec < 10 ? "0" : "") + gameProgressStatus.sec)}`;      ////////////////////////
    let gameStat = {
      time: ttiimmee,
      image: gameProgressStatus.imgName,
      difficulty: gameProgressStatus.size
    }
    gameProgressStatus.winStatus = false;
    saveScore(gameStat);
    clearProgress();
    saveProgress();
  }
}

function clearProgress(){
  gameProgressStatus.progress = [];
  gameProgressStatus.sec = '';
  gameProgressStatus.min = '';
  gameProgressStatus.img = '';
  gameProgressStatus.imgName = '';
  gameProgressStatus.size = '';
  gameProgressStatus.level = '';
}

// const btnMenu = document.querySelector('#menu-game');
const btnMenu = document.querySelector('#btn-menu');
btnMenu.addEventListener('click', function(){
  menuNode.style.display = 'flex';
  mainNode.style.display = 'none';
  headerNode.style.display = 'none';
  menuListNode.style.display = 'none';
  resetTimer();
})


document.querySelector('#restart-game').addEventListener('click', resetGame);
function resetGame() {
  cellNodes.forEach(el => {
    el.classList.remove('cell--cross');
    el.classList.remove('cell--black');
  });
  // gameProgressStatus.winStatus = true;
  // resetTimer();
  // startTimer();
  resetTimer();
}


document.querySelector('#solution-game').addEventListener('click', solutionGame);
function solutionGame() {
  let cls = document.querySelectorAll('.playground .cell');
  let clsCorrect = gameProgressStatus.img.flat();
  let cntcnt = 0;
  gameProgressStatus.winStatus = false;
  stopTimer();
  let domino = setInterval(() => {
    cls[cntcnt].classList.remove('cell--black');
    cls[cntcnt].classList.remove('cell--cross');
    if (clsCorrect[cntcnt] == '1') {
      cls[cntcnt].classList.add('cell--black');
    }
    cntcnt++;
    if (cntcnt >= clsCorrect.length) {
      clearInterval(domino);
    }
  }, 20);
}


document.querySelector('#save-game').addEventListener('click', savegameSAVE);
function savegameSAVE() {
  statusGame(LVLX, IMGX);
  saveProgress();
  console.log(gameProgressStatus);
}

function statusGame(LVLX, IMGX) {
  let cls = document.querySelectorAll('.playground .cell');
  for (let i = 0; i < cls.length; i++) {
    if (cls[i].classList.contains('cell--black')) {
      canvasIMG[i] = '1';
    } else if (cls[i].classList.contains('cell--cross')) {
      canvasIMG[i] = 'X';
    } else {
      canvasIMG[i] = '0';
    }
  }
  
  if (timerAct == false) {
    timerAct = true;
    startTimer();
  }

  gameProgressStatus.progress = canvasIMG;
  gameProgressStatus.level = LVLX;
  gameProgressStatus.sec = timerSec;
  gameProgressStatus.min = timerMin;
  gameProgressStatus.size = levelParams[LVLX][0];
  gameProgressStatus.img = levels[LVLX][IMGX];
  gameProgressStatus.imgName = IMGX;
  // saveProgress();
}


function fillInProgress() {
  timerSec = gameProgressStatus.sec;
  timerMin = gameProgressStatus.min;
  // timerNode.innerHTML = gameProgressStatus.timer;
  let cls = document.querySelectorAll('.playground .cell');
  for (let i = 0; i < gameProgressStatus.progress.length; i++) {
    if (gameProgressStatus.progress[i] == '1') {
      cls[i].classList.add('cell--black');
    } else if ((gameProgressStatus.progress[i] == 'X')) {
      cls[i].classList.add('cell--cross');
    }
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




// Система сохранений!!         ////////////////////////////////////////////////////////////////////////////////////
let gameProgressStatus = {};
let scoreArr = [];

function loadProgress() {
  if (localStorage.getItem('non-prog-GP')) {
    gameProgressStatus = JSON.parse(localStorage.getItem('non-prog-GP'));
  } else {
    gameProgressStatus = {
      sound: true,
      themeAlt: false,
      winStatus: true,
      img: '',
      imgName: '',
      size: '',
      level: '',
      min: '',
      sec: '',
      progress: []
    };
    localStorage.setItem('non-prog-GP', JSON.stringify(gameProgressStatus));
  }
} loadProgress();

function loadScore() {
  if (localStorage.getItem('non-score-GP')) {
    scoreArr = JSON.parse(localStorage.getItem('non-score-GP'));
  } else localStorage.setItem('non-score-GP', JSON.stringify(scoreArr));
} loadScore();

function saveProgress() {
  localStorage.setItem('non-prog-GP', JSON.stringify(gameProgressStatus));
}
function saveScore(newResult) {
  // console.log(convertTimeToNum(newResult.time), convertTimeToNum(scoreArr[scoreArr.length - 1].time));
  if (scoreArr.length < 5) {
    scoreArr.push(newResult);
  } else if (convertTimeToNum(newResult.time) < convertTimeToNum(scoreArr[scoreArr.length - 1].time)) {
    scoreArr.pop();
    scoreArr.push(newResult);
  }
  scoreArr = scoreArr.sort(function(a, b) {
    return convertTimeToNum(a.time) - convertTimeToNum(b.time); 
  });
  localStorage.setItem('non-score-GP', JSON.stringify(scoreArr));
}

function convertTimeToNum(str) {
  let newStr = str.replace(':', '');
  return parseInt(newStr, 10);
}



///////////////////////////////////////////////////////////////////////////////////
const btnSound = document.querySelector('#btn-sound');
btnSound.addEventListener('click', offSound);
function offSound(svp){
  const soundArr = document.querySelectorAll('.js-sound');
  if (gameProgressStatus.sound == false) {
    soundArr.forEach(element => element.volume = 0);
  } else soundArr.forEach(element => element.volume = 1);

  if (svp) {
    if (gameProgressStatus.sound == true) {
      soundArr.forEach(element => element.volume = 0);
      gameProgressStatus.sound = false;
    } else {
      soundArr.forEach(element => element.volume = 1);
      gameProgressStatus.sound = true;
    }
  }

  if (gameProgressStatus.sound == true) {
    btnSound.style.backgroundImage = 'url(img/sound-on.svg)';
  } else btnSound.style.backgroundImage = 'url(img/sound-off.svg)';
}


const btnTheme = document.querySelector('#btn-theme');
btnTheme.addEventListener('click', changeTheme);
function changeTheme(svp) {
  if (gameProgressStatus.themeAlt == false) {
    bodyNode.classList.remove('body--black');
    gameProgressStatus.themeAlt = false;
  } else {
    bodyNode.classList.add('body--black');
    gameProgressStatus.themeAlt = true;
  }

  if (svp) {
    if (gameProgressStatus.themeAlt == true) {
      bodyNode.classList.remove('body--black');
      gameProgressStatus.themeAlt = false;
    } else {
      bodyNode.classList.add('body--black');
      gameProgressStatus.themeAlt = true;
    }
  }
}


const modal = document.getElementById("myModal");
const closeModal = document.querySelector(".modal-close");
const btnScore = document.querySelector('#btn-score');
btnScore.addEventListener('click', showScore);
function showScore(){
  modal.style.display = "block";
  generateRecords();
}
closeModal.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function generateRecords() {
  let recStr = '';
  let counter = 1;
  for (let recordEl of scoreArr) {
    recStr += `
    <li class="record-item">
      <span>${counter}</span>
      <span>time: ${recordEl.time}</span>
      <span>size: ${recordEl.difficulty}x${recordEl.difficulty}</span>
      <span>image: ${recordEl.image}</span>
    </li>`;
    counter++;
  }
  document.getElementById('record-list').innerHTML = recStr;
}

// Функции которые вызываются при загрузке страницы.
offSound();
// changeTheme();
firstPic();

// window.addEventListener('unload', function () {
//   saveProgress();
// });

function firstPic() {
  LVLX = 'easy';
  IMGX = 'smile';
  
  mainNode.style.display = 'grid';
  headerNode.style.display = 'flex';
  menuListNode.style.display = 'none';
  menuNode.style.display = 'none';
  mainNode.innerHTML = '';
  gameProgressStatus.winStatus = true;
  startGame(levelParams[LVLX], levels[LVLX][IMGX]);
  countClues(levelParams[LVLX][1]);
  statusGame(LVLX, IMGX);
  hangEvents(LVLX, IMGX);
  resetTimer();
}

const winModal = document.getElementById("winModal");
// winModal.addEventListener('click', showScore);
function showWinMessage(){
  winModal.style.display = "block";
  document.querySelector('#modal-timer').innerHTML = timerRes;
}
const winCloseModal = document.querySelector(".win-modal-close");
winCloseModal.onclick = function() {
  winModal.style.display = "none";
}


// 835

