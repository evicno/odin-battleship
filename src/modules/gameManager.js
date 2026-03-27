import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';
import { Player } from './player.js';
import { domManager } from './domManager.js';

export const playGame = (() => {
  // create players and different settings
  const playerOne = Player('human');
  const playerTwo = Player('computer');
  let current = playerOne;
  let boardOne = playerOne.board;
  let boardTwo = playerTwo.board;
  let carrier = Ship(5);
  let battleship = Ship(4);
  let destroyer = Ship(3);
  let submarine = Ship(3);
  let patrolBoat = Ship(2);
  let shipsToPlace = [carrier, battleship, destroyer, submarine, patrolBoat];
  let shipIndex = 0;
  const size = boardOne.getSize();
  domManager.setGridSize(size);

  function resetSettings() {
    current = playerOne;
    carrier = Ship(5);
    battleship = Ship(4);
    destroyer = Ship(3);
    submarine = Ship(3);
    patrolBoat = Ship(2);
    shipsToPlace = [carrier, battleship, destroyer, submarine, patrolBoat];
    shipIndex = 0;
  }

  const getBoardOne = () => {
    return boardOne;
  };

  // Create grids
  domManager.initGrids();
  domManager.dropCallback(dropShip);
  domManager.setClickCallback(playSquare);
  setUpGame();

  // Set up the game
  function setUpGame() {
    domManager.activateRandomButton(randomBoard);
    domManager.activatePlaceButton(setBoardManually);
    domManager.activateStartButton(startGame);
    boardOne.clearBoard();
    boardTwo.clearBoard();
    setBoardRandomly(boardTwo);
  }

  // Create a random board
  function randomBoard() {
    resetSettings();
    boardOne.clearBoard();
    setBoardRandomly(boardOne);
  }

  // Set board randomly ready for game
  function setBoardRandomly(board) {
    board.clearBoard();
    for (let ship of shipsToPlace) {
      placeShipRandomly(board, ship);
    }
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

  // Set player's board with manual placement
  function setBoardManually() {
    resetSettings();
    boardOne.clearBoard();
    // setBoardRandomly(boardTwo);
    placeNextShip();
  }

  // Go through array of ships to place them one after another
  function placeNextShip() {
    if (shipIndex >= shipsToPlace.length) {
      domManager.makeGameReadyToStart();
    }
    let ship = shipsToPlace[shipIndex];
    placeShipManually(ship.length);
  }

  // Place a ship manually on player's board
  function placeShipManually(length) {
    domManager.renderShipToDrag(length);
  }

  // Place ship on the board after dropping
  function dropShip(length, row, col, direction) {
    let ship = Ship(length);
    if (direction != 'row') {
      ship.changeDirection();
    }
    try {
      boardOne.placeShip(ship, row, col);
      domManager.renderGridOne();
      shipIndex++;
      placeNextShip();
      return;
    } catch (e) {
      console.log(e.message);
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

  // Make data ready for a new game
  function restartGame() {
    resetSettings();
    setUpGame();
  }

  return { getBoardOne };
})();
