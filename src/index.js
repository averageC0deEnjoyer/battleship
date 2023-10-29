// import "./style.css"

function shipFactory(length) {
  let shipHit = 0;

  const reset = () => {
    shipHit = 0;
  }
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
    reset
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
  // another better way, push all cellobj to board, and add isAvailable prop
  const cellObj = (data) => ({
    hasBeenHit: false,
    data, // to save ship object data
  });

  const reset = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        board[i][j] = "";
      }
    }
  }

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
              if (i < 0 || j < 0 || i > 9 || j > 9) {
                continue;
              }
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
              if (i < 0 || j < 0 || i > 9 || j > 9) {
                continue;
              }
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
    reset
  };
}

function Player(name, board) {
    return {
      getName() {
        return name;
      },
      getBoardObj() {
        return board; // this will return object
      },
      launchAttack(enemyGameBoard, row, col) {
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
    let result;
    let isOver = 0;

    function initializeAfterReset(){
      activePlayer = players[0];
      activePlayerEnemy = players[1];
      result = "";
      isOver = 0;

      ship4player.reset()
      ship3player.reset()
      ship2player.reset()
      ship1player.reset()

      ship4computer.reset()
      ship3computer.reset()
      ship2computer.reset()
      ship1computer.reset()

      player1GameBoard.placeShip(ship4player, 0, 0, "vertical");
      player1GameBoard.placeShip(ship3player, 4, 4, "vertical");
      player1GameBoard.placeShip(ship2player, 6, 6, "horizontal");
      player1GameBoard.placeShip(ship1player, 8, 8, "horizontal");

      computerGameBoard.placeShip(ship4computer, 1, 1, "horizontal");
      computerGameBoard.placeShip(ship3computer, 4, 4, "vertical");
      computerGameBoard.placeShip(ship2computer, 6, 6, "horizontal");
      computerGameBoard.placeShip(ship1computer, 8, 8, "horizontal");

    }


    const getActivePlayer = () => activePlayer;
    const getActivePlayerName = () => getActivePlayer().getName(); // chain like this to be dynamic (bug 1-2hours)
    const getActivePlayerBoard = () => getActivePlayer().getBoardObj().getBoard();
    const getActivePlayerBoardObj = () => getActivePlayer().getBoardObj();

    const getActivePlayerEnemy = () => activePlayerEnemy;
    const getActivePlayerEnemyName = () => getActivePlayerEnemy().getName();
    const getActivePlayerEnemyBoard = () => getActivePlayerEnemy().getBoardObj().getBoard();
    const getActivePlayerEnemyBoardObj = () => getActivePlayerEnemy().getBoardObj();

    const getResultMessage = () => result;

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      activePlayerEnemy = activePlayerEnemy === players[1] ? players[0] : players[1];

    }
    

    const playRound = (row,col) => { // add the guard(if row col already been hit, then do nothing on the DOM), playRound only care for the logic
      if (
          activePlayerEnemy.getBoardObj().getBoardAtIndex(row, col) === "miss" ||
          activePlayerEnemy.getBoardObj().getBoardAtIndex(row, col).hasBeenHit === true ||
          isOver === 1
        ) {
          return;
        } 

          
          activePlayer.launchAttack(activePlayerEnemy.getBoardObj(),row,col);
          for(let i = 0; i < players.length; i+= 1) {
            if(players[i].getBoardObj().isAllShipSunk()){
              result = `${players[Math.abs(i-1)].getName()} is the winner`
              isOver = 1;
              return; // exit if there is winner already
            }
          }
          switchPlayerTurn();
          if(activePlayer.getName() === "computer"){
              let randomRow = Math.floor(Math.random() * 10);
              let randomCol = Math.floor(Math.random() * 10);
              let checkCell = activePlayerEnemy.getBoardObj().getBoardAtIndex(randomRow, randomCol);
              while ((typeof checkCell === "object" && checkCell.hasBeenHit === true) || checkCell === "miss") { // if the cell is object&&alreadyHit OR cell = 'miss', we generate new randomRow randomCol.
                randomRow = Math.floor(Math.random() * 10);
                randomCol = Math.floor(Math.random() * 10);
                checkCell = activePlayerEnemy.getBoardObj().getBoardAtIndex(randomRow, randomCol);
              }

              
             activePlayer.launchAttack(activePlayerEnemy.getBoardObj(),randomRow,randomCol);
             for(let i = 0; i < players.length; i+= 1) {
              if(players[i].getBoardObj().isAllShipSunk()){
                result = `${players[Math.abs(i-1)].getName()} is the winner`
                isOver = 1;
                switchPlayerTurn();
                return; // exit if there is winner already
              }
              }
              switchPlayerTurn();
          }

      
      }

      const resetGame = () => {
        player1GameBoard.reset();
        computerGameBoard.reset();
        initializeAfterReset();
      }    
    return {
      playRound,
      getActivePlayerName,
      getActivePlayerEnemyName,
      getActivePlayerBoard,
      getActivePlayerEnemyBoard,
      getActivePlayerBoardObj,
      getActivePlayerEnemyBoardObj,
      getResultMessage,
      resetGame
    };
}


function screenController(){
  const gameControllerPlaceholder = gameController();
  const playerContainerDiv = document.querySelector(".player-container");
  const computerContainerDiv = document.querySelector(".computer-container");
  const winnerResult = document.querySelector(".result")
  // even though the active player is going to switch, but every time playRound() the activePlayer will be back to player, so doesnt really matter. in simple terms, after every playRound, activePlayer will be the human1/player1. activePlayer state always player1
  

  const updateScreen = () => {
    playerContainerDiv.textContent = "";
    computerContainerDiv.textContent = "";
    const playerBoard = gameControllerPlaceholder.getActivePlayerBoard(); // take latest condition of the board
    const computerBoard = gameControllerPlaceholder.getActivePlayerEnemyBoard();

    // update playerBoard
    playerBoard.forEach((row,indexI) => {
      row.forEach((cell,indexJ) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.row = indexI;
        cellDiv.dataset.column = indexJ;
        if(typeof cell === "object" && cell.hasBeenHit === false){
          cellDiv.style.backgroundColor = "green";
        } else if ((typeof cell === "object" && cell.hasBeenHit === true)) {
          cellDiv.style.backgroundColor = "red";
        } else if (cell === "miss") {
          cellDiv.style.backgroundColor = "grey";
        }
        playerContainerDiv.appendChild(cellDiv);
      })
    })

    // update computerBoard
    computerBoard.forEach((row,indexI) => {
      row.forEach((cell,indexJ) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.classList.add("button");
        cellButton.dataset.row = indexI;
        cellButton.dataset.column = indexJ;
        if ((typeof cell === "object" && cell.hasBeenHit === true)) {
          cellButton.style.backgroundColor = "red";
        } else if (cell === "miss") {
          cellButton.style.backgroundColor = "grey";
        } 
        computerContainerDiv.appendChild(cellButton);
      })
    })

    // if someone wins, display the winner to the DOM. 
    if(gameControllerPlaceholder.getActivePlayerBoardObj().isAllShipSunk() || gameControllerPlaceholder.getActivePlayerEnemyBoardObj().isAllShipSunk()) {
      showWinner();
    }
  }

  function showWinner(){
    winnerResult.textContent = gameControllerPlaceholder.getResultMessage();
    const resetBtn = document.createElement("button")
    resetBtn.textContent = "reset";
    winnerResult.appendChild(resetBtn);
    resetBtn.addEventListener("click", ()=>{
      gameControllerPlaceholder.resetGame();
      winnerResult.textContent = gameControllerPlaceholder.getResultMessage();
      updateScreen();
      resetBtn.remove();
    });
  }



  function clickHandlerBoard(e){
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if(!selectedRow || !selectedColumn){return} // make sure click the cell not the gaps inbetween

    gameControllerPlaceholder.playRound(selectedRow,selectedColumn);
    updateScreen();
  }

  computerContainerDiv.addEventListener("click",clickHandlerBoard);



  updateScreen();// initial render
}


screenController();

// another idea (every cell push and cellObj , then add isAvailable prop when placing Ship to add contraints cant put surround oneplusCoords)

// gameController need to have, every time ship added, put the ship in some placeholder array, so can check isEveryShipSunk()


