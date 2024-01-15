let attemptsNumber = 0;
let failCounter = 0;

const mainHTML = document.querySelector('.main');
const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';



function generateInput() {
  mainHTML.innerHTML += '<div id="termLine"></div>';
  mainHTML.innerHTML += '<div id="clueLine"></div>';
  mainHTML.innerHTML += '<div id="attemptsNumber">0</div>';
  mainHTML.innerHTML += '<div class="guesses">Incorrect guesses: <span id="failNumber">0</span> / <span>6</span></div>';
  // mainHTML.innerHTML += '<input type="text" id="input">';
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

generateInput();
generateKeyboard();


const keyList = document.querySelectorAll('.key');

keyList.forEach(el => el.addEventListener('click', function (e) {
  checkChar(e.target.innerHTML);
}));

document.addEventListener('keydown', function(event) {
  checkChar((event.key).toUpperCase());
});



function checkChar(char) {
  let flag = false;
  // let attemptsNumberVar = document.getElementById('attemptsNumber');
  // let attemptsNumberVarCopy = attemptsNumberVar.innerHTML;
  for (let i = 0; i < termAnswer.length; i++) {
    if (termAnswer[i] == char) {
      termCurrent[i] = char;
      mask[i] = true;
      // attemptsNumberVar.innerHTML = ++attemptsNumber;
      flag = true;
    }
  }
  
  if (flag == false) {
    document.getElementById('failNumber').innerHTML = ++failCounter;
  }

  // if (attemptsNumber == attemptsNumberVarCopy) {
  //   document.getElementById('failNumber').innerHTML = ++failCounter;
  // }
  blockingKey(char);
  updateWord();
  gameStatus();
  drawMan();
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
  termAnswer = [];
  termCurrent = [];
  term = word[0];
  let clue = word[1];
  console.log(term, clue);
  for (let index = 0; index < term.length; index++) {
    mask.push(false);
    termAnswer.push(term[index].toUpperCase());
    termCurrent.push('_');
    // termLine.innerHTML += `<span class='term__letter'>${term[index]}<span>`;
  }
  updateWord();
  clueLine.innerHTML = clue;
  console.log(mask, termAnswer, termCurrent);
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
  if (xxx == true) alert("Yes!!");
  if (failCounter >= 6 ) showModal();
}


const manHead = document.querySelector('.man-head');
const manBody = document.querySelector('.man-body');
const manArmLeft = document.querySelector('.man-arm-left');
const manArmRight = document.querySelector('.man-arm-right');
const manLegLeft = document.querySelector('.man-leg-left');
const manLegRight = document.querySelector('.man-leg-right');
const modalAnswer = document.querySelector('#modalAnswer');

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




let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
function showModal() {
  modal.style.display = "block";
  modalAnswer.innerHTML = term;
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
modalBtn.onclick = function() {
  modal.style.display = "none";
  failCounter = 0;
  generateWord();
  clear();
}

function clear() {
  const showEl = document.querySelectorAll('.show');
  showEl.forEach(element => {
    element.classList.remove('show');
  });
}