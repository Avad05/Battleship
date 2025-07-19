import { battleGround } from "./battleground";

export function player(isComputer = false){
    const board = battleGround();

    function attack(opponent, coordinates){
        opponent.board.receivedAttacks(coordinates);

    }

    function getRandomCoordinates(size = 10){
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        return [x, y];
    }

    function autoPlay(opponent, previousMoves = new Set()){
        let coord;
        do{
            coord = getRandomCoordinates();
        }while(previousMoves.has(coord.toString()));

        previousMoves.add(coord.toString());
        attack(opponent, coord);
        return coord;
    }

    return{
        isComputer,
        board,
        autoPlay,
        attack
    };
}