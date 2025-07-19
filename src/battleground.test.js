import { battleGround } from "./battleground";
import { ship } from "./battleship";

test('battleground function', () =>{
    const battle = battleGround();
    const Ship = ship(2);

    battle.placeShip(Ship, [[1, 2], [1, 1]]);
    battle.receivedAttacks([1, 2]);
    battle.receivedAttacks([2, 2]);
    expect(Ship.hits).toBe(1);
})

test('battleground test 2', () =>{
    const battle = battleGround();
    const Ship = ship(2);

    battle.placeShip(Ship, [[1, 2], [1, 1]]);
    battle.receivedAttacks([1, 6]);
    battle.receivedAttacks([2, 9]);
    expect(Ship.hits).toBe(0);
});

test('battleground 3', () =>{
    const battle = battleGround();
    const Ship = ship(2);

    battle.placeShip(Ship, [[1, 2], [2, 1]]);
    battle.receivedAttacks([1, 2]);
    battle.receivedAttacks([2, 1]);
    battle.receivedAttacks([0, 0]);
    expect(battle.missedAttacks).toContainEqual([0, 0]);

})

test('battleground 3', () =>{
    const battle = battleGround();
    const Ship = ship(2);

    battle.placeShip(Ship, [[1, 2], [2, 1]]);
    battle.receivedAttacks([1, 2]);
    battle.receivedAttacks([2, 1]);
    expect(Ship.isSunk()).toBe(true);

});   