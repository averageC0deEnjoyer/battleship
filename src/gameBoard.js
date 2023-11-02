export default function gameBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      board.push([]);
      for (let j = 0; j < 10; j += 1) {
        board[i].push("");
      }
    }
    // another better way(maybe?), push all cellobj to board, and add isAvailable prop
    const cellObj = (data) => ({
      hasBeenHit: false,
      data, // to save ship object data
    });
  
    const resetBoard = () => {
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
      placeShipComputer(ship, row, col, direction) {
        const shipObj = ship;
        
        switch (direction) {
          case "horizontal":
            for (let i = col; i < col+ship.getLength(); i += 1) {
              if (typeof board[row][i] === "object" || board[row][i] === "x") {
                  return;
                } // to check if i put a ship, if there is some X or already ship, then just exit func
            }
            for (let i = 0; i < ship.getLength(); i += 1) {
              board[row][col + i] = cellObj(shipObj);
            }
            for (let i = row - 1; i <= row + 1; i += 1) {
              for (let j = col - 1; j < col + ship.getLength() + 1; j += 1) {
                if (i < 0 || j < 0 || i > 9 || j > 9) { // if out of bound, just continue the loop
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
                if (typeof board[i][col] === "object" || board[i][col] === "x") {
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
      placeShipPlayer(ship, row, col, direction) {
        const shipObj = ship;
        let startingRowProcessed;
        let startingColProcessed;
        switch (direction) {
          case "horizontal":
            startingRowProcessed = row
            startingColProcessed = col > 9 - (ship.getLength()-1) ? 9 - (ship.getLength()-1) : col
            for (let i = 0; i < ship.getLength(); i += 1) {
              if (typeof board[startingRowProcessed][startingColProcessed + i] === "object" || board[startingRowProcessed][startingColProcessed + i] === "x") {
                  return;
                } // to check if i put a ship, if there is some X or already ship, then just exit func
            }
            for (let i = 0; i < ship.getLength(); i += 1) {
              board[startingRowProcessed][startingColProcessed + i] = cellObj(shipObj);
            }
            for (let i = startingRowProcessed - 1; i <= startingRowProcessed + 1; i += 1) {
              for (let j = startingColProcessed - 1; j < startingColProcessed + ship.getLength() + 1; j += 1) {
                if (i < 0 || j < 0 || i > 9 || j > 9) { // if out of bound, just continue the loop
                  continue;
                }
                if (board[i][j] === "") {
                  board[i][j] = "x";
                }
              }
            }
            break;
          case "vertical":
            startingRowProcessed = row > 9 - (ship.getLength()-1) ? 9 - (ship.getLength()-1) : row
            startingColProcessed = col 
            for (let i = 0; i < ship.getLength(); i += 1) {
                if (typeof board[startingRowProcessed + i][startingColProcessed] === "object" || board[startingRowProcessed + i][startingColProcessed] === "x") {
                    return;
                  } // to check if i put a ship, if there is some X or already ship, then just exit func
              }
            for (let i = 0; i < ship.getLength(); i += 1) {
              board[startingRowProcessed + i][startingColProcessed] = cellObj(shipObj);
            }
            for (let i = startingRowProcessed- 1; i <= startingRowProcessed + ship.getLength(); i += 1) {
              for (let j = startingColProcessed - 1; j <= startingColProcessed + 1; j+=1) {
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
  
      isPlaceShipValidComputer(ship, row, col, direction){
        switch(direction) {
          case "horizontal":
            for (let i = col; i < col+ship.getLength(); i += 1) {
              if (typeof board[row][i] === "object" || board[row][i] === "x") {
                  return false;
                } 
            }
            return true;
  
          case "vertical":
            for (let i = row; i < row+ship.getLength(); i += 1) {
              if (typeof board[i][col] === "object" || board[i][col] === "x") {
                  return false;
                } 
            }
            return true;
  
            default:
              break;
        }
      },
      isPlaceShipValidPlayer(ship, row, col, direction){
        let startingRowProcessed;
        let startingColProcessed;            
        switch(direction) {
          case "horizontal":
            startingRowProcessed = row
            startingColProcessed = col > 9 - (ship.getLength()-1) ? 9 - (ship.getLength()-1) : col
            for (let i = 0; i < ship.getLength(); i += 1) {
              if (typeof board[row][startingColProcessed + i] === "object" || board[row][startingColProcessed + i] === "x") {
                  return false;
                } 
            }
            return true;
          case "vertical":
            startingRowProcessed = row > 9 - (ship.getLength()-1) ? 9 - (ship.getLength()-1) : row
            startingColProcessed = col 
            for (let i = 0; i < ship.getLength(); i += 1) {
              if (typeof board[startingRowProcessed + i][col] === "object" || board[startingRowProcessed + i][col] === "x") {
                  return false;
                } 
            }
            return true;
  
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
      resetBoard
    };
  }
  