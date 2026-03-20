import { Gameboard } from './gameboard.js';

export function Player(type, size = 10) {
  let board = Gameboard(size);
  function getType() {
    if (type === 'human') return 'human';
    else if (type === 'computer') return 'computer';
    else throw new Error('only human or computer player');
  }

  return { board, getType };
}
