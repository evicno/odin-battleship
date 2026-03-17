// import './styles/reset.css';
// import './styles/main.css';

import { Ship } from './modules/ship.js';
import { Gameboard } from './modules/gameboard.js';

let board = Gameboard();
let ship = Ship(3);
board.placeShip(ship, 0, 0);
board.receiveAttack(0, 0);
board.receiveAttack(0, 1);
board.receiveAttack(0, 2);
