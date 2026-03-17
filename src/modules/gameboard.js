import { Ship } from './ship.js';

export function Gameboard(size = 10) {
  // Initialize board with null cells
  let board = initializeBoard();

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
    if (ship.isHorizontal() === true) {
      // horizontal ship
      if (col + ship.length > 9) {
        throw new Error('out of board');
      }
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
      }
    } else {
      // vertical ship
      if (row + ship.length > 9) {
        throw new Error('out of board');
      }
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
      }
    }
  }
  return { at, placeShip };
}
