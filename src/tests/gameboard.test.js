import {
  gameboard,
  placeShip,
  receiveAttack,
  shipsSunk,
  addShip,
} from "../gameboard";
import { shipFactory, rotateShip } from "../ship-factory";

test("create gameboard", () => {
  let board = gameboard();
  expect(board[25]).toBe(null);
});

test("rejects ship placed over another ship", () => {
  let board = gameboard();
  let battleship = shipFactory("battleship", 4);
  let submarine = shipFactory("submarine", 3);
  placeShip(0, 0, battleship, board);
  placeShip(0, 0, submarine, board);
  expect(placeShip(0, 0, battleship, board)[2]).toStrictEqual({
    ship: battleship,
    index: 2,
  });
});

test("place rotated ship", () => {
  let board = gameboard();
  let submarine = rotateShip(shipFactory("submarine", 3));
  expect(placeShip(6, 2, submarine, board)[72]).toStrictEqual({
    ship: submarine,
    index: 1,
  });
});

test("receiveAttack that hits a ship", () => {
  let board = gameboard();
  let submarine = shipFactory("submarine", 3);
  placeShip(3, 4, submarine, board);
  receiveAttack(3, 4, board);
  expect(submarine.timesHit).toBe(1);
});

test("receiveAttack that misses ships", () => {
  let board = gameboard();
  let submarine = shipFactory("submarine", 3);
  placeShip(2, 3, submarine, board);
  receiveAttack(5, 6, board);
  expect(receiveAttack(5, 6, board)[56]).toBe("missed");
});

test("all ships sunk", () => {
  let board = gameboard();
  let cruiser = shipFactory("cruiser", 3);
  placeShip(2, 3, cruiser, board);
  addShip(cruiser);
  receiveAttack(2, 3, board);
  receiveAttack(2, 4, board);
  receiveAttack(2, 5, board);
  expect(shipsSunk()).toBe(true);
});
