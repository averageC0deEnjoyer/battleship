function shipFactory(length) {
  let shipHit = 0;
  return {
    getLength() {
      return length;
    },
    hit() {
      shipHit += 1;
      return shipHit;
    },
    get health() {
      return length - shipHit;
    },
    isSunk() {
      if (shipHit === length) {
        return true;
      }
      return false;
    },
  };
}

function gameBoard() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    board.push([]);
    for (let j = 0; j < 10; j += 1) {
      board[i].push("");
    }
  }

  const cellObj = (data) => ({
    hasBeenHit: false,
    data, // to save ship object data
  });

  return {
    getBoardAtIndex(row, col) {
      return board[row][col];
    },
    getBoard() {
      return board;
    },
    placeShip(ship, row, col, direction) {
      const shipObj = ship;
      
      switch (direction) {
        case "horizontal":
          for (let i = col; i < col+ship.getLength(); i += 1) {
            if (typeof board[row][col] === "object" || board[row][col] === "x") {
                return;
              } // to check if i put a ship, if there is some X or already ship, then just exit func
          }
          for (let i = 0; i < ship.getLength(); i += 1) {
            board[row][col + i] = cellObj(shipObj);
          }
          for (let i = row - 1; i <= row + 1; i += 1) {
            for (let j = col - 1; j < col + ship.getLength() + 1; j += 1) {
              if (board[i][j] === "") {
                board[i][j] = "x";
              }
            }
          }
          break;
        case "vertical":
          for (let i = row; i < row+ship.getLength(); i += 1) {
              if (typeof board[row][col] === "object" || board[row][col] === "x") {
                  return;
                } // to check if i put a ship, if there is some X or already ship, then just exit func
            }
          for (let i = 0; i < ship.getLength(); i += 1) {
            board[row + i][col] = cellObj(shipObj);
          }
          for (let i = row - 1; i <= row + ship.getLength(); i += 1) {
            for (let j = col - 1; j <= col + 1; j+=1) {
              if (board[i][j] === "") {
                board[i][j] = "x";
              }
            }
          }
          break;
        default:
          break;
      }
    },
    receiveAttack(row, col) {
      // later on, if miss or hasBeenHit, cant be attacked again.
      if (board[row][col].hasBeenHit === true) {
        return;
      } // if already been hit 1 times, do nothing.
      if (
        typeof board[row][col].data === "object" &&
        board[row][col].hasBeenHit === false
      ) {
        board[row][col].data.hit();
        board[row][col].hasBeenHit = true;
      } else {
        board[row][col] = "miss";
      }
    },
    isAllShipSunk() {
      for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
          if (board[i][j].hasBeenHit === false) return false;
        }
      }
      return true;
    },
  };
}

function Player(name, board) {
  if (name === "computer") {
    let randomRow = Math.floor(Math.random() * 10);
    let randomCol = Math.floor(Math.random() * 10);
    return {
      getName() {
        return name;
      },
      getBoard() {
        return board;
      },
      launchAttack(enemyGameBoard) {
        let checkCell = enemyGameBoard.getBoardAtIndex(randomRow, randomCol);
        while (checkCell !== "") {
          randomRow = Math.floor(Math.random() * 10);
          randomCol = Math.floor(Math.random() * 10);
          checkCell = enemyGameBoard.getBoardAtIndex(randomRow, randomCol);
        }
        enemyGameBoard.receiveAttack(randomRow, randomCol);
      },
    };
  }
  return {
    getName() {
      return name;
    },
    getBoard() {
      return board;
    },
    launchAttack(enemyGameBoard, row, col) {
      if (
        enemyGameBoard.getBoardAtIndex(row, col) === "miss" ||
        enemyGameBoard.getBoardAtIndex(row, col).hasBeenHit === true
      ) {
        return;
      } // if already missAttack and already been hit, do nothing.
      enemyGameBoard.receiveAttack(row, col);
    },
  };
}

function gameController(){
    
    
    const player1GameBoard = gameBoard(); 
    const player1 = Player("player1", player1GameBoard);
    const computerGameBoard = gameBoard();
    const computer = Player("computer", computerGameBoard);



}





const player1Board = gameBoard();

const ship4 = shipFactory(4);
const ship3 = shipFactory(3);

player1Board.placeShip(ship4, 2, 2, "horizontal");
player1Board.placeShip(ship3, 1, 2, "vertical");

console.log(player1Board.getBoard());

// gameController need to have, every time ship added, put the ship in some placeholder array, so can check isEveryShipSunk()
