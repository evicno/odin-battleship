import { Ship } from '../modules/ship.js';

test('create a new ship', () => {
  let ship = Ship(3);
  expect(ship.length).toEqual(3);
});

test('create a new ship bis', () => {
  let ship = Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test('hits a new ship', () => {
  let ship = Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('hits a ship and sink it', () => {
  let ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('hits a ship, sink it and hits again', () => {
  let ship = Ship(2);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('new ship is horizontal', () => {
  let ship = Ship(3);
  expect(ship.isHorizontal()).toBe(true);
});

test('new ship is not horizontal after changing direction', () => {
  let ship = Ship(3);
  ship.changeDirection();
  expect(ship.isHorizontal()).toBe(false);
});

test('new ship is horizontal after changing direction twice', () => {
  let ship = Ship(3);
  ship.changeDirection();
  ship.changeDirection();
  expect(ship.isHorizontal()).toBe(true);
});
