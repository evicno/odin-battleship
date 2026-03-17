// import './styles/reset.css';
// import './styles/main.css';

import { Ship } from './modules/ship.js';
import { Gameboard } from './modules/gameboard.js';

let board = Gameboard();
let ship = Ship(3);
board.placeShip(ship, 0, 10);
console.log(board.at(0, 0));
