import Ship from "./battleship";

class Gameboard {
  constructor(){
       this.board = Array.from({ length: 10}, () => Array(10).fill(null)); //10x10 grid
       this.ships = [];
       this.missedAttacks = new Set();
       this.successfulAttacks = new Set();
  } 

  placeShip(ship, row, col, isVertical = false){
    const shipLength = ship.length;
    const boardSize = 10;

    let positions = [];

    if(isVertical){
      // try placing downward first
      if(row + shipLength <= boardSize){
        for (let i = 0; i < shipLength; i++){
          positions.push({ row: row + i, col});
        }}
        else if(row - shipLength +1 >= 0){
          for(let i = 0; i < shipLength; i++){
            positions.push({row: row -i, col});
          }
        }else{
          return false;
        }
      
    }else{
      if(col + shipLength <= boardSize){
        for(let i = 0;i < shipLength; i++){
          positions.push({row, col:col + i})
        }}else if(col -shipLength + 1 >=0){
          for (let i = 0; i < shipLength; i++){
            positions.push({row, col: col - i});
          }
        }else{
          return false;
        }
      }
      if(positions.length !== shipLength){
        return false;
      }
      // checking for overlapping
      for(const pos of positions){
         // check if the cell is already occupied or not
        if(this.board[pos.row][pos.col] !== null) return false;

        // check if adjacent cells are occupied or not
        const surroundingCells = this.getSurroundingCells(pos.row, pos.col);
        for(const [adjRow, adjCol] of surroundingCells){
          if(this.board[adjRow][adjCol] !== null) return false;
        }
      }
      for(const pos of positions){
        this.board[pos.row][pos.col] = ship;
      }
       
      this.ships.push(ship);
      return true;
  }

  receiveAttack(row, col){
    const coordinate = `${row},${col}`;
    if(
      this.missedAttacks.has(coordinate) || this.successfulAttacks.has(coordinate)){
        return null;
      }
    
      const target = this.board[row][col];
      if(target instanceof Ship){
        target.hit();
        this.successfulAttacks.add(coordinate);
        return true;
      }else{
        this.missedAttacks.add(coordinate);
        return false;
      }
  }
  placeRandomly(){
    const ShipLengths = [5, 4, 3, 3, 2];
    for(const length of ShipLengths){
        let placed = false;
        while(!placed){
          const row = Math.floor(Math.random() * 10);
          const col = Math.floor(Math.random() * 10);
          const isVertical = Math.random() < 0.5;
          const ship = new Ship(length);
          placed = this.placeShip(ship, row, col, isVertical);
        }
    } 
  }

  getEmptyCells(){
    let emptyCells = 0;
    for(let i = 0; i < 10; i++){
      for(let j = 0; i < 10; j++){
        if(this.board[i][j] === null) emptyCells++;
      }
    }
    return emptyCells;
  }

  checkWin(){
    return this.ships.every((ship) => ship.isSunk);
  }

  getShipCoordinates(){
    const shipCoords = [];

    for(let row = 0; row < this.board.length; row++){
      for(let col = 0; col < this.board[row].length; col++){
        if(this.board[row][col] instanceof Ship){
          shipCoords.push([row, col]);
        }
      }
    }
    return shipCoords;
  }

  getAdjacent(row, col){
    const adjacent = [];

    const directions = [
      { row: -1, col: 0},
      { row: 1, col: 0},
      { row: 0, col: -1},
      { row: 0, col: 1},
    ];

    for (const dir of directions){
      const newRow = row + dir.row;
      const newCol = col + dir.col;

      if( newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10){
        adjacent.push([newRow, newCol]);
      }
    }

    return adjacent;
  }

  getSurroundingCells(row, col){
    const surrounding = [];

    for( let r= row -1; r <= row + 1; r++){
      for( let c = col -1; c <= col + 1; c++){
        if(
          r >= 0 &&
          r < 10 &&
          c >= 0 &&
          c < 10 &&
          !(r === row && c === col)
        ){
          surrounding.push([r, c]);
        }
      }
    }

    return surrounding;
  }

  reset(){
    this.board = Array.from({ length: 10}, () => Array(10).fill(null));
    this.ships = [];
    this.missedAttacks.clear();
    this.successfulAttacks.clear();
  }

  
}

export default Gameboard;