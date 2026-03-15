// import './styles/reset.css';
// import './styles/main.css';

import { Ship } from './modules/ship.js';

let ship = Ship(3);
ship.changeDirection();
console.log(ship.horizontal);
