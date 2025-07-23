import Ship from "./battleship";

class GameController {
  constructor(player1, player2, gameMode){
       this.player1 = player1;
       this.player2 = player2;
       this.currentPlayer = player1;
       this.opponent = player2;
       this.gameMode = gameMode;
       this.difficulty = 'normal';
       this.shipsToPlace = [5, 4, 3, 3, 2]; //length of ships to place
       this.currentShipIndex = 0;
       this.isGameOver = false;
       this.winner = null;
  }
     
  shipPlacement(player, row = null, col = null, isVertical = false){
    if(player.isAI){
      player.gameboard.placeRandomly();
      return true;
    }

    const shipLength = this.shipsToPlace[this.currentShipIndex];
    const ship = new Ship(shipLength);
    const placed = player.gameboard.placeShip(ship, row, col, isVertical);

    if(placed){
      this.currentShipIndex++;
      if(this.currentShipIndex >= this.shipsToPlace.length){
        this.placementPhase = false;
        this.currentShipIndex = 0;
      }
      return true;
    }
    return false;
  }

  handleTurn(row, col){
    const attacker = this.currentPlayer;
    const opponent = this.opponent;
    let result;

    if(attacker.isAI){
      result = 
      this.difficulty === 'hard'
      ? attacker.smartAttack(opponent)
      : attacker.randomAttack(opponent);
    }else{
      result = attacker.attack(row, col, opponent);
    }

    if(opponent.gameboard.checkWin()){
      this.isGameOver = true;
      this.winner = attacker.name;
    }

    this.swapTurns();
    return result;
  }

  swapTurns(){
    [this.currentPlayer, this.opponent] = [this.opponent, this.currentPlayer];
  }

  resetGame(){
    this.player1.gameboard.reset();
    this.player2.gameboard.reset();
    this.currentPlayer = this.player1;
    this.opponent = this.player2;
    this.currentShipIndex = 0;
    this.placementPhase = true;
    this.isGameOver = false;
    this.winner = null;
  }

}

export default GameController;