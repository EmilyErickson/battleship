import { shipFactory, hit, isSunk } from "../functions";

test("shipFactory(3)", () => {
  expect(shipFactory(3)).toStrictEqual({ length: 3, timesHit: 0, sunk: false });
});

test("hit(ship) tests hits increase each time", () => {
  let ship = shipFactory(3);
  expect(hit(ship)).toStrictEqual({
    length: 3,
    timesHit: 1,
    sunk: false,
  });
});

test("sunk returns true if hits = length of ship", () => {
  let ship = hit(shipFactory(1));
  expect(isSunk(ship)).toStrictEqual({ length: 1, timesHit: 1, sunk: true });
});
