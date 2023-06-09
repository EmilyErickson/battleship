import { playerTurn, gameLoop, player } from "./index";
import { receiveAttack, populateBoard, gameOver } from "./gameboard";
import { shipFactory } from "./ship-factory";
import { placeShip } from "./place-ships";

let gameContainer = document.querySelector(".gameboard-container");
let shipWrapper = document.querySelector(".ship-wrapper");
let shipContainer = document.querySelector(".player-ships");
let textBox = document.querySelector(".textbox");

let carrier = document.querySelector(".carrier");
let battleship = document.querySelector(".battleship");
let cruiser = document.querySelector(".cruiser");
let submarine = document.querySelector(".submarine");
let destroyer = document.querySelector(".destroyer");

carrier.addEventListener("dragstart", dragStart);
carrier.addEventListener("dragend", dragEnd);
battleship.addEventListener("dragstart", dragStart);
battleship.addEventListener("dragend", dragEnd);
cruiser.addEventListener("dragstart", dragStart);
cruiser.addEventListener("dragend", dragEnd);
submarine.addEventListener("dragstart", dragStart);
submarine.addEventListener("dragend", dragEnd);
destroyer.addEventListener("dragstart", dragStart);
destroyer.addEventListener("dragend", dragEnd);
destroyer.addEventListener("drop", dragDrop);

let rotateBtn = document.querySelector(".rotate-ships");
rotateBtn.addEventListener("click", rotateShips);

let currentShip = null;
let vertical = false;

function rotateShips(e) {
  if (vertical === false) {
    vertical = true;
  } else if (vertical === true) {
    vertical = false;
  }
  flipShips();
  return vertical;
}

function dragStart(e) {
  currentShip = e.target;
}
function dragEnd(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  let droppedShip = createShip(currentShip);
  let index = parseInt(e.target.className[0] + e.target.className[1]);
  placeShip(index, droppedShip, player);
  displayShips(e.target.parentElement.childNodes[0], player.board);
  startGame();
}

function removeShip(ship) {
  let child = document.querySelector(`.${ship}`);
  shipContainer.removeChild(child);
}

function createShip(ship) {
  let length;
  if (ship.className === "carrier") {
    length = 5;
  } else if (ship.className === "battleship") {
    length = 4;
  } else if (ship.className === "cruiser" || ship.className === "submarine") {
    length = 3;
  } else if (ship.className === "destroyer") {
    length = 2;
  }
  let myShip = shipFactory(`${ship.className}`, length);
  if (vertical === true) {
    myShip.direction = "vertical";
  }
  return myShip;
}

function flipShips() {
  if (vertical === true) {
    shipContainer.classList.add("vertical");
  } else if (vertical === false) {
    shipContainer.classList.remove("vertical");
  }
}

function startGame() {
  if (shipContainer.children.length === 1) {
    gameContainer.classList.remove("ships");
    gameContainer.removeChild(shipWrapper);
  }
}

function createEnemyBoard(boardUser) {
  let enemyBoard = document.querySelector(".enemy-gameboard");
  populateBoard(boardUser);
  for (let i = 0; i < boardUser.board.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add(`enemy${i}`);
    cell.classList.add("cell");
    cell.addEventListener("click", () => {
      if (gameOver() === true) {
        updateTextbox("game over", player);
        return;
      }
      if (playerTurn !== true) {
        alert("please wait your turn");
        return;
      }
      if (playerTurn == true) {
        handleGameboardClick(i, boardUser);
        updateBoardDisplay(i, boardUser);
      }
    });
    enemyBoard.append(cell);
  }
}

function createPlayerBoard(player) {
  let playerBoard = document.querySelector(".player-gameboard");
  for (let i = 0; i < player.board.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add(`${i}`);
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("drop", dragDrop);
    cell.classList.add("cell");
    playerBoard.append(cell);
  }
}

function displayShips(cell, board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].index !== null) {
      cell.classList.add("ship");
    }
    cell = cell.nextSibling;
  }

  return board;
}

function updateBoardDisplay(cellIndex, player) {
  let cell = getCell(cellIndex, player);
  let boardCell = player.board[cellIndex];
  if (boardCell.index === "missed") {
    cell.classList.add("missed");
  }
  if (boardCell.index === "hit") {
    cell.classList.add("hit");
  }
}

function getCell(boardCell, player) {
  if (player.name === "player") {
    let cell = document.getElementsByClassName(`${boardCell}`);
    return cell[0];
  } else {
    let cell = document.getElementsByClassName(`enemy${boardCell}`);
    return cell[0];
  }
}

function handleGameboardClick(i, boardUser) {
  if (
    boardUser.board[i].index !== "missed" &&
    boardUser.board[i].index !== "hit"
  ) {
    receiveAttack(i, boardUser.board);
    let playerTurn = false;
    gameLoop(playerTurn);
  } else {
    updateTextbox("invalid cell", player);
  }
}

function updateTextbox(message, player) {
  if (player.name !== "player") {
    return;
  }

  switch (message) {
    case "game over":
      textBox.classList.add("game-over");
      break;
    case "player win":
      gameContainer.classList.add("winner");
      textBox.classList.add("game-over");
      textBox.textContent = "YOU WIN!! GAME OVER!";
      break;
    case "enemy win":
      gameContainer.classList.add("winner");
      textBox.classList.add("game-over");
      textBox.textContent = "Computer Wins! GAME OVER!";
      break;
    case "ship error":
      textBox.classList.add("error");
      textBox.textContent = "Ships can't overlap or run off the board!";
      setTimeout(textBoxDefault, 2000);
      break;
    case "invalid cell":
      textBox.classList.add("error");
      textBox.textContent = "Please choose a valid cell";
      setTimeout(textBoxDefault, 1200);
      break;
    default:
      textBox.classList.remove("error");
      textBox.textContent = "Select a cell on the enemy board";
  }
}

function textBoxDefault() {
  textBox.classList.remove("error");
  if (shipContainer.children.length > 1) {
    textBox.textContent = "Use the red box to drag and place ships.";
    return;
  }
  textBox.textContent = "Select a cell on the enemy board";
}

export {
  createPlayerBoard,
  createEnemyBoard,
  updateBoardDisplay,
  displayShips,
  dragOver,
  dragDrop,
  removeShip,
  updateTextbox,
};
