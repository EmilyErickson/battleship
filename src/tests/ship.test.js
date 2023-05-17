import { shipFactory, hit, isSunk, rotateShip } from "../ship-factory";

test("shipFactory(submarine, 3)", () => {
  expect(shipFactory("submarine", 3)).toStrictEqual({
    name: "submarine",
    length: 3,
    direction: "horizontal",
    timesHit: 0,
    sunk: false,
  });
});

test("hit(ship) tests hits increase each time", () => {
  let submarine = shipFactory("submarine", 3);
  expect(hit(submarine)).toStrictEqual({
    name: "submarine",
    length: 3,
    direction: "horizontal",
    timesHit: 1,
    sunk: false,
  });
});

test("sunk returns true if hits = length of ship", () => {
  let ship = hit(shipFactory("test", 1));
  expect(isSunk(ship)).toStrictEqual({
    name: "test",
    length: 1,
    direction: "horizontal",
    timesHit: 1,
    sunk: true,
  });
});

test("rotate ship", () => {
  let ship = shipFactory("destroyer", 2);
  expect(rotateShip(ship).direction).toBe("vertical");
});
