import { receiveAttack } from "./gameboard";
import { populateBoard } from "./gameboard";

function setUpBoard() {
  populateBoard();
}

function attackEnemy(x, y, enemyBoard) {
  if (x * 10 + y <= 100) {
    return receiveAttack(x, y, enemyBoard);
  } else return enemyBoard;
}

function computerMove(playerBoard) {
  let randomX = Math.floor(Math.random() * 10);
  let randomY = Math.floor(Math.random() * 10);
  attackEnemy(randomX, randomY, playerBoard);
  console.log(attackEnemy(randomX, randomY, playerBoard));
}

export { attackEnemy, setUpBoard, computerMove };
