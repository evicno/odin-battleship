import { Gameboard } from './gameboard.js';
import { playGame } from './gameManager.js';

export const domManager = (() => {
  let gridSize = 0;
  const gridOne = document.querySelector('#grid-one');
  const gridTwo = document.querySelector('#grid-two');
  const randomButton = document.querySelector('#random');
  const placeButton = document.querySelector('#place');
  const startButton = document.querySelector('.start button');

  const setGridSize = (size) => {
    gridSize = size;
  };

  const boardOne = () => {
    return playGame.getBoardOne();
  };

  function initGrids() {
    createGrid(gridOne);
    createGrid(gridTwo);
    gridTwo.dataset.active = 'false';
  }

  // Create the DOM structure of a blank board
  function createGrid(board) {
    for (let i = 0; i < gridSize; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < gridSize; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.row = i;
        square.dataset.col = j;
        row.appendChild(square);
      }
      board.appendChild(row);
    }
  }

  // Clear grid one
  function clearGridOne() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const square = document.querySelector(
          `#grid-one [data-row="${i}"][data-col="${j}"]`,
        );
        square.style.backgroundColor = 'white';
      }
    }
  }

  // Display board of human player (left side of the screen = boardOne)
  function renderGridOne() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const content = boardOne().at(i, j);
        const square = document.querySelector(
          `#grid-one [data-row="${i}"][data-col="${j}"]`,
        );
        if (content === null || content === undefined) {
          square.style.backgroundColor = 'white';
        } else {
          // it's a ship
          square.style.backgroundColor = 'rgb(54, 6, 77)';
        }
      }
    }
  }

  function createBoardListeners(callback) {
    const squares = document.querySelectorAll('#grid-two .square');
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        callback(square.dataset.row, square.dataset.col);
      });
    });
  }

  function activateRandomButton(callback) {
    randomButton.addEventListener('click', () => {
      callback();
      clearGridOne();
      renderGridOne();
      startButton.disabled = false;
    });
  }

  function activateStartButton(callback) {
    startButton.addEventListener('click', () => {
      randomButton.disabled = true;
      placeButton.disabled = true;
      startButton.disabled = true;
      gridTwo.dataset.active = 'true';
      callback();
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
      square.style.backgroundColor = 'rgb(118, 210, 219)';
    } else {
      // result === 'hit'
      square.style.backgroundColor = 'rgb(218, 72, 72)';
    }
  }

  return {
    setGridSize,
    initGrids,
    createGrid,
    clearGridOne,
    renderGridOne,
    activateRandomButton,
    activateStartButton,
    createBoardListeners,
    changeSquareDisplay,
  };
})();
