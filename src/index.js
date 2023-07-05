import { gameboard, gameOver } from "./gameboard";
import { computerMove, Player } from "./player";
import { createEnemyBoard, createPlayerBoard, updateBoardDisplay } from "./dom";

let enemy = new Player("computer", gameboard());
let player = new Player("player", gameboard());
createPlayerBoard(player);
createEnemyBoard(enemy);

let playerTurn = true;

function gameLoop(playerTurn) {
  if (gameOver() === true) {
    alert("Game Over");
    return;
  }
  if (playerTurn === false) {
    let cellIndex = computerMove(player.board);
    updateBoardDisplay(cellIndex, player);
    playerTurn = true;
    setTimeout(() => {
      gameLoop(playerTurn);
    }, 50);
  }
  return playerTurn;
}

export { enemy, player, gameLoop, gameOver, playerTurn };
