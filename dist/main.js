/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enemy: () => (/* binding */ enemy),
/* harmony export */   gameLoop: () => (/* binding */ gameLoop),
/* harmony export */   gameOver: () => (/* reexport safe */ _gameboard__WEBPACK_IMPORTED_MODULE_0__.gameOver),
/* harmony export */   player: () => (/* binding */ player),
/* harmony export */   playerTurn: () => (/* binding */ playerTurn)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);



let enemy = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("computer", (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)());
let player = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("player", (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)());
(0,_dom__WEBPACK_IMPORTED_MODULE_2__.createPlayerBoard)(player);
(0,_dom__WEBPACK_IMPORTED_MODULE_2__.createEnemyBoard)(enemy);
let playerTurn = true;
function gameLoop(playerTurn) {
  if ((0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameOver)() === true) {
    alert("Game Over");
    return;
  }
  if (playerTurn === false) {
    let cellIndex = (0,_player__WEBPACK_IMPORTED_MODULE_1__.computerMove)(player.board);
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.updateBoardDisplay)(cellIndex, player);
    playerTurn = true;
    setTimeout(() => {
      gameLoop(playerTurn);
    }, 50);
  }
  return playerTurn;
}


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addShip: () => (/* binding */ addShip),
/* harmony export */   gameOver: () => (/* binding */ gameOver),
/* harmony export */   gameboard: () => (/* binding */ gameboard),
/* harmony export */   populateBoard: () => (/* binding */ populateBoard),
/* harmony export */   receiveAttack: () => (/* binding */ receiveAttack),
/* harmony export */   shipsSunk: () => (/* binding */ shipsSunk)
/* harmony export */ });
/* harmony import */ var _ship_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _place_ships__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);




const gameboard = () => {
  let board = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = {
        index: null
      };
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
    (0,_ship_factory__WEBPACK_IMPORTED_MODULE_0__.hit)(board[i].ship);
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
  let playerSunk = shipsSunk(___WEBPACK_IMPORTED_MODULE_1__.player.allShips);
  let enemySunk = shipsSunk(___WEBPACK_IMPORTED_MODULE_1__.enemy.allShips);
  if (playerSunk || enemySunk) {
    return true;
  }
}
function populateBoard(player) {
  let carrier = (0,_ship_factory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)("carrier", 5);
  (0,_place_ships__WEBPACK_IMPORTED_MODULE_3__.placeComputerShip)(carrier, player);
  let battleship = (0,_ship_factory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)("battleship", 4);
  (0,_place_ships__WEBPACK_IMPORTED_MODULE_3__.placeComputerShip)(battleship, player);
  let cruiser = (0,_ship_factory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)("cruiser", 3);
  (0,_place_ships__WEBPACK_IMPORTED_MODULE_3__.placeComputerShip)(cruiser, player);
  let submarine = (0,_ship_factory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)("submarine", 3);
  (0,_place_ships__WEBPACK_IMPORTED_MODULE_3__.placeComputerShip)(submarine, player);
  let destroyer = (0,_ship_factory__WEBPACK_IMPORTED_MODULE_0__.shipFactory)("destroyer", 2);
  (0,_place_ships__WEBPACK_IMPORTED_MODULE_3__.placeComputerShip)(destroyer, player);
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hit: () => (/* binding */ hit),
/* harmony export */   isSunk: () => (/* binding */ isSunk),
/* harmony export */   rotateShip: () => (/* binding */ rotateShip),
/* harmony export */   shipFactory: () => (/* binding */ shipFactory)
/* harmony export */ });
const shipFactory = (name, length) => {
  let timesHit = 0;
  let sunk = false;
  let direction = "horizontal";
  return {
    name,
    length,
    direction,
    timesHit,
    sunk
  };
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


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   attackEnemy: () => (/* binding */ attackEnemy),
/* harmony export */   computerMove: () => (/* binding */ computerMove)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


class Player {
  constructor(name, board) {
    this.name = name;
    this.board = board;
    this.allShips = [];
  }
}
function attackEnemy(i, enemyBoard) {
  if (i < 100) {
    return (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.receiveAttack)(i, enemyBoard);
  } else return enemyBoard;
}
function computerMove(playerBoard) {
  let random = getRandomIndex(playerBoard);
  attackEnemy(random, playerBoard);
  return random;
}
function getRandomIndex(board) {
  let num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let random = Math.floor(Math.random() * 100);
  if (num !== null) {
    random = num + 1;
  }
  if (board[random].index === "hit") {
    console.log(board[random].index);
    return getRandomIndex(board, random);
  }
  if (board[random].index === "missed") {
    return getRandomIndex(board);
  }
  return random;
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEnemyBoard: () => (/* binding */ createEnemyBoard),
/* harmony export */   createPlayerBoard: () => (/* binding */ createPlayerBoard),
/* harmony export */   displayShips: () => (/* binding */ displayShips),
/* harmony export */   dragDrop: () => (/* binding */ dragDrop),
/* harmony export */   dragOver: () => (/* binding */ dragOver),
/* harmony export */   playerTurn: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.playerTurn),
/* harmony export */   removeShip: () => (/* binding */ removeShip),
/* harmony export */   updateBoardDisplay: () => (/* binding */ updateBoardDisplay)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _ship_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _place_ships__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);




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
  //   e.preventDefault();
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
  (0,_place_ships__WEBPACK_IMPORTED_MODULE_3__.placeShip)(index, droppedShip, _index__WEBPACK_IMPORTED_MODULE_0__.player);
  displayShips(e.target.parentElement.childNodes[0], _index__WEBPACK_IMPORTED_MODULE_0__.player.board);
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
  let myShip = (0,_ship_factory__WEBPACK_IMPORTED_MODULE_2__.shipFactory)(`${ship.className}`, length);
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
    textBox.textContent = "Your turn";
  }
}
function createEnemyBoard(boardUser) {
  let enemyBoard = document.querySelector(".enemy-gameboard");
  (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.populateBoard)(boardUser);
  for (let i = 0; i < boardUser.board.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add(`enemy${i}`);
    cell.classList.add("cell");
    cell.addEventListener("click", () => {
      if ((0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.gameOver)() === true) {
        alert("Game Over");
        return;
      }
      if (_index__WEBPACK_IMPORTED_MODULE_0__.playerTurn !== true) {
        alert("please wait your turn");
        return;
      }
      if (_index__WEBPACK_IMPORTED_MODULE_0__.playerTurn == true) {
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
  if (boardUser.board[i].index !== "missed" && boardUser.board[i].index !== "hit") {
    (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.receiveAttack)(i, boardUser.board);
    setTimeout(() => {
      let playerTurn = false;
      (0,_index__WEBPACK_IMPORTED_MODULE_0__.gameLoop)(playerTurn);
    }, 15);
  } else {
    alert("Please choose a valid cell");
  }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   placeComputerShip: () => (/* binding */ placeComputerShip),
/* harmony export */   placeShip: () => (/* binding */ placeShip)
/* harmony export */ });
/* harmony import */ var _ship_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);



function placeShip(ind, ship, player) {
  if (ind > 100 - ship.length || ind < 0 || player.board[ind].index !== null) {
    return player.board;
  }
  let wrapable = preventWrapping(ind, ship, player);
  if (ship.direction === "horizontal" && wrapable === true) {
    placeHorizontalShip(ind, ship, player);
    (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.addShip)(ship, player);
  } else if (ship.direction === "vertical" && wrapable === true) {
    placeVerticalShip(ind, ship, player);
    (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.addShip)(ship, player);
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
      board[ind + i] = {
        ship: ship,
        index: i
      };
    }
  }
  if (player.name === "player") {
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.removeShip)(ship.name);
  }
  return board;
}
function placeVerticalShip(ind, ship, player) {
  let board = player.board;
  if (player.name === "player") {
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.removeShip)(ship.name);
  }
  for (let i = 0; i < ship.length; i++) {
    if (board[ind + i * 10].index === null) {
      board[ind + i * 10] = {
        ship: ship,
        index: i
      };
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
    (0,_ship_factory__WEBPACK_IMPORTED_MODULE_0__.rotateShip)(ship);
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


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;