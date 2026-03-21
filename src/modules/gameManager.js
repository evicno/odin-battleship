import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';
import { Player } from './player.js';
import { domManager } from './domManager.js';

export const playGame = () => {
  // create players
  const playerOne = Player('human');
  const playerTwo = Player('computer');
  let boardOne = playerOne.board;
  let boardTwo = playerTwo.board;
  const size = boardOne.getSize();

  // Create grids
  const gridOne = document.querySelector('#grid-one');
  const gridTwo = document.querySelector('#grid-two');
  domManager.createGrid(gridOne, size);
  domManager.createGrid(gridTwo, size);

  // Place ships
  setBoard(boardOne);
  setBoard(boardTwo);

  // Display player board with ships, computer board blank
  domManager.renderPlayerOneBoard(boardOne);

  // Create event listeners
  domManager.createEventListeners(playSquare);
  let current = playerOne;

  // Set board ready for game
  function setBoard(board) {
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
          console.log('you win!');
          return;
        } else computerRound();
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
        console.log('you lose!');
        return;
      }
    }
  }
};
