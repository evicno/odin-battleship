import { Gameboard } from './gameboard.js';
import { playGame } from './gameManager.js';

export const domManager = (() => {
  let gridSize = 0;
  let onSquareClick = null;
  let gameStarted = false;
  const gridOne = document.querySelector('#grid-one');
  const gridTwo = document.querySelector('#grid-two');
  const randomButton = document.querySelector('#random');
  const placeButton = document.querySelector('#place');
  const startButton = document.querySelector('.start button');
  const restartButton = document.querySelector('#restart');

  const setGridSize = (size) => {
    gridSize = size;
  };

  const boardOne = () => {
    return playGame.getBoardOne();
  };

  function initGrids() {
    createGrid(gridOne);
    createGrid(gridTwo);
    createBoardListeners();
    gridTwo.dataset.active = 'false';
    restartButton.style.visibility = 'hidden';
  }

  // Create event listeners for grid-two
  function createBoardListeners() {
    gridTwo.addEventListener('click', (event) => {
      if (event.target.classList.contains('square') && gameStarted === true) {
        onSquareClick(event.target.dataset.row, event.target.dataset.col);
      }
    });
  }

  // Callback function for grid-two event listeners
  function setClickCallback(fn) {
    onSquareClick = fn;
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

  // Clear grid
  function clearGrid(grid) {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const square = document.querySelector(
          `#${grid} [data-row="${i}"][data-col="${j}"]`,
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

  function activateRandomButton(callback) {
    randomButton.addEventListener('click', () => {
      callback();
      clearGrid('grid-one');
      renderGridOne();
      startButton.disabled = false;
    });
  }

  function activateStartButton(callback) {
    startButton.addEventListener('click', () => {
      gameStarted = true;
      randomButton.disabled = true;
      placeButton.disabled = true;
      startButton.disabled = true;
      gridTwo.dataset.active = 'true';
      restartButton.style.visibility = 'visible';
      callback();
    });
  }

  function activateRestartButton(callback) {
    restartButton.addEventListener('click', () => {
      restartGame();
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

  function restartGame() {
    gameStarted = false;
    restartButton.style.visibility = 'hidden';
    randomButton.disabled = false;
    placeButton.disabled = false;
    clearGrid('grid-one');
    clearGrid('grid-two');
    gridTwo.dataset.active = 'false';
  }

  function showResult(text) {
    const dialog = document.querySelector('dialog');
    const result = document.querySelector('dialog p');
    const closeDialog = document.querySelector('dialog button');
    gameStarted = false;
    result.textContent = text;
    dialog.showModal();
    closeDialog.addEventListener('click', () => {
      dialog.close();
      restartGame();
    });
  }

  return {
    setGridSize,
    initGrids,
    createGrid,
    setClickCallback,
    activateRandomButton,
    activateStartButton,
    activateRestartButton,
    createBoardListeners,
    changeSquareDisplay,
    showResult,
  };
})();
