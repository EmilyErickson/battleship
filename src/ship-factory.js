const shipFactory = (length) => {
  let timesHit = 0;
  let sunk = false;

  return { length, timesHit, sunk };
};

function hit(ship) {
  ship.timesHit += 1;
  return ship;
}

function isSunk(ship) {
  if (ship.timesHit >= ship.length) {
    ship.sunk = true;
    return ship;
  }
  ship.sunk = false;
  return ship;
}

export { shipFactory, hit, isSunk };
