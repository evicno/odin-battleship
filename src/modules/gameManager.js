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
  let shipOne = Ship(3);
  let shipTwo = Ship(4);
  let shipThree = Ship(3);
  let shipFour = Ship(4);
  shipTwo.changeDirection();
  shipThree.changeDirection();
  boardOne.placeShip(shipOne, 1, 1);
  boardOne.placeShip(shipTwo, 4, 5);
  boardTwo.placeShip(shipThree, 2, 0);
  boardTwo.placeShip(shipFour, 6, 3);

  // Display player board with ships, computer board blank
  domManager.renderPlayerOneBoard(boardOne);

  // Create event listeners
  domManager.createEventListeners(playSquare);
  let current = playerOne;

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

  //
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
