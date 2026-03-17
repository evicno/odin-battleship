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
    return board[row][col];
  }

  function placeShip(ship, row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error('out of board');
    }
    let newShip = [];
    if (ship.isHorizontal() === true) {
      // horizontal ship
      if (col + ship.length > 9) {
        throw new Error('out of board');
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[row][col + i] != null && board[row][col + i] != 'miss') {
          throw new Error('already a ship here');
        } else continue;
      }
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
        newShip.push(row.toString() + ',' + (col + i).toString());
      }
    } else {
      // vertical ship
      if (row + ship.length > 9) {
        throw new Error('out of board');
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][col] != null && board[row + i][col] != 'miss') {
          throw new Error('already a ship here');
        } else continue;
      }
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
        newShip.push((row + i).toString() + ',' + col.toString());
      }
    }
    shipsOnBoard.push(newShip);
  }

  function receiveAttack(row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error('attack out of board');
    }
    if (board[row][col] === null || board[row][col] === 'miss') {
      board[row][col] = 'miss';
    } else {
      if (recordHit(row, col) === true) {
        let shipHit = board[row][col];
        shipHit.hit();
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

  return { at, placeShip, receiveAttack, isGameOver };
}
