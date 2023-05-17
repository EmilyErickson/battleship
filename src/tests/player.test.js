import { attackEnemy, computerMove, setUpBoard } from "../player";
import { gameboard, placeShip } from "../gameboard";
import { shipFactory } from "../ship-factory";

test("Attack enemy ship", () => {
  let board = gameboard();
  let submarine = shipFactory("submarine", 3);
  placeShip(3, 3, submarine, board);
  attackEnemy(3, 4, board);
  expect(submarine.timesHit).toBe(1);
});

test("Attack enemy board", () => {
  let board = gameboard();
  let submarine = shipFactory("submarine", 3);
  placeShip(3, 3, submarine, board);
  attackEnemy(3, 4, board);
  attackEnemy(3, 5, board);
  attackEnemy(3, 4, board);
  attackEnemy(3, 4, board);
  expect(submarine.timesHit).toBe(2);
});
