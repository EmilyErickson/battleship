import { gameboard } from "../gameboard";
import { shipFactory, rotateShip } from "../ship-factory";

test("create empty gameboard", () => {
  expect(gameboard[2]).toBe({ index: null });
});

test("rejects ship placed over another ship", () => {
  let board = gameboard();
  let battleship = shipFactory("battleship", 4);
  let submarine = shipFactory("submarine", 3);
  placeShip(12, battleship, board);
  placeShip(12, submarine, board);
  expect(placeShip(12, battleship, board)[2]).toStrictEqual({
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
  receiveAttack(34, board);
  expect(submarine.timesHit).toBe(1);
});

test("receiveAttack that misses ships", () => {
  let board = gameboard();
  let submarine = shipFactory("submarine", 3);
  placeShip(2, 3, submarine, board);
  receiveAttack(56, board);
  expect(receiveAttack(56, board)[56]).toBe("missed");
});

test("all ships sunk", () => {
  let board = gameboard();
  let allPlayerShips = [];
  let cruiser = shipFactory("cruiser", 3);
  placeShip(2, 3, cruiser, board);
  addShip(cruiser, allPlayerShips);
  receiveAttack(23, board);
  receiveAttack(24, board);
  receiveAttack(25, board);
  expect(shipsSunk(allPlayerShips)).toBe(true);
});
