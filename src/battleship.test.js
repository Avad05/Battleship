import { ship } from "./battleship";

test('Testing the hits', () =>{
    let ships = ship(3);
    ships.hit();
    expect(ships.hits).toBe(1);
});

test('Testing that hits do not exceed the length', () =>{
    let ships = ship(1);
    ships.hit();
    ships.hit();
    expect(ships.hits).toBe(1);
});

test('Testing isSunk function', () =>{
    let ships = ship(2);
    ships.hit();
    ships.hit();
    expect(ships.isSunk()).toBe(true);
});

test('Testing isSunk function', () =>{
    let ships = ship(3);
    ships.hit();
    ships.hit();
    expect(ships.isSunk()).toBe(false);
});