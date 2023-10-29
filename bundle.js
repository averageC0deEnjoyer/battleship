/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
  // another better way, push all cellobj to board, and add isAvailable prop
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
    let result;


    const getActivePlayer = () => activePlayer;
    const getActivePlayerName = () => getActivePlayer().getName(); // chain like this to be dynamic (bug 1-2hours)
    const getActivePlayerBoard = () => getActivePlayer().getBoardObj().getBoard();

    const getActivePlayerEnemy = () => activePlayerEnemy;
    const getActivePlayerEnemyName = () => getActivePlayerEnemy().getName();
    const getActivePlayerEnemyBoard = () => getActivePlayerEnemy().getBoardObj().getBoard();

    const getResultMessage = () => result;

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      activePlayerEnemy = activePlayerEnemy === players[1] ? players[0] : players[1];

    }

    const playRound = (row,col) => { // add the guard(if row col already been hit, then do nothing on the DOM), playRound only care for the logic
      if (
          activePlayerEnemy.getBoardObj().getBoardAtIndex(row, col) === "miss" ||
          activePlayerEnemy.getBoardObj().getBoardAtIndex(row, col).hasBeenHit === true
        ) {
          return;
        } 
          activePlayer.launchAttack(activePlayerEnemy.getBoardObj(),row,col);
          for(let i = 0; i < players.length; i+= 1) {
            if(players[i].getBoardObj().isAllShipSunk()){
              result = `${players[Math.abs(i-1)].getName()} is the winner`
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
                return; // exit if there is winner already
              }
              }
            switchPlayerTurn();
          }
      }
    return {
      playRound,
      getActivePlayerName,
      getActivePlayerEnemyName,
      getActivePlayerBoard,
      getActivePlayerEnemyBoard,
      getResultMessage
    };
}

const gameControllerPlaceholder = gameController()

console.log(gameControllerPlaceholder.getActivePlayerName())
console.log(gameControllerPlaceholder.getActivePlayerBoard())


console.log(gameControllerPlaceholder.getResultMessage())
gameControllerPlaceholder.playRound(1,1)
gameControllerPlaceholder.playRound(1,2)
gameControllerPlaceholder.playRound(1,3)
gameControllerPlaceholder.playRound(1,4)
gameControllerPlaceholder.playRound(4,4)
gameControllerPlaceholder.playRound(5,4)
gameControllerPlaceholder.playRound(6,4)
gameControllerPlaceholder.playRound(6,6)
gameControllerPlaceholder.playRound(6,7)
gameControllerPlaceholder.playRound(8,8)
console.log(gameControllerPlaceholder.getResultMessage())


console.log(gameControllerPlaceholder.getActivePlayerName())
console.log(gameControllerPlaceholder.getActivePlayerBoard())

console.log(gameControllerPlaceholder.getActivePlayerEnemyName())
console.log(gameControllerPlaceholder.getActivePlayerEnemyBoard())

// another idea (every cell push and cellObj , then add isAvailable prop when placing Ship to add contraints cant put surround oneplusCoords)

// gameController need to have, every time ship added, put the ship in some placeholder array, so can check isEveryShipSunk()

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMEJBQTBCO0FBQ3REO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSwwQkFBMEIsc0JBQXNCO0FBQ2hEO0FBQ0E7QUFDQSxnQ0FBZ0MsY0FBYztBQUM5QyxrQ0FBa0MsZ0NBQWdDO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsMEJBQTBCLHNCQUFzQjtBQUNoRDtBQUNBO0FBQ0EsZ0NBQWdDLDZCQUE2QjtBQUM3RCxrQ0FBa0MsY0FBYztBQUNoRDtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNCQUFzQixRQUFRO0FBQzlCLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQkFBc0I7QUFDdEIsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsbUVBQW1FO0FBQ25FOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9CQUFvQjtBQUM3QztBQUNBLDBCQUEwQixrQ0FBa0M7QUFDNUQsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUhBQWlIO0FBQ2pIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBLDRCQUE0QixrQ0FBa0M7QUFDOUQsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNoaXBGYWN0b3J5KGxlbmd0aCkge1xuICBsZXQgc2hpcEhpdCA9IDA7XG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9LFxuICAgIGhpdCgpIHtcbiAgICAgIHNoaXBIaXQgKz0gMTtcbiAgICAgIHJldHVybiBzaGlwSGl0O1xuICAgIH0sXG4gICAgZ2V0IGhlYWx0aCgpIHtcbiAgICAgIHJldHVybiBsZW5ndGggLSBzaGlwSGl0O1xuICAgIH0sXG4gICAgaXNTdW5rKCkge1xuICAgICAgaWYgKHNoaXBIaXQgPT09IGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBnYW1lQm9hcmQoKSB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGJvYXJkLnB1c2goW10pO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgYm9hcmRbaV0ucHVzaChcIlwiKTtcbiAgICB9XG4gIH1cbiAgLy8gYW5vdGhlciBiZXR0ZXIgd2F5LCBwdXNoIGFsbCBjZWxsb2JqIHRvIGJvYXJkLCBhbmQgYWRkIGlzQXZhaWxhYmxlIHByb3BcbiAgY29uc3QgY2VsbE9iaiA9IChkYXRhKSA9PiAoe1xuICAgIGhhc0JlZW5IaXQ6IGZhbHNlLFxuICAgIGRhdGEsIC8vIHRvIHNhdmUgc2hpcCBvYmplY3QgZGF0YVxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkQXRJbmRleChyb3csIGNvbCkge1xuICAgICAgcmV0dXJuIGJvYXJkW3Jvd11bY29sXTtcbiAgICB9LFxuICAgIGdldEJvYXJkKCkge1xuICAgICAgcmV0dXJuIGJvYXJkO1xuICAgIH0sXG4gICAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBkaXJlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNoaXBPYmogPSBzaGlwO1xuICAgICAgXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOlxuICAgICAgICAgIGZvciAobGV0IGkgPSBjb2w7IGkgPCBjb2wrc2hpcC5nZXRMZW5ndGgoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sXSA9PT0gXCJvYmplY3RcIiB8fCBib2FyZFtyb3ddW2NvbF0gPT09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IGNlbGxPYmooc2hpcE9iaik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGkgPSByb3cgLSAxOyBpIDw9IHJvdyArIDE7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGNvbCAtIDE7IGogPCBjb2wgKyBzaGlwLmdldExlbmd0aCgpICsgMTsgaiArPSAxKSB7XG4gICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gXCJ4XCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPCByb3crc2hpcC5nZXRMZW5ndGgoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2xdID09PSBcIm9iamVjdFwiIHx8IGJvYXJkW3Jvd11bY29sXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gY2VsbE9iaihzaGlwT2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHJvdyAtIDE7IGkgPD0gcm93ICsgc2hpcC5nZXRMZW5ndGgoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gY29sIC0gMTsgaiA8PSBjb2wgKyAxOyBqKz0xKSB7XG4gICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gXCJ4XCI7IC8vIHJhdGhlciB0aGFuIHVzaW5nIHgsIGFub3RoZXIgYmV0dGVyIGlkZWEgaXMgc2V0dGluZyBldmVyeSBjZWxsIHdpdGggYW4gb2JqZWN0LCBhbmQgYXNzaWduIHggdG8gJ2RhdGEnIHByb3BlcnR5LlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuICAgICAgLy8gbGF0ZXIgb24sIGlmIG1pc3Mgb3IgaGFzQmVlbkhpdCwgY2FudCBiZSBhdHRhY2tlZCBhZ2Fpbi5cbiAgICAgIGlmIChib2FyZFtyb3ddW2NvbF0uaGFzQmVlbkhpdCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIGlmIGFscmVhZHkgYmVlbiBoaXQgMSB0aW1lcywgZG8gbm90aGluZy5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGJvYXJkW3Jvd11bY29sXS5kYXRhID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIGJvYXJkW3Jvd11bY29sXS5oYXNCZWVuSGl0ID09PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIGJvYXJkW3Jvd11bY29sXS5kYXRhLmhpdCgpO1xuICAgICAgICBib2FyZFtyb3ddW2NvbF0uaGFzQmVlbkhpdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2FyZFtyb3ddW2NvbF0gPSBcIm1pc3NcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzQWxsU2hpcFN1bmsoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgICAgaWYgKGJvYXJkW2ldW2pdLmhhc0JlZW5IaXQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIFBsYXllcihuYW1lLCBib2FyZCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0sXG4gICAgICBnZXRCb2FyZE9iaigpIHtcbiAgICAgICAgcmV0dXJuIGJvYXJkOyAvLyB0aGlzIHdpbGwgcmV0dXJuIG9iamVjdFxuICAgICAgfSxcbiAgICAgIGxhdW5jaEF0dGFjayhlbmVteUdhbWVCb2FyZCwgcm93LCBjb2wpIHtcbiAgICAgICAgLy8gaWYgKFxuICAgICAgICAvLyAgIGVuZW15R2FtZUJvYXJkLmdldEJvYXJkQXRJbmRleChyb3csIGNvbCkgPT09IFwibWlzc1wiIHx8XG4gICAgICAgIC8vICAgZW5lbXlHYW1lQm9hcmQuZ2V0Qm9hcmRBdEluZGV4KHJvdywgY29sKS5oYXNCZWVuSGl0ID09PSB0cnVlXG4gICAgICAgIC8vICkge1xuICAgICAgICAvLyAgIHJldHVybjsgLy8gdGhpcyBpZiBzaG91bGQgYmUgcHV0IGluIHRoZSBjY29udHJvbGxlciBtYXliZShjb250cm9sbGVyIGhhbmRsZSBsb2dpYy9mbG93KSwgc28gaWYgcm93IGNvbCBoYXZlIHNvbWV0aGlnLCB0aGUgcGxheVJvdW5kIGZ1bmN0aW9uIG5vdCBleGVjdXRlIHRoZSBvdGhlciBmdW5jXG4gICAgICAgIC8vIH0gLy8gaWYgYWxyZWFkeSBtaXNzQXR0YWNrIGFuZCBhbHJlYWR5IGJlZW4gaGl0LCBkbyBub3RoaW5nLlxuICAgICAgICBlbmVteUdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sKTtcbiAgICAgIH0sXG4gICAgfTtcbiAgXG59XG5cbmZ1bmN0aW9uIGdhbWVDb250cm9sbGVyKCl7XG4gICAgXG4gICAgLy8gaW5pdGlhbGl6ZSBnYW1lYm9hcmRcbiAgICBjb25zdCBwbGF5ZXIxR2FtZUJvYXJkID0gZ2FtZUJvYXJkKCk7IFxuICAgIGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbiAgICAvLyBwdXQgc2hpcCBvbiB0aGUgcGxheWVyIGdhbWVib2FyZFxuICAgIGNvbnN0IHNoaXA0cGxheWVyID0gc2hpcEZhY3RvcnkoNCk7XG4gICAgY29uc3Qgc2hpcDNwbGF5ZXIgPSBzaGlwRmFjdG9yeSgzKTtcbiAgICBjb25zdCBzaGlwMnBsYXllciA9IHNoaXBGYWN0b3J5KDIpO1xuICAgIGNvbnN0IHNoaXAxcGxheWVyID0gc2hpcEZhY3RvcnkoMSk7XG5cbiAgICBwbGF5ZXIxR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwNHBsYXllciwgMiwgMiwgXCJob3Jpem9udGFsXCIpO1xuICAgIHBsYXllcjFHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAzcGxheWVyLCA0LCA0LCBcInZlcnRpY2FsXCIpO1xuICAgIHBsYXllcjFHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAycGxheWVyLCA2LCA2LCBcImhvcml6b250YWxcIik7XG4gICAgcGxheWVyMUdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcDFwbGF5ZXIsIDgsIDgsIFwiaG9yaXpvbnRhbFwiKTtcblxuICAgIC8vIHB1dCBzaGlwIG9uIHRoZSBjb21wdXRlciBnYW1lYm9hcmRcblxuICAgIGNvbnN0IHNoaXA0Y29tcHV0ZXIgPSBzaGlwRmFjdG9yeSg0KTtcbiAgICBjb25zdCBzaGlwM2NvbXB1dGVyID0gc2hpcEZhY3RvcnkoMyk7XG4gICAgY29uc3Qgc2hpcDJjb21wdXRlciA9IHNoaXBGYWN0b3J5KDIpO1xuICAgIGNvbnN0IHNoaXAxY29tcHV0ZXIgPSBzaGlwRmFjdG9yeSgxKTtcbiAgICBjb21wdXRlckdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcDRjb21wdXRlciwgMSwgMSwgXCJob3Jpem9udGFsXCIpO1xuICAgIGNvbXB1dGVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwM2NvbXB1dGVyLCA0LCA0LCBcInZlcnRpY2FsXCIpO1xuICAgIGNvbXB1dGVyR2FtZUJvYXJkLnBsYWNlU2hpcChzaGlwMmNvbXB1dGVyLCA2LCA2LCBcImhvcml6b250YWxcIik7XG4gICAgY29tcHV0ZXJHYW1lQm9hcmQucGxhY2VTaGlwKHNoaXAxY29tcHV0ZXIsIDgsIDgsIFwiaG9yaXpvbnRhbFwiKTtcblxuICAgIC8vIGluaXRpYWxpemUgcGxheWVyIFxuICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoXCJwbGF5ZXIxXCIsIHBsYXllcjFHYW1lQm9hcmQpO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXJcIiwgY29tcHV0ZXJHYW1lQm9hcmQpO1xuICAgIGNvbnN0IHBsYXllcnMgPSBbcGxheWVyMSwgY29tcHV0ZXJdO1xuXG4gICAgbGV0IGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gICAgbGV0IGFjdGl2ZVBsYXllckVuZW15ID0gcGxheWVyc1sxXTtcbiAgICBsZXQgcmVzdWx0O1xuXG5cbiAgICBjb25zdCBnZXRBY3RpdmVQbGF5ZXIgPSAoKSA9PiBhY3RpdmVQbGF5ZXI7XG4gICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyTmFtZSA9ICgpID0+IGdldEFjdGl2ZVBsYXllcigpLmdldE5hbWUoKTsgLy8gY2hhaW4gbGlrZSB0aGlzIHRvIGJlIGR5bmFtaWMgKGJ1ZyAxLTJob3VycylcbiAgICBjb25zdCBnZXRBY3RpdmVQbGF5ZXJCb2FyZCA9ICgpID0+IGdldEFjdGl2ZVBsYXllcigpLmdldEJvYXJkT2JqKCkuZ2V0Qm9hcmQoKTtcblxuICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckVuZW15ID0gKCkgPT4gYWN0aXZlUGxheWVyRW5lbXk7XG4gICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyRW5lbXlOYW1lID0gKCkgPT4gZ2V0QWN0aXZlUGxheWVyRW5lbXkoKS5nZXROYW1lKCk7XG4gICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyRW5lbXlCb2FyZCA9ICgpID0+IGdldEFjdGl2ZVBsYXllckVuZW15KCkuZ2V0Qm9hcmRPYmooKS5nZXRCb2FyZCgpO1xuXG4gICAgY29uc3QgZ2V0UmVzdWx0TWVzc2FnZSA9ICgpID0+IHJlc3VsdDtcblxuICAgIGNvbnN0IHN3aXRjaFBsYXllclR1cm4gPSAoKSA9PiB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0gPyBwbGF5ZXJzWzFdIDogcGxheWVyc1swXTtcbiAgICAgIGFjdGl2ZVBsYXllckVuZW15ID0gYWN0aXZlUGxheWVyRW5lbXkgPT09IHBsYXllcnNbMV0gPyBwbGF5ZXJzWzBdIDogcGxheWVyc1sxXTtcblxuICAgIH1cblxuICAgIGNvbnN0IHBsYXlSb3VuZCA9IChyb3csY29sKSA9PiB7IC8vIGFkZCB0aGUgZ3VhcmQoaWYgcm93IGNvbCBhbHJlYWR5IGJlZW4gaGl0LCB0aGVuIGRvIG5vdGhpbmcgb24gdGhlIERPTSksIHBsYXlSb3VuZCBvbmx5IGNhcmUgZm9yIHRoZSBsb2dpY1xuICAgICAgaWYgKFxuICAgICAgICAgIGFjdGl2ZVBsYXllckVuZW15LmdldEJvYXJkT2JqKCkuZ2V0Qm9hcmRBdEluZGV4KHJvdywgY29sKSA9PT0gXCJtaXNzXCIgfHxcbiAgICAgICAgICBhY3RpdmVQbGF5ZXJFbmVteS5nZXRCb2FyZE9iaigpLmdldEJvYXJkQXRJbmRleChyb3csIGNvbCkuaGFzQmVlbkhpdCA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG4gICAgICAgICAgYWN0aXZlUGxheWVyLmxhdW5jaEF0dGFjayhhY3RpdmVQbGF5ZXJFbmVteS5nZXRCb2FyZE9iaigpLHJvdyxjb2wpO1xuICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5ZXJzLmxlbmd0aDsgaSs9IDEpIHtcbiAgICAgICAgICAgIGlmKHBsYXllcnNbaV0uZ2V0Qm9hcmRPYmooKS5pc0FsbFNoaXBTdW5rKCkpe1xuICAgICAgICAgICAgICByZXN1bHQgPSBgJHtwbGF5ZXJzW01hdGguYWJzKGktMSldLmdldE5hbWUoKX0gaXMgdGhlIHdpbm5lcmBcbiAgICAgICAgICAgICAgcmV0dXJuOyAvLyBleGl0IGlmIHRoZXJlIGlzIHdpbm5lciBhbHJlYWR5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaFBsYXllclR1cm4oKTtcbiAgICAgICAgICBpZihhY3RpdmVQbGF5ZXIuZ2V0TmFtZSgpID09PSBcImNvbXB1dGVyXCIpe1xuICAgICAgICAgICAgICBsZXQgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICBsZXQgcmFuZG9tQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICBsZXQgY2hlY2tDZWxsID0gYWN0aXZlUGxheWVyRW5lbXkuZ2V0Qm9hcmRPYmooKS5nZXRCb2FyZEF0SW5kZXgocmFuZG9tUm93LCByYW5kb21Db2wpO1xuICAgICAgICAgICAgICB3aGlsZSAoKHR5cGVvZiBjaGVja0NlbGwgPT09IFwib2JqZWN0XCIgJiYgY2hlY2tDZWxsLmhhc0JlZW5IaXQgPT09IHRydWUpIHx8IGNoZWNrQ2VsbCA9PT0gXCJtaXNzXCIpIHsgLy8gaWYgdGhlIGNlbGwgaXMgb2JqZWN0JiZhbHJlYWR5SGl0IE9SIGNlbGwgPSAnbWlzcycsIHdlIGdlbmVyYXRlIG5ldyByYW5kb21Sb3cgcmFuZG9tQ29sLlxuICAgICAgICAgICAgICAgIHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgY2hlY2tDZWxsID0gYWN0aXZlUGxheWVyRW5lbXkuZ2V0Qm9hcmRPYmooKS5nZXRCb2FyZEF0SW5kZXgocmFuZG9tUm93LCByYW5kb21Db2wpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICBhY3RpdmVQbGF5ZXIubGF1bmNoQXR0YWNrKGFjdGl2ZVBsYXllckVuZW15LmdldEJvYXJkT2JqKCkscmFuZG9tUm93LHJhbmRvbUNvbCk7XG4gICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXllcnMubGVuZ3RoOyBpKz0gMSkge1xuICAgICAgICAgICAgICBpZihwbGF5ZXJzW2ldLmdldEJvYXJkT2JqKCkuaXNBbGxTaGlwU3VuaygpKXtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBgJHtwbGF5ZXJzW01hdGguYWJzKGktMSldLmdldE5hbWUoKX0gaXMgdGhlIHdpbm5lcmBcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgdGhlcmUgaXMgd2lubmVyIGFscmVhZHlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2hQbGF5ZXJUdXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIHJldHVybiB7XG4gICAgICBwbGF5Um91bmQsXG4gICAgICBnZXRBY3RpdmVQbGF5ZXJOYW1lLFxuICAgICAgZ2V0QWN0aXZlUGxheWVyRW5lbXlOYW1lLFxuICAgICAgZ2V0QWN0aXZlUGxheWVyQm9hcmQsXG4gICAgICBnZXRBY3RpdmVQbGF5ZXJFbmVteUJvYXJkLFxuICAgICAgZ2V0UmVzdWx0TWVzc2FnZVxuICAgIH07XG59XG5cbmNvbnN0IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIgPSBnYW1lQ29udHJvbGxlcigpXG5cbmNvbnNvbGUubG9nKGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QWN0aXZlUGxheWVyTmFtZSgpKVxuY29uc29sZS5sb2coZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRBY3RpdmVQbGF5ZXJCb2FyZCgpKVxuXG5cbmNvbnNvbGUubG9nKGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0UmVzdWx0TWVzc2FnZSgpKVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoMSwxKVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoMSwyKVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoMSwzKVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoMSw0KVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoNCw0KVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoNSw0KVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoNiw0KVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoNiw2KVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoNiw3KVxuZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5wbGF5Um91bmQoOCw4KVxuY29uc29sZS5sb2coZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRSZXN1bHRNZXNzYWdlKCkpXG5cblxuY29uc29sZS5sb2coZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRBY3RpdmVQbGF5ZXJOYW1lKCkpXG5jb25zb2xlLmxvZyhnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmdldEFjdGl2ZVBsYXllckJvYXJkKCkpXG5cbmNvbnNvbGUubG9nKGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QWN0aXZlUGxheWVyRW5lbXlOYW1lKCkpXG5jb25zb2xlLmxvZyhnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmdldEFjdGl2ZVBsYXllckVuZW15Qm9hcmQoKSlcblxuLy8gYW5vdGhlciBpZGVhIChldmVyeSBjZWxsIHB1c2ggYW5kIGNlbGxPYmogLCB0aGVuIGFkZCBpc0F2YWlsYWJsZSBwcm9wIHdoZW4gcGxhY2luZyBTaGlwIHRvIGFkZCBjb250cmFpbnRzIGNhbnQgcHV0IHN1cnJvdW5kIG9uZXBsdXNDb29yZHMpXG5cbi8vIGdhbWVDb250cm9sbGVyIG5lZWQgdG8gaGF2ZSwgZXZlcnkgdGltZSBzaGlwIGFkZGVkLCBwdXQgdGhlIHNoaXAgaW4gc29tZSBwbGFjZWhvbGRlciBhcnJheSwgc28gY2FuIGNoZWNrIGlzRXZlcnlTaGlwU3VuaygpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=