let attemptsNumber = 0;
let failCounter = 0;
const mainHTML = document.querySelector('.main');
const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


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


function generateInput() {
  mainHTML.innerHTML = '<div id="termLine"></div>';
  mainHTML.innerHTML += '<div id="clueLine"></div>';
  mainHTML.innerHTML += '<div id="attemptsNumber">0</div><div id="failNumber">0</div>';
  mainHTML.innerHTML += '<input type="text" id="input">';
}



generateInput();
generateKeyboard();

const keyList = document.querySelectorAll('.key');
keyList.forEach(el => el.addEventListener('click', addText));



document.addEventListener('keydown', function(event) {
  console.log(event.key);
  checkChar((event.key).toUpperCase());
});

function addText(e) {
  checkChar(e.target.innerHTML);
  console.log(termCurrent);
}

function checkChar(char) {
  let attemptsNumberVar = document.getElementById('attemptsNumber');
  let attemptsNumberVarCopy = attemptsNumberVar.innerHTML;
  for (let i = 0; i < termAnswer.length; i++) {
    if (termAnswer[i] == char) {
      termCurrent[i] = char;
      attemptsNumberVar.innerHTML = ++attemptsNumber;
    }
  }
  document.getElementById("input").value = termCurrent;
  console.log(attemptsNumber, attemptsNumberVarCopy);
  if (attemptsNumber == attemptsNumberVarCopy) {
    document.getElementById('failNumber').innerHTML = ++failCounter;
  }
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




let mask = [];
let termAnswer = [];
let termCurrent = [];
function generateWord() {
  let word = wordList[Math.floor(Math.random() * wordList.length)];
  let term = word[0];
  let clue = word[1];
  console.log(term, clue);
  for (let index = 0; index < term.length; index++) {
    mask.push(false);
    termAnswer.push(term[index].toUpperCase());
    termCurrent.push('_');
    termLine.innerHTML += `<span class='term__letter'>${term[index]}<span>`;
  }
  clueLine.innerHTML = clue;
  console.log(mask, termAnswer, termCurrent);
}
generateWord();

function gameStatus() {
  const xxx = mark.every(user => {
    return user == true;
  });
  console.log(xxx);
}