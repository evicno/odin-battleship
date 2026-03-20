import { Gameboard } from '../modules/gameboard.js';
import { Ship } from '../modules/ship.js';

let gameboard;

beforeEach(() => {
  gameboard = Gameboard();
});

// at
test('at on an empty gameboard', () => {
  expect(gameboard.at(0, 0)).toBeNull();
});

test('at returns undefined if out of board 1', () => {
  expect(gameboard.at(10, 0)).toBeUndefined();
});

test('at returns undefined if out of board 2', () => {
  let gameboard2 = Gameboard(6);
  expect(gameboard2.at(6, 0)).toBeUndefined();
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

// placeShip
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

test('place ship out of board 5', () => {
  gameboard = Gameboard(6);
  let ship = Ship(3);
  ship.changeDirection();
  expect(() => {
    gameboard.placeShip(ship, 4, 0);
  }).toThrow('out of board');
});

test('cannot place a ship on another ship 1', () => {
  let ship1 = Ship(3);
  let ship2 = Ship(3);
  gameboard.placeShip(ship1, 0, 0);
  expect(() => {
    gameboard.placeShip(ship2, 0, 2);
  }).toThrow('already a ship here');
});

test('cannot place a ship on another ship 2', () => {
  let ship1 = Ship(3);
  let ship2 = Ship(3);
  ship2.changeDirection();
  gameboard.placeShip(ship1, 2, 0);
  expect(() => {
    gameboard.placeShip(ship2, 0, 0);
  }).toThrow('already a ship here');
});

// receiveAttack
test('receiveAttack out of board 1', () => {
  expect(() => {
    gameboard.receiveAttack(0, 10);
  }).toThrow('attack out of board');
});

test('receiveAttack out of board 2', () => {
  expect(() => {
    gameboard.receiveAttack(-1, 0);
  }).toThrow('attack out of board');
});

test('receiveAttack out of board 3', () => {
  gameboard = Gameboard(6);
  expect(() => {
    gameboard.receiveAttack(6, 0);
  }).toThrow('attack out of board');
});

test('receiveAttack sends hit() to the correct ship', () => {
  let ship = Ship(3);
  gameboard.placeShip(ship, 0, 0);
  gameboard.receiveAttack(0, 0);
  expect(ship.getHits()).toEqual(1);
});

test('receiveAttack cannot send hit twice for one square', () => {
  let ship = Ship(3);
  gameboard.placeShip(ship, 0, 0);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 0);
  expect(ship.getHits()).toEqual(1);
});

test('receiveAttack records a missed shot', () => {
  gameboard.receiveAttack(0, 0);
  expect(gameboard.at(0, 0)).toEqual('miss');
});

test('receiveAttack does nothing if hits a already missed square', () => {
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 0);
  expect(gameboard.at(0, 0)).toEqual('miss');
});

// end of game
test('can detect when all ships have been sunk', () => {
  let ship = Ship(3);
  gameboard.placeShip(ship, 0, 0);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  expect(gameboard.isGameOver()).toBeTruthy();
});
