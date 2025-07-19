import { ship } from "./battleship";

export function battleGround(){
    const ships = [];
    const missedAttacks = [];
    const shipPositions = {};

    function placeShip (ship, coordinatesArray){
             coordinatesArray.forEach(coord =>{
                const key = coord.toString();
                shipPositions[key] = ship;
             });
             ships.push(ship);
    }

    function receivedAttacks ([x, y]){
          const key = `${x},${y}`;
          const targetShip = shipPositions[key];
          if(targetShip){
            targetShip.hit();
          }else{
            missedAttacks.push([x,y]);
          }
    }

    function allShipSunk(){
        return ships.every(ship => ship.sunk());
    }
    return{
        placeShip,
        receivedAttacks,
        allShipSunk,
        get missedAttacks(){
            return missedAttacks;
        }
    };
}