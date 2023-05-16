import { shipFactory, hit, isSunk } from "./ship-factory";

let allShips = [];
// const carrier = shipFactory("carrier", 5);
// const battleship = shipFactory("battleship", 4);
// const cruiser = shipFactory("cruiser", 3);
// const submarine = shipFactory("submarine", 3);
// const destroyer = shipFactory("destroyer", 2);
// allShips.push(carrier, battleship, cruiser, submarine, destroyer);

const gameboard = () => {
  let board = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = null;
      board.push(cell);
    }
  }
  return board;
};

// let board = gameboard();

function placeShip(x, y, ship, board) {
  if (
    board[x * 10 + y] > 100 - ship.length ||
    board[x * 10 + y] < 0 ||
    board[x * 10 + y] !== null
  ) {
    return board;
  }
  if (ship.direction === "horizontal") {
    placeHorizontalShip(x, y, ship, board);
  } else if (ship.direction === "vertical") {
    placeVerticalShip(x, y, ship, board);
  }
  //   allShips.push(ship);
  return board;
}

function placeHorizontalShip(x, y, ship, board) {
  for (let i = 0; i < ship.length; i++) {
    if (board[x * 10 + y + i] === null) {
      board[x * 10 + y + i] = { ship: ship, index: i };
    }
  }
  return board;
}

function placeVerticalShip(x, y, ship, board) {
  for (let i = 0; i < ship.length; i++) {
    if (board[(x + i) * 10 + y] === null) {
      board[(x + i) * 10 + y] = { ship: ship, index: i };
    }
  }
  return board;
}

function addShip(ship) {
  allShips.push(ship);
  return allShips;
}

function receiveAttack(x, y, board) {
  if (board[x * 10 + y] === "missed") return board;
  if (board[x * 10 + y] !== null) {
    hit(board[x * 10 + y].ship);
  } else if (board[x * 10 + y] == null) {
    board[x * 10 + y] = "missed";
  }
  return board;
}

function shipsSunk() {
  let shipsSunk = 0;
  let allShipsSunk = false;
  for (let i = 0; i < allShips.length; i++) {
    if (allShips[i].sunk === true) {
      shipsSunk++;
    }
  }
  if (shipsSunk === allShips.length) {
    allShipsSunk = true;
  }
  return allShipsSunk;
}

function checkShipStatus(ship) {
  if (ship.sunk === true) {
    return ship.sunk;
  } else return;
}

export { gameboard, placeShip, receiveAttack, shipsSunk, addShip };
