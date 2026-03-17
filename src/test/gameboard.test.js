import { Gameboard } from '../modules/gameboard.js';
import { Ship } from '../modules/ship.js';

let gameboard;

beforeEach(() => {
  gameboard = Gameboard();
});

test('at on an empty gameboard', () => {
  expect(gameboard.at(0, 0)).toBeNull();
});

test('at detects ship', () => {
  let ship = Ship(3);
  gameboard.placeShip(ship, 1, 0);
  expect(gameboard.at(1, 0)).toEqual(ship);
});

test('at detects horizontal ship', () => {
  let ship = Ship(3);
  gameboard.placeShip(ship, 1, 0);
  expect(gameboard.at(1, 1)).toEqual(ship);
});

test('at detects horizontal ship end', () => {
  let ship = Ship(3);
  gameboard.placeShip(ship, 1, 0);
  expect(gameboard.at(1, 3)).toBeNull();
});

test('at detects vertical ship', () => {
  let ship = Ship(3);
  ship.changeDirection();
  gameboard.placeShip(ship, 1, 0);
  expect(gameboard.at(2, 0)).toEqual(ship);
});

test('at detects vertical ship end', () => {
  let ship = Ship(3);
  ship.changeDirection();
  gameboard.placeShip(ship, 1, 0);
  expect(gameboard.at(4, 0)).toBeNull();
});

test('place ship out of board 1', () => {
  let ship = Ship(3);
  expect(() => {
    gameboard.placeShip(ship, 0, 10);
  }).toThrow('out of board');
});

test('place ship out of board 2', () => {
  let ship = Ship(3);
  expect(() => {
    gameboard.placeShip(ship, -1, 8);
  }).toThrow('out of board');
});

test('place ship out of board 3', () => {
  let ship = Ship(3);
  expect(() => {
    gameboard.placeShip(ship, 0, 9);
  }).toThrow('out of board');
});

test('place ship out of board 4', () => {
  let ship = Ship(3);
  ship.changeDirection();
  expect(() => {
    gameboard.placeShip(ship, 8, 0);
  }).toThrow('out of board');
});
