const shipFactory = (name, length) => {
  let timesHit = 0;
  let sunk = false;
  let direction = "horizontal";

  return { name, length, direction, timesHit, sunk };
};

function hit(ship) {
  ship.timesHit += 1;
  isSunk(ship);
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

function rotateShip(ship) {
  if (ship.direction === "horizontal") {
    ship.direction = "vertical";
  } else {
    ship.direction = "horizontal";
  }
  return ship;
}

export { shipFactory, hit, isSunk, rotateShip };
