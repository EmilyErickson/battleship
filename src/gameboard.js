import { hit, shipFactory } from "./ship-factory";
import { player, enemy } from ".";
import { removeShip } from "./dom";
import { placeComputerShip } from "./place-ships";

const gameboard = () => {
  let board = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = { index: null };
      board.push(cell);
    }
  }
  return board;
};

function addShip(ship, player) {
  player.allShips.push(ship);
  return player;
}

function receiveAttack(i, board) {
  if (board[i].index === "missed") return board;
  if (board[i].index === null) {
    board[i].index = "missed";
  } else if (board[i].index !== null && board[i].index !== "hit") {
    board[i].index = "hit";
    hit(board[i].ship);
  }
  return board;
}

function shipsSunk(allPlayerShips) {
  let shipsSunk = 0;
  let allShipsSunk = false;
  for (let i = 0; i < allPlayerShips.length; i++) {
    if (allPlayerShips[i].sunk === true) {
      shipsSunk++;
    }
  }
  if (shipsSunk === allPlayerShips.length) {
    allShipsSunk = true;
  }
  return allShipsSunk;
}

function gameOver() {
  let playerSunk = shipsSunk(player.allShips);
  let enemySunk = shipsSunk(enemy.allShips);
  if (playerSunk || enemySunk) {
    return true;
  }
}

function populateBoard(player) {
  let carrier = shipFactory("carrier", 5);
  placeComputerShip(carrier, player);
  let battleship = shipFactory("battleship", 4);
  placeComputerShip(battleship, player);
  let cruiser = shipFactory("cruiser", 3);
  placeComputerShip(cruiser, player);
  let submarine = shipFactory("submarine", 3);
  placeComputerShip(submarine, player);
  let destroyer = shipFactory("destroyer", 2);
  placeComputerShip(destroyer, player);
}

export {
  gameboard,
  receiveAttack,
  shipsSunk,
  addShip,
  populateBoard,
  gameOver,
};
