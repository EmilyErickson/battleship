import { receiveAttack } from "./gameboard";

class Player {
  constructor(name, board) {
    this.name = name;
    this.board = board;
    this.allShips = [];
  }
}

function attackEnemy(i, enemyBoard) {
  if (i < 100) {
    return receiveAttack(i, enemyBoard);
  } else return enemyBoard;
}

function computerMove(playerBoard) {
  let random = getRandomIndex(playerBoard);
  attackEnemy(random, playerBoard);
  return random;
}

function getRandomIndex(board, num = null) {
  let random = Math.floor(Math.random() * 100);
  if (num !== null) {
    random = num + 1;
  }
  if (board[random].index === "hit") {
    return getRandomIndex(board, random);
  }
  if (board[random].index === "missed") {
    return getRandomIndex(board);
  }
  return random;
}

export { attackEnemy, computerMove, Player };
