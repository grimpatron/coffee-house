let attemptsNumber = 0;
let failCounter = 0;

const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const hmArr = ['hm-1', 'hm-2', 'hm-3', 'hm-4', 'hm-5', 'hm-6', 'man-head', 'man-body', 'man-arm-l', 'man-arm-r', 'man-leg-l', 'man-leg-r']
let thisWord = '';
let pressedKeys = [];

/* Generate HTML */
const bodyHTML = document.querySelector('body');
bodyHTML.innerHTML = `<div class="container"><div class="main"></div></div>`;
const mainHTML = document.querySelector('.main');
generateHangman();
function generateInput() {
  mainHTML.innerHTML += '<div id="termLine"></div><div id="clueLine"></div>';
  mainHTML.innerHTML += '<div class="guesses">Incorrect guesses: <span id="failNumber">0</span> / <span>6</span></div>';
  mainHTML.innerHTML += `
  <div id="myModal" class="modal">
    <div class="modal-content">
      <div id="modalMessage"></div>
      <div>Correct answer: <span id="modalAnswer"></span></div>
      <button id="modalBtn">Once again</button>
    </div>
  </div>`
}
generateInput();
generateKeyboard();



function generateHangman() {
  const hangman = document.createElement('div');
  hangman.classList.add('hangman');

  for (let i = 0; i < 13; i++) {
    const key = document.createElement('div');
    key.classList.add('hm');
    key.classList.add(hmArr[i]);
    hangman.appendChild(key);
  }
  mainHTML.appendChild(hangman);
}

function generateKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  
  for (let i = 0; i < keys.length; i++) {
    const key = document.createElement('div');
    key.classList.add('key');
    key.textContent = keys[i];
    keyboard.appendChild(key);
  }
  mainHTML.appendChild(keyboard);
}



const keyList = document.querySelectorAll('.key');

keyList.forEach(el => el.addEventListener('click', function (e) {
  checkChar(e.target.innerHTML);
}));

document.addEventListener('keydown', function(event) {
  if (keys.includes((event.key).toUpperCase())) {
    checkChar((event.key).toUpperCase());
  }
});



function checkChar(char) {
  console.log(pressedKeys, char);
  if(pressedKeys.includes(char) == false) {
    pressedKeys.push(char);
    let flag = false;
    for (let i = 0; i < termAnswer.length; i++) {
      if (termAnswer[i] == char) {
        termCurrent[i] = char;
        mask[i] = true;
        flag = true;
      }
    }
    
    if (flag == false) {
      document.getElementById('failNumber').innerHTML = ++failCounter;
    }

    blockingKey(char);
    updateWord();
    gameStatus();
    drawMan();
  }
}


function blockingKey(char) {
  keyList.forEach(el => {
    if (el.innerText == char) {
      el.classList.add('contain');
    }
  });
}



const wordList = [
  ['Boolean', 'A data type that can have one of two values, typically `true` or `false`.'],
  ['Compiler', 'A program that translates source code into machine code.'],
  ['Debugging', 'The process of finding and fixing errors in a program.'],
  ['Encryption', 'The process of converting data into a secret code to protect it from unauthorized access.'],
  ['Function', 'A block of code that performs a specific task and can be called from other parts of a program.'],
  ['Object', 'An instance of a class in object-oriented programming that contains data and methods.'],
  ['Pointer', 'A variable that stores the memory address of another variable.'],
  ['Recursion', 'A programming technique in which a function calls itself.'],
  ['Syntax', 'The set of rules that define the structure of a programming language.'],
  ['Variable', 'A named storage location in a program that holds a value.'],
]



let term = '';
let mask = [];
let termAnswer = [];
let termCurrent = [];
function generateWord() {
  let word = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(thisWord, word[0]);
  if (thisWord == word[0]) {
    generateWord();
  } 
  mask = [];
  termAnswer = [];
  termCurrent = [];
  term = word[0];
  for (let index = 0; index < term.length; index++) {
    mask.push(false);
    termAnswer.push(term[index].toUpperCase());
    termCurrent.push('_');
  }
  thisWord = word[0];
  updateWord();
  clueLine.innerHTML = word[1];
  // console.log(mask, termAnswer, termCurrent);
}
generateWord();

function updateWord() {
  termLine.innerHTML = '';
  for (let index = 0; index < termCurrent.length; index++) {
    termLine.innerHTML += `<span class='term__letter'>${termCurrent[index]}<span>`;
  }
}



function gameStatus() {
  const xxx = mask.every(user => user == true);
  if (xxx == true) showModal(true);
  if (failCounter >= 6 ) showModal(false);
}


const manHead = document.querySelector('.man-head');
const manBody = document.querySelector('.man-body');
const manArmLeft = document.querySelector('.man-arm-l');
const manArmRight = document.querySelector('.man-arm-r');
const manLegLeft = document.querySelector('.man-leg-l');
const manLegRight = document.querySelector('.man-leg-r');

function drawMan(){
  switch (failCounter) {
    case 1: manHead.classList.add('show');      break;
    case 2: manBody.classList.add('show');      break;
    case 3: manArmLeft.classList.add('show');   break;
    case 4: manArmRight.classList.add('show');  break;
    case 5: manLegLeft.classList.add('show');   break;
    case 6: manLegRight.classList.add('show');  break;
    default:    break;
  }
} 




const messageArr = ["Well done! You were able to guess the word!", "You couldn't guess the word!"];
const modalAnswer = document.querySelector('#modalAnswer');
const modalMessage = document.querySelector('#modalMessage');
const modal = document.getElementById("myModal");
function showModal(status) {
  modal.style.display = "block";
  modalAnswer.innerHTML = term;
  if (status == true) modalMessage.innerHTML = messageArr[0];
  if (status == false) modalMessage.innerHTML = messageArr[1];
}
modalBtn.onclick = function() {
  modal.style.display = "none";
  generateWord();
  clear();
}

function clear() {
  const showEl = document.querySelectorAll('.show');
  const keyContain = document.querySelectorAll('.contain');
  showEl.forEach(element => {
    element.classList.remove('show');
  });
  keyContain.forEach(element => {
    element.classList.remove('contain');
  });
  pressedKeys = [];
  failCounter = 0;
  document.getElementById('failNumber').innerHTML = 0;
}
