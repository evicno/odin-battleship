import { Gameboard } from './gameboard.js';

export const domManager = (() => {
  // Create the DOM structure of a blank board
  function createGrid(board, size) {
    const main = document.querySelector('.main');
    for (let i = 0; i < size; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < size; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.row = i;
        square.dataset.col = j;
        row.appendChild(square);
      }
      board.appendChild(row);
    }
    main.appendChild(board);
  }

  // Display board of human player (left side of the screen = boardOne)
  function renderPlayerOneBoard(board) {
    let size = board.getSize();
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const content = board.at(i, j);
        const square = document.querySelector(
          `#grid-one [data-row="${i}"][data-col="${j}"]`,
        );
        if (content === null || content === undefined) {
          square.style.backgroundColor = 'white';
        } else if (content === 'miss') {
          square.textContent = 'X';
        } else {
          // it's a ship
          square.style.backgroundColor = 'grey';
        }
      }
    }
  }
  // export function updateSquare(board, row, col)

  function createEventListeners(callback) {
    const squares = document.querySelectorAll('#grid-two .square');
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        callback(square.dataset.row, square.dataset.col);
      });
    });
  }

  function changeSquareDisplay(grid, row, col, result) {
    let square;
    if (grid === 'two') {
      square = document.querySelector(
        `#grid-two [data-row="${row}"][data-col="${col}"]`,
      );
    } else {
      square = document.querySelector(
        `#grid-one [data-row="${row}"][data-col="${col}"]`,
      );
    }
    if (result === 'miss') {
      square.style.backgroundColor = 'blue';
    } else {
      // result === 'hit'
      square.style.backgroundColor = 'pink';
    }
  }

  return {
    createGrid,
    renderPlayerOneBoard,
    createEventListeners,
    changeSquareDisplay,
  };
})();
