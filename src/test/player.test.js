import { Player } from '../modules/player.js';
import { Ship } from '../modules/ship.js';
import { Gameboard } from '../modules/gameboard.js';

test('create a human player', () => {
  let humanPlayer = Player('human');
  expect(humanPlayer.getType()).toEqual('human');
});

test('create a computer player', () => {
  let computerPlayer = Player('computer');
  expect(computerPlayer.getType()).toEqual('computer');
});

test('only human or computer player can be created', () => {
  let fooPlayer = Player('foo');
  expect(() => {
    fooPlayer.getType();
  }).toThrow('only human or computer player');
});

test('each player contains its own game', () => {
  let player1 = Player('human');
  let player2 = Player('computer');
  let board1 = player1.board;
  let board2 = player2.board;
  let ship = Ship(3);
  board1.placeShip(ship, 0, 0);
  expect(board2.at(0, 0)).toBeNull();
});
