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
  //another better way, push all cellobj to board, and add isAvailable prop
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
                board[i][j] = "x"; // rather than using x, another better idea is setting every cell with an object, and assign x to 'data' property.
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
  // PLAYER OBJECT SHOULD ONLY HANDLE CREATING NEW OBJ, NOT LOGIC 
  // if (name === "computer") {
  //   let randomRow = Math.floor(Math.random() * 10);
  //   let randomCol = Math.floor(Math.random() * 10);
  //   return {
  //     getName() {
  //       return name;
  //     },
  //     getBoard() {
  //       return board;  // this will return object
  //     },
  //     launchAttack(enemyGameBoard) {
  //       let checkCell = enemyGameBoard.getBoardAtIndex(randomRow, randomCol);
  //       while (checkCell !== "") {
  //         randomRow = Math.floor(Math.random() * 10);
  //         randomCol = Math.floor(Math.random() * 10);
  //         checkCell = enemyGameBoard.getBoardAtIndex(randomRow, randomCol);
  //       }
  //       enemyGameBoard.receiveAttack(randomRow, randomCol);
  //     },
  //   };
  // } 
    return {
      getName() {
        return name;
      },
      getBoardObj() {
        return board; // this will return object
      },
      launchAttack(enemyGameBoard, row, col) {
        // if (
        //   enemyGameBoard.getBoardAtIndex(row, col) === "miss" ||
        //   enemyGameBoard.getBoardAtIndex(row, col).hasBeenHit === true
        // ) {
        //   return; // this if should be put in the ccontroller maybe(controller handle logic/flow), so if row col have somethig, the playRound function not execute the other func
        // } // if already missAttack and already been hit, do nothing.
        enemyGameBoard.receiveAttack(row, col);
      },
    };
  
}

function gameController(){
    
    // initialize gameboard
    const player1GameBoard = gameBoard(); 
    const computerGameBoard = gameBoard();

    // put ship on the player gameboard
    const ship4player = shipFactory(4);
    const ship3player = shipFactory(3);
    const ship2player = shipFactory(2);
    const ship1player = shipFactory(1);

    player1GameBoard.placeShip(ship4player, 2, 2, "horizontal");
    player1GameBoard.placeShip(ship3player, 4, 4, "vertical");
    player1GameBoard.placeShip(ship2player, 6, 6, "horizontal");
    player1GameBoard.placeShip(ship1player, 8, 8, "horizontal");

    // put ship on the computer gameboard

    const ship4computer = shipFactory(4);
    const ship3computer = shipFactory(3);
    const ship2computer = shipFactory(2);
    const ship1computer = shipFactory(1);
    computerGameBoard.placeShip(ship4computer, 1, 1, "horizontal");
    computerGameBoard.placeShip(ship3computer, 4, 4, "vertical");
    computerGameBoard.placeShip(ship2computer, 6, 6, "horizontal");
    computerGameBoard.placeShip(ship1computer, 8, 8, "horizontal");

    // initialize player 
    const player1 = Player("player1", player1GameBoard);
    const computer = Player("computer", computerGameBoard);
    const players = [player1, computer];

    let activePlayer = players[0];
    let activePlayerEnemy = players[1];


    const getActivePlayer = () => activePlayer;
    const getActivePlayerName = () => getActivePlayer().getName(); //chain like this to be dynamic (bug 1-2hours)
    const getActivePlayerBoard = () => getActivePlayer().getBoardObj().getBoard();

    const getActivePlayerEnemy = () => activePlayerEnemy;
    const getActivePlayerEnemyName = () => getActivePlayerEnemy().getName();
    const getActivePlayerEnemyBoard = () => getActivePlayerEnemy().getBoardObj().getBoard();

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      activePlayerEnemy = activePlayerEnemy === players[1] ? players[0] : players[1];

    }

    const playRound = (row,col) => { // add the guard(if row col already been hit, then do nothing on the DOM), playRound only care for the logic
        activePlayer.launchAttack(activePlayerEnemy.getBoardObj(),row,col);
        // for(let i = 0; i < players.length; i+= 1) {
        //   if(players[i].getBoard().isAllShipSunk()){
        //     return `${players[i].name} is the winner`
        //   }
        // }
        switchPlayerTurn();
    }
    return {
      playRound,
      getActivePlayerName,
      getActivePlayerEnemyName,
      getActivePlayerBoard,
      getActivePlayerEnemyBoard
    };
}

const gameControllerPlaceholder = gameController()


gameControllerPlaceholder.playRound(1,1)
console.log(gameControllerPlaceholder.getActivePlayerName())
console.log(gameControllerPlaceholder.getActivePlayerBoard())


// gameController need to have, every time ship added, put the ship in some placeholder array, so can check isEveryShipSunk()
