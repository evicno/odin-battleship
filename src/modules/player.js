import { Gameboard } from './gameboard';

export function Player(type) {
  let board = Gameboard();
  function getType() {
    if (type === 'human') return 'human';
    else if (type === 'computer') return 'computer';
    else throw new Error('only human or computer player');
  }

  return { board, getType };
}
