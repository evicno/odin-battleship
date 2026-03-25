import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';
import { Player } from './player.js';
import { domManager } from './domManager.js';

export const playGame = (() => {
  // create players
  const playerOne = Player('human');
  const playerTwo = Player('computer');
  let current = playerOne;
  let boardOne = playerOne.board;
  let boardTwo = playerTwo.board;
  const size = boardOne.getSize();
  domManager.setGridSize(size);

  const getBoardOne = () => {
    return boardOne;
  };

  // Create grids
  domManager.initGrids();
  domManager.setClickCallback(playSquare);
  setUpGame();

  // Set up the game
  function setUpGame() {
    domManager.activateRandomButton(randomBoard);
    domManager.activatePlaceButton();
    domManager.activateStartButton(startGame);
    setBoard(boardTwo);
    current = playerOne;
  }

  // Create a random board
  function randomBoard() {
    setBoard(boardOne);
  }

  // Set board ready for game
  function setBoard(board) {
    board.clearBoard();
    let carrier = Ship(5);
    let battleship = Ship(4);
    let destroyer = Ship(3);
    let submarine = Ship(3);
    let patrolBoat = Ship(2);
    placeShipRandomly(board, carrier);
    placeShipRandomly(board, battleship);
    placeShipRandomly(board, destroyer);
    placeShipRandomly(board, submarine);
    placeShipRandomly(board, patrolBoat);
  }

  // Place a ship randomly on a board
  function placeShipRandomly(board, ship) {
    let direction = Math.floor(Math.random() * 2);
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    if (direction === 1) {
      ship.changeDirection();
    }
    try {
      board.placeShip(ship, row, col);
      return;
    } catch {
      placeShipRandomly(board, ship);
    }
  }

  // Start game
  function startGame() {
    domManager.activateRestartButton(restartGame);
  }

  // Play a round by clicking on a square
  function playSquare(row, col) {
    if (current === playerTwo) {
      return;
    } else {
      let result = boardTwo.receiveAttack(row, col);
      if (result) {
        domManager.changeSquareDisplay('two', row, col, result);
        current = playerTwo;
        if (boardTwo.isGameOver() === true) {
          domManager.showResult('You win!');
          restartGame();
          return;
        } else {
          setTimeout(() => {
            computerRound();
          }, 500);
        }
      }
    }
  }

  // Round play randomly by the computer
  function computerRound() {
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    let result = boardOne.receiveAttack(row, col);
    if (!result) {
      computerRound();
    } else {
      domManager.changeSquareDisplay('one', row, col, result);
      current = playerOne;
      if (boardOne.isGameOver() === true) {
        domManager.showResult('You lose!');
        restartGame();
        return;
      }
    }
  }

  function restartGame() {
    setUpGame();
  }

  return { getBoardOne };
})();
