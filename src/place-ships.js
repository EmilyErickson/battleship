import { rotateShip } from "./ship-factory";
import { removeShip } from "./dom";
import { addShip } from "./gameboard";

function placeShip(ind, ship, player) {
  if (ind > 100 - ship.length || ind < 0 || player.board[ind].index !== null) {
    return player.board;
  }
  let wrapable = preventWrapping(ind, ship, player);
  if (ship.direction === "horizontal" && wrapable === true) {
    placeHorizontalShip(ind, ship, player);
    addShip(ship, player);
  } else if (ship.direction === "vertical" && wrapable === true) {
    placeVerticalShip(ind, ship, player);
    addShip(ship, player);
  }
  return player.board;
}

function preventWrapping(index, ship, player) {
  if (ship.direction === "horizontal") {
    let num = index + ship.length - 1;
    if (index.toString()[1] == undefined && num < 10) {
      return true;
    }
    if (num.toString()[0] === index.toString()[0]) {
      return true;
    }
    if (player.name === "player") {
      alert("Ships can't wrap to the next line");
    }
    return false;
  }
  if (ship.direction === "vertical") {
    if (index.toString()[1] == undefined) {
      index = "0" + index;
    }
    let num = parseInt(index.toString()[0]) + ship.length;
    if (num <= 10) {
      return true;
    }
    if (player.name === "player") {
      alert("Ships can't run off the board");
    }
    return false;
  }
}

function placeHorizontalShip(ind, ship, player) {
  let board = player.board;
  for (let i = 0; i < ship.length; i++) {
    if (board[ind + i].index === null) {
      board[ind + i] = { ship: ship, index: i };
    }
  }
  if (player.name === "player") {
    removeShip(ship.name);
  }
  return board;
}

function placeVerticalShip(ind, ship, player) {
  let board = player.board;
  if (player.name === "player") {
    removeShip(ship.name);
  }
  for (let i = 0; i < ship.length; i++) {
    if (board[ind + i * 10].index === null) {
      board[ind + i * 10] = { ship: ship, index: i };
    }
  }
  return board;
}

function placeComputerShip(ship, player) {
  let random = getRandom();
  let boolean = randomBoolean();
  if (boolean === true) {
    let num = parseInt(random.toString()[0]) + ship.length;
    if (num > 10) {
      return placeComputerShip(ship, player);
    }
    rotateShip(ship);
    placeShip(random, ship, player);
  } else if (boolean === false) {
    let num = random + ship.length;
    if (num.toString()[0] !== random.toString()[0]) {
      return placeComputerShip(ship, player);
    }
    for (let i = 0; i < ship.length; i++) {
      let index = random + i;
      if (player.board[index].index !== null) {
        return placeComputerShip(ship, player);
      }
    }
    placeShip(random, ship, player);
  }
}

function getRandom() {
  let random = Math.floor(Math.random() * 100);
  return random;
}

function randomBoolean() {
  let boolean = Math.random();
  return boolean >= 0.5;
}

export { placeShip, placeComputerShip };
