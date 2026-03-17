export function Ship(length, horizontal = true, hits = 0, sunk = false) {
  function hit() {
    if (sunk === false) {
      hits += 1;
      isSunk();
    } else return;
  }

  function getHits() {
    return hits;
  }

  function isSunk() {
    if (sunk === true || hits === length) {
      sunk = true;
      return true;
    } else return false;
  }

  function isHorizontal() {
    return horizontal;
  }

  function changeDirection() {
    horizontal = !horizontal;
  }

  return { length, isHorizontal, hit, getHits, isSunk, changeDirection };
}
