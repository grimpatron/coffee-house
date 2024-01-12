const mainHTML = document.querySelector('.main');
const keyList = document.querySelectorAll('.key');

function generateKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < keys.length; i++) {
    const key = document.createElement('div');
    key.classList.add('key');
    key.textContent = keys[i];
    keyboard.appendChild(key);
  }
  mainHTML.appendChild(keyboard);
}

function generateInput() {
  mainHTML.innerHTML = '<input type="text" id="input">';
}

keyList.forEach(el => el.addEventListener('click', addText));

function addText(e) {
  document.getElementById("input").value += e.target.innerHTML;
}


generateInput();
generateKeyboard();