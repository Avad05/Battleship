import { player } from "./player";
import { ship } from "./battleship";
import { battleGround } from "./battleground";

test('Testing the players', () =>{
    const player1 = player();
    const player2 = player();
    const Ship = ship(1);
    player2.board.placeShip(Ship, [[0 ,0]]);
    player1.attack(player2, [0, 0]);
    expect(Ship.isSunk()).toBe(true);
})