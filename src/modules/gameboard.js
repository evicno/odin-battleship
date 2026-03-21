import { Ship } from './ship.js';

export function Gameboard(size = 10) {
  // Initialize board with null cells
  let board = initializeBoard();
  let shipsOnBoard = [];
  let gameOver = false;

  function initializeBoard() {
    let board = [];
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = null;
      }
    }
    return board;
  }

  function at(row, col) {
    if (isOutOfBoard(row, col)) {
      return undefined;
    } else return board[row][col];
  }

  function placeShip(ship, row, col) {
    if (isOutOfBoard(row, col)) {
      throw new Error('out of board');
    }
    let newShip = [];
    if (ship.isHorizontal() === true) {
      // horizontal ship
      if (col + ship.length > size - 1) {
        throw new Error('out of board');
      }
      for (let i = 0; i < ship.length; i++) {
        if (isABoat(row, col + i)) {
          throw new Error('too close or already a ship here');
        } else if (
          isABoat(row - 1, col + i - 1) ||
          isABoat(row - 1, col + i) ||
          isABoat(row - 1, col + i + 1) ||
          isABoat(row, col + i - 1) ||
          isABoat(row, col + i + 1) ||
          isABoat(row + 1, col + i - 1) ||
          isABoat(row + 1, col + i) ||
          isABoat(row + 1, col + i + 1)
        ) {
          throw new Error('too close or already a ship here');
        } else continue;
      }
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
        newShip.push(row.toString() + ',' + (col + i).toString());
      }
    } else {
      // vertical ship
      if (row + ship.length > size - 1) {
        throw new Error('out of board');
      }
      for (let i = 0; i < ship.length; i++) {
        if (isABoat(row + i, col)) {
          throw new Error('too close or already a ship here');
        } else if (
          isABoat(row + i - 1, col - 1) ||
          isABoat(row + i - 1, col) ||
          isABoat(row + i - 1, col + 1) ||
          isABoat(row + i, col - 1) ||
          isABoat(row + i, col + 1) ||
          isABoat(row + i + 1, col - 1) ||
          isABoat(row + i + 1, col) ||
          isABoat(row + i + 1, col + 1)
        ) {
          throw new Error('too close or already a ship here');
        } else continue;
      }
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
        newShip.push((row + i).toString() + ',' + col.toString());
      }
    }
    shipsOnBoard.push(newShip);
    return true;
  }

  function receiveAttack(row, col) {
    if (isOutOfBoard(row, col)) {
      throw new Error('attack out of board');
    }
    if (board[row][col] === null) {
      board[row][col] = 'miss';
      return 'miss';
    } else if (board[row][col] === 'miss') {
      return;
    } else {
      if (recordHit(row, col) === true) {
        let shipHit = board[row][col];
        shipHit.hit();
        return 'hit';
      } else return;
    }
  }

  // Make sure the square hasn't been hit yet, then removes it from shipsOnBoard
  function recordHit(row, col) {
    let target = row.toString() + ',' + col.toString();
    for (let ship of shipsOnBoard) {
      if (ship.includes(target)) {
        let index = ship.indexOf(target);
        ship.splice(index, 1);
        // Removes empty ship from shipsOnBoard
        if (ship.length === 0) {
          let index = shipsOnBoard.indexOf(ship);
          shipsOnBoard.splice(index, 1);
        }
        // Checks if game is over (no more ships)
        if (shipsOnBoard.length === 0) {
          gameOver = true;
        }
        return true;
      }
    }
    return false;
  }

  function isGameOver() {
    return gameOver;
  }

  function getSize() {
    return size;
  }

  function isOutOfBoard(row, col) {
    if (row < 0 || row > size - 1 || col < 0 || col > size - 1) {
      return true;
    }
  }

  function isABoat(row, col) {
    if (isOutOfBoard(row, col) || board[row][col] === null) {
      return false;
    } else return true;
  }

  return { at, placeShip, receiveAttack, isGameOver, getSize };
}
