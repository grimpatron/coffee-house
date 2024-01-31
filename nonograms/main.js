const cells = document.querySelectorAll('.cell');

cells.forEach(el => el.addEventListener('click', (e) => {
  e.target.classList.toggle('cell--black');
}));


const smile = [
  ['1', '1', '0', '1', '1'], 
  ['1', '1', '0', '1', '1'], 
  ['0', '0', '0', '0', '0'], 
  ['1', '0', '0', '0', '1'], 
  ['0', '1', '1', '1', '0']
]
const time = [
  ['1', '1', '1', '1', '1'], 
  ['0', '1', '1', '1', '0'], 
  ['0', '0', '1', '0', '0'], 
  ['0', '1', '0', '1', '0'], 
  ['1', '1', '1', '1', '1']
]
const heart = [
  ['0', '1', '0', '1', '0'], 
  ['1', '0', '1', '0', '1'], 
  ['1', '0', '0', '0', '1'], 
  ['0', '1', '0', '1', '0'], 
  ['0', '0', '1', '0', '0']
]
const zaiac = [
  ['0', '1', '1', '0', '0'], 
  ['0', '0', '0', '1', '1'], 
  ['0', '1', '1', '1', '1'], 
  ['1', '1', '1', '1', '0'], 
  ['0', '1', '1', '1', '1']
]
const fontan = [
  ['0', '1', '0', '1', '0'], 
  ['1', '0', '1', '0', '1'], 
  ['0', '0', '1', '0', '0'], 
  ['1', '1', '1', '1', '1'], 
  ['0', '1', '1', '1', '0']
]
let rndArt = zaiac;


function countRowCells(matrixXXX) {
  let colCounts = matrixXXX[0].map((col, i) => {
    let counts = [];
    let count = 0;
    for (let row of matrixXXX) {
      if (row[i] === '1') {
        count++;
      } else if (count > 0) {
        counts.push(count);
        count = 0;
      }
    }
    if (count > 0) counts.push(count);
    return counts;
  });

  return colCounts;
}
let resCol = countRowCells(rndArt);



function countColCells(matrixXXX) {
  let rowCounts = matrixXXX.map(row => {
    let counts = [];
    let count = 0;
    for (let cell of row) {
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

  return rowCounts;
}
let resRow = countColCells(rndArt);



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




const container = document.querySelector('.container');
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
    container.appendChild(wrap);
    return;
  }
  
  container.appendChild(block);
}

generateMarkup('miniature', 5, 5);
generateMarkup('clue-col', 3, 5);
generateMarkup('clue-row', 5, 3);
generateMarkup('playground', 5, 5);