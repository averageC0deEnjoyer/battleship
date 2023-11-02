/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameBoard)
/* harmony export */ });
function gameBoard() {
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
  

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameController)
/* harmony export */ });
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerFactory */ "./src/playerFactory.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");




function gameController(){    

    // initialize gameboard
    const player1GameBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"])(); 
    const computerGameBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    
    // make player ship
    const ship4player = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship4", 4);
     const ship3player = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship3", 3);
     const ship2player = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship2", 2);
     const ship1player = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship1", 1);
     const arrayShipPlayer = [ship4player,ship3player,ship2player,ship1player]
  
    // make computer ship
    const ship4computer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship4Comp",4);
    const ship3computer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship3Comp",3);
    const ship2computer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship2Comp",2);
    const ship1computer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_2__["default"])("ship1Comp",1);
  
    const arrayShipPlayerEnemy = [ship4computer, ship3computer, ship2computer, ship1computer];
    
    // place computer ship randomly
    function placeComputerShipRandomly(){
      while(arrayShipPlayerEnemy.length !== 0){
        const currentShip = arrayShipPlayerEnemy.shift();
        let randomRow = Math.floor(Math.random() * (10 - (currentShip.getLength() - 1))) < 0 ? 0 : Math.floor(Math.random() * (10 - (currentShip.getLength() - 1)))
        let randomCol = Math.floor(Math.random() * (10 - (currentShip.getLength() - 1))) < 0 ? 0 : Math.floor(Math.random() * (10 - (currentShip.getLength() - 1)))
        let direction = Math.floor(Math.random() * 2) === 1 ? "vertical" : "horizontal";
        let isValid = computerGameBoard.isPlaceShipValidComputer(currentShip,randomRow, randomCol, direction)
          while(!isValid){
            randomRow = Math.floor(Math.random() * (10 - (currentShip.getLength() - 1))) < 0 ? 0 : Math.floor(Math.random() * (10 - (currentShip.getLength() - 1)))
            randomCol = Math.floor(Math.random() * (10 - (currentShip.getLength() - 1))) < 0 ? 0 : Math.floor(Math.random() * (10 - (currentShip.getLength() - 1)))
            direction = Math.floor(Math.random() * 2) === 1 ? "vertical" : "horizontal";
            isValid = computerGameBoard.isPlaceShipValidComputer(currentShip,randomRow, randomCol, direction);
          }
          computerGameBoard.placeShipComputer(currentShip, randomRow, randomCol, direction)
        }  
    }
  
    placeComputerShipRandomly()
    
    // initialize player 
    const player1 = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])("player1", player1GameBoard);
    const computer = (0,_playerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])("computer", computerGameBoard);
    const players = [player1, computer];
    
    let activePlayer = players[0];
    let activePlayerEnemy = players[1];
    let result;
    let isOver = 0; 
    let isRoundStart = 0; // if player hasnt place all the ship, then enemy board wont show up
    
    const getArrayShipPlayerLatestCondition = () => arrayShipPlayer
    
    const isRoundStartCheck = () => {
      if(arrayShipPlayer.length === 0){
        isRoundStart = 1
        return isRoundStart;
      }};
    
    function initializeAfterReset(){
        activePlayer = players[0];
        activePlayerEnemy = players[1];
        result = "";
        isOver = 0;
        isRoundStart = 0
        
        ship4player.resetShipState()
        ship3player.resetShipState()
        ship2player.resetShipState()
        ship1player.resetShipState()
        arrayShipPlayer.push(ship4player)
        arrayShipPlayer.push(ship3player)
        arrayShipPlayer.push(ship2player)
        arrayShipPlayer.push(ship1player)
        
        ship4computer.resetShipState()
        ship3computer.resetShipState()
        ship2computer.resetShipState()
        ship1computer.resetShipState()
        arrayShipPlayerEnemy.push(ship4computer)
        arrayShipPlayerEnemy.push(ship3computer)
        arrayShipPlayerEnemy.push(ship2computer)
        arrayShipPlayerEnemy.push(ship1computer)
        placeComputerShipRandomly()
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
  
        const resetGameController = () => {
          player1GameBoard.resetBoard();
          computerGameBoard.resetBoard();
          initializeAfterReset();
        }    
  
        const isGameOver = () => isOver
      return {
        playRound,
        getActivePlayerName,
        getActivePlayerEnemyName,
        getActivePlayerBoard,
        getActivePlayerEnemyBoard,
        getActivePlayerBoardObj,
        getActivePlayerEnemyBoardObj,
        getResultMessage,
        getArrayShipPlayerLatestCondition,
        resetGameController,
        isRoundStartCheck,
        isGameOver
      };
  }
  

/***/ }),

/***/ "./src/playerFactory.js":
/*!******************************!*\
  !*** ./src/playerFactory.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
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


/***/ }),

/***/ "./src/screenController.js":
/*!*********************************!*\
  !*** ./src/screenController.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ screenController)
/* harmony export */ });
/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ "./src/gameController.js");


function screenController(){
    const gameControllerPlaceholder = (0,_gameController__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const playerContainerDiv = document.querySelector(".player-container");
    const computerContainerDiv = document.querySelector(".computer-container");
    const winnerResult = document.querySelector(".result");
    const rotateBtn = document.querySelector(".rotate");
    const shipContainers = document.querySelectorAll(".ship-container");
    let isRotate = 0;
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
          cellDiv.classList.add("cell-player");
          cellDiv.dataset.row = indexI;
          cellDiv.dataset.column = indexJ;
          if(typeof cell === "object" && cell.hasBeenHit === false){
            cellDiv.style.backgroundColor = "green";
          } else if ((typeof cell === "object" && cell.hasBeenHit === true)) {
            cellDiv.style.backgroundColor = "red";
          } else if (cell === "miss") {
            cellDiv.style.backgroundColor = "grey";
          }
          cellDiv.addEventListener("dragover", e =>{
            e.preventDefault();
           });
          cellDiv.addEventListener("drop", (e)=>{
            e.preventDefault();
            dropShip(e);})
          playerContainerDiv.appendChild(cellDiv);
        })
      })
      
  
  
      // update computerBoard if player already put all the ship
      if(gameControllerPlaceholder.isRoundStartCheck() === 1){
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
            } else if((typeof cell === "object" && cell.hasBeenHit === false)) {
              cellButton.style.backgroundColor = "yellow";
            }
            computerContainerDiv.appendChild(cellButton);
          })
        })  
      }
  
     
  
    function showWinner(){
      winnerResult.textContent = gameControllerPlaceholder.getResultMessage();
      const resetBtn = document.createElement("button")
      resetBtn.textContent = "resetBoard";
      winnerResult.appendChild(resetBtn);
      resetBtn.addEventListener("click", ()=>{
        gameControllerPlaceholder.resetGameController();
        winnerResult.textContent = gameControllerPlaceholder.getResultMessage();
        updateScreen();
        shipContainers.forEach(item => item.setAttribute("draggable","true"))
        resetBtn.remove();
      });
    }
  
     // if someone wins, display the winner to the DOM. 
     if(gameControllerPlaceholder.isGameOver() === 1) {
      showWinner();
    }
    }
  
    function clickHandlerBoard(e){ // for attacking computerBoard
      const selectedRow = e.target.dataset.row;
      const selectedColumn = e.target.dataset.column;
  
      if(!selectedRow || !selectedColumn){return} // make sure click the cell not the gaps inbetween
  
      gameControllerPlaceholder.playRound(selectedRow,selectedColumn);
      updateScreen();
    }
  
    computerContainerDiv.addEventListener("click",clickHandlerBoard);
  
  
    function rotateShip(){
      shipContainers.forEach(item => {
        item.classList.toggle("rotate");
      })
      if(isRotate === 0) {isRotate = 1}  else {isRotate = 0} ;
    }
  
  
    rotateBtn.addEventListener("click", rotateShip)
  
  
    updateScreen();// initial render
    
  
    function dragStarter(element){
      element.addEventListener("dragstart", event=>{
        event.dataTransfer.setData("text/plain", event.target.id);
      });
    }
    
    // initialize drag item
    shipContainers.forEach(item => {
      dragStarter(item);
    })
  
    const cellsDiv = document.querySelectorAll(".cell-player")
  
    cellsDiv.forEach(cell=>{
      cell.addEventListener("dragover", e =>{
        e.preventDefault();
       })
    })
  
    cellsDiv.forEach(cell=>{
      cell.addEventListener("drop", (e)=>{
        e.preventDefault();
        // console.log(e.dataTransfer.getData("text/plain"))    
        // const coordX = parseInt(e.target.dataset.row); // DONT FORGET PARSEINT, EVERY INT OR NUMBER HAVE TO BE PARSED (ERROR 1-2 HOURS)
        // const coordY = parseInt(e.target.dataset.column);
        dropShip(e);
        updateScreen();
     })
    })
  
    // when drop ship, run placeShipComputer method and also check if arrayShip empty? if yes then game start
    function dropShip(e){
      const shipType = e.dataTransfer.getData("text/plain");
      const coordinateX = parseInt(e.target.dataset.row);
      const coordinateY = parseInt(e.target.dataset.column);
          for(let i = 0 ; i < gameControllerPlaceholder.getArrayShipPlayerLatestCondition().length; i+=1){
            if (gameControllerPlaceholder.getArrayShipPlayerLatestCondition()[i].getShipType() === shipType && gameControllerPlaceholder.getActivePlayerBoardObj().isPlaceShipValidPlayer(gameControllerPlaceholder.getArrayShipPlayerLatestCondition()[i], coordinateX, coordinateY, isRotate === 0 ? "horizontal" : "vertical" )){
              document.querySelector(`#${shipType}`).setAttribute("draggable","false")
              const splicedItem = gameControllerPlaceholder.getArrayShipPlayerLatestCondition().splice(i,1)[0]; // use [0] cause in this case, thes splice return array
              gameControllerPlaceholder.getActivePlayerBoardObj().placeShipPlayer(splicedItem,coordinateX,coordinateY,isRotate == 0 ? "horizontal" : "vertical");
              updateScreen();
            }
          }
      }
    }
  

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shipFactory)
/* harmony export */ });
function shipFactory(type, length) {
  let shipHit = 0;
  const resetShipState = () => {
    shipHit = 0;
  };
  const getShipType = () => type;
  const getLength = () => length;
  const hit = () => {
    shipHit += 1;
  };
  const isSunk = () => {
    if (shipHit === length) {
      return true;
    }
    return false;
  };
  return {
    resetShipState,
    getShipType,
    getLength,
    hit,
    isSunk,
    get health() {
      return this.length - this.shipHit;
    },
  };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _screenController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screenController */ "./src/screenController.js");
// import "./style.css" // after finish everything, dont forget to delete scriptTag and linkTag ( this will make jest error, try research about how to import css from src so it can move to dist)
// how to make style.css from src to dist after webpacking? also, liveserver still needed cause if i edit some template.html while npm --watch, then it wont change the html, i need to reopen. so the ideal IMO liveServer in SRC, after final(htmlcss) then npxwebpack




(0,_screenController__WEBPACK_IMPORTED_MODULE_0__["default"])();

// another idea (every cell push and cellObj , then add isAvailable prop when placing Ship to add contraints cant put surround oneplusCoords)

// another things to do, make the computer smart

// later on can polish the design , refactor to make code cleaner(maybe?)

// things that always have to be considered , when creating something, just do the model first (can be played by using console.log), DOM only get data from the model, no handling logic in DOM,
// so edge case handled in the model.

// can separate each FF to each file 
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZjtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQixRQUFRO0FBQzlCLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQsb0NBQW9DLGdDQUFnQztBQUNwRSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0Esa0NBQWtDLDZCQUE2QjtBQUMvRCxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0EsbURBQW1ELCtCQUErQjtBQUNsRixxREFBcUQsaURBQWlEO0FBQ3RHLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0Esa0RBQWtELDhDQUE4QztBQUNoRyxxREFBcUQsK0JBQStCO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwQkFBMEI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQywwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5TXFDO0FBQ0Q7QUFDRzs7QUFFeEI7O0FBRWY7QUFDQSw2QkFBNkIsc0RBQVM7QUFDdEMsOEJBQThCLHNEQUFTO0FBQ3ZDO0FBQ0E7QUFDQSx3QkFBd0Isd0RBQVc7QUFDbkMseUJBQXlCLHdEQUFXO0FBQ3BDLHlCQUF5Qix3REFBVztBQUNwQyx5QkFBeUIsd0RBQVc7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFXO0FBQ3JDLDBCQUEwQix3REFBVztBQUNyQywwQkFBMEIsd0RBQVc7QUFDckMsMEJBQTBCLHdEQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwwREFBTTtBQUMxQixxQkFBcUIsMERBQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlEO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUhBQW1IO0FBQ25IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG9CQUFvQjtBQUNsRDtBQUNBLDhCQUE4QixrQ0FBa0M7QUFDaEU7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsTGU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQkFBc0I7QUFDdEIsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDYjZDOztBQUU5QjtBQUNmLHNDQUFzQywyREFBYztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFFBQVE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCwwQkFBMEIsZUFBZSxNQUFNO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBFQUEwRTtBQUNwRztBQUNBLHlDQUF5QyxTQUFTO0FBQ2xELGdIQUFnSDtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoS2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7VUMxQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7O0FBRWtEOzs7QUFHbEQsNkRBQWdCOztBQUVoQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JlZW5Db250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUJvYXJkKCkge1xuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBib2FyZC5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBib2FyZFtpXS5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhbm90aGVyIGJldHRlciB3YXkobWF5YmU/KSwgcHVzaCBhbGwgY2VsbG9iaiB0byBib2FyZCwgYW5kIGFkZCBpc0F2YWlsYWJsZSBwcm9wXG4gICAgY29uc3QgY2VsbE9iaiA9IChkYXRhKSA9PiAoe1xuICAgICAgaGFzQmVlbkhpdDogZmFsc2UsXG4gICAgICBkYXRhLCAvLyB0byBzYXZlIHNoaXAgb2JqZWN0IGRhdGFcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgICBib2FyZFtpXVtqXSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHJldHVybiB7XG4gICAgICBnZXRCb2FyZEF0SW5kZXgocm93LCBjb2wpIHtcbiAgICAgICAgcmV0dXJuIGJvYXJkW3Jvd11bY29sXTtcbiAgICAgIH0sXG4gICAgICBnZXRCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIGJvYXJkO1xuICAgICAgfSxcbiAgICAgIHBsYWNlU2hpcENvbXB1dGVyKHNoaXAsIHJvdywgY29sLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2hpcE9iaiA9IHNoaXA7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sK3NoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11baV0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbcm93XVtpXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IGNlbGxPYmooc2hpcE9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcm93IC0gMTsgaSA8PSByb3cgKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGNvbCAtIDE7IGogPCBjb2wgKyBzaGlwLmdldExlbmd0aCgpICsgMTsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAwIHx8IGogPCAwIHx8IGkgPiA5IHx8IGogPiA5KSB7IC8vIGlmIG91dCBvZiBib3VuZCwganVzdCBjb250aW51ZSB0aGUgbG9vcFxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBcInhcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdytzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW2ldW2NvbF0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbaV1bY29sXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfSAvLyB0byBjaGVjayBpZiBpIHB1dCBhIHNoaXAsIGlmIHRoZXJlIGlzIHNvbWUgWCBvciBhbHJlYWR5IHNoaXAsIHRoZW4ganVzdCBleGl0IGZ1bmNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IGNlbGxPYmooc2hpcE9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcm93IC0gMTsgaSA8PSByb3cgKyBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGNvbCAtIDE7IGogPD0gY29sICsgMTsgais9MSkge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgMCB8fCBqIDwgMCB8fCBpID4gOSB8fCBqID4gOSkge1xuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBcInhcIjsgLy8gcmF0aGVyIHRoYW4gdXNpbmcgeCwgYW5vdGhlciBiZXR0ZXIgaWRlYSBpcyBzZXR0aW5nIGV2ZXJ5IGNlbGwgd2l0aCBhbiBvYmplY3QsIGFuZCBhc3NpZ24geCB0byAnZGF0YScgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwbGFjZVNoaXBQbGF5ZXIoc2hpcCwgcm93LCBjb2wsIGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBzaGlwT2JqID0gc2hpcDtcbiAgICAgICAgbGV0IHN0YXJ0aW5nUm93UHJvY2Vzc2VkO1xuICAgICAgICBsZXQgc3RhcnRpbmdDb2xQcm9jZXNzZWQ7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSBcImhvcml6b250YWxcIjpcbiAgICAgICAgICAgIHN0YXJ0aW5nUm93UHJvY2Vzc2VkID0gcm93XG4gICAgICAgICAgICBzdGFydGluZ0NvbFByb2Nlc3NlZCA9IGNvbCA+IDkgLSAoc2hpcC5nZXRMZW5ndGgoKS0xKSA/IDkgLSAoc2hpcC5nZXRMZW5ndGgoKS0xKSA6IGNvbFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZF1bc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBpXSA9PT0gXCJvYmplY3RcIiB8fCBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZF1bc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBpXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3dQcm9jZXNzZWRdW3N0YXJ0aW5nQ29sUHJvY2Vzc2VkICsgaV0gPSBjZWxsT2JqKHNoaXBPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0aW5nUm93UHJvY2Vzc2VkIC0gMTsgaSA8PSBzdGFydGluZ1Jvd1Byb2Nlc3NlZCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gc3RhcnRpbmdDb2xQcm9jZXNzZWQgLSAxOyBqIDwgc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBzaGlwLmdldExlbmd0aCgpICsgMTsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAwIHx8IGogPCAwIHx8IGkgPiA5IHx8IGogPiA5KSB7IC8vIGlmIG91dCBvZiBib3VuZCwganVzdCBjb250aW51ZSB0aGUgbG9vcFxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBcInhcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgc3RhcnRpbmdSb3dQcm9jZXNzZWQgPSByb3cgPiA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgPyA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgOiByb3dcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29sUHJvY2Vzc2VkID0gY29sIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3N0YXJ0aW5nUm93UHJvY2Vzc2VkICsgaV1bc3RhcnRpbmdDb2xQcm9jZXNzZWRdID09PSBcIm9iamVjdFwiIHx8IGJvYXJkW3N0YXJ0aW5nUm93UHJvY2Vzc2VkICsgaV1bc3RhcnRpbmdDb2xQcm9jZXNzZWRdID09PSBcInhcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZCArIGldW3N0YXJ0aW5nQ29sUHJvY2Vzc2VkXSA9IGNlbGxPYmooc2hpcE9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRpbmdSb3dQcm9jZXNzZWQtIDE7IGkgPD0gc3RhcnRpbmdSb3dQcm9jZXNzZWQgKyBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0YXJ0aW5nQ29sUHJvY2Vzc2VkIC0gMTsgaiA8PSBzdGFydGluZ0NvbFByb2Nlc3NlZCArIDE7IGorPTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDAgfHwgaiA8IDAgfHwgaSA+IDkgfHwgaiA+IDkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gXCJ4XCI7IC8vIHJhdGhlciB0aGFuIHVzaW5nIHgsIGFub3RoZXIgYmV0dGVyIGlkZWEgaXMgc2V0dGluZyBldmVyeSBjZWxsIHdpdGggYW4gb2JqZWN0LCBhbmQgYXNzaWduIHggdG8gJ2RhdGEnIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICBcbiAgICAgIGlzUGxhY2VTaGlwVmFsaWRDb21wdXRlcihzaGlwLCByb3csIGNvbCwgZGlyZWN0aW9uKXtcbiAgICAgICAgc3dpdGNoKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sK3NoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11baV0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbcm93XVtpXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gIFxuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdytzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtpXVtjb2xdID09PSBcIm9iamVjdFwiIHx8IGJvYXJkW2ldW2NvbF0gPT09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICBcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNQbGFjZVNoaXBWYWxpZFBsYXllcihzaGlwLCByb3csIGNvbCwgZGlyZWN0aW9uKXtcbiAgICAgICAgbGV0IHN0YXJ0aW5nUm93UHJvY2Vzc2VkO1xuICAgICAgICBsZXQgc3RhcnRpbmdDb2xQcm9jZXNzZWQ7ICAgICAgICAgICAgXG4gICAgICAgIHN3aXRjaChkaXJlY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOlxuICAgICAgICAgICAgc3RhcnRpbmdSb3dQcm9jZXNzZWQgPSByb3dcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29sUHJvY2Vzc2VkID0gY29sID4gOSAtIChzaGlwLmdldExlbmd0aCgpLTEpID8gOSAtIChzaGlwLmdldExlbmd0aCgpLTEpIDogY29sXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11bc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBpXSA9PT0gXCJvYmplY3RcIiB8fCBib2FyZFtyb3ddW3N0YXJ0aW5nQ29sUHJvY2Vzc2VkICsgaV0gPT09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgc3RhcnRpbmdSb3dQcm9jZXNzZWQgPSByb3cgPiA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgPyA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgOiByb3dcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29sUHJvY2Vzc2VkID0gY29sIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZCArIGldW2NvbF0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbc3RhcnRpbmdSb3dQcm9jZXNzZWQgKyBpXVtjb2xdID09PSBcInhcIikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlY2VpdmVBdHRhY2socm93LCBjb2wpIHtcbiAgICAgICAgLy8gbGF0ZXIgb24sIGlmIG1pc3Mgb3IgaGFzQmVlbkhpdCwgY2FudCBiZSBhdHRhY2tlZCBhZ2Fpbi5cbiAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXS5oYXNCZWVuSGl0ID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIGlmIGFscmVhZHkgYmVlbiBoaXQgMSB0aW1lcywgZG8gbm90aGluZy5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiBib2FyZFtyb3ddW2NvbF0uZGF0YSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sXS5oYXNCZWVuSGl0ID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICBib2FyZFtyb3ddW2NvbF0uZGF0YS5oaXQoKTtcbiAgICAgICAgICBib2FyZFtyb3ddW2NvbF0uaGFzQmVlbkhpdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJtaXNzXCI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc0FsbFNoaXBTdW5rKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXS5oYXNCZWVuSGl0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICByZXNldEJvYXJkXG4gICAgfTtcbiAgfVxuICAiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllckZhY3RvcnlcIjtcbmltcG9ydCBnYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lQ29udHJvbGxlcigpeyAgICBcblxuICAgIC8vIGluaXRpYWxpemUgZ2FtZWJvYXJkXG4gICAgY29uc3QgcGxheWVyMUdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpOyBcbiAgICBjb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICAgIFxuICAgIC8vIG1ha2UgcGxheWVyIHNoaXBcbiAgICBjb25zdCBzaGlwNHBsYXllciA9IHNoaXBGYWN0b3J5KFwic2hpcDRcIiwgNCk7XG4gICAgIGNvbnN0IHNoaXAzcGxheWVyID0gc2hpcEZhY3RvcnkoXCJzaGlwM1wiLCAzKTtcbiAgICAgY29uc3Qgc2hpcDJwbGF5ZXIgPSBzaGlwRmFjdG9yeShcInNoaXAyXCIsIDIpO1xuICAgICBjb25zdCBzaGlwMXBsYXllciA9IHNoaXBGYWN0b3J5KFwic2hpcDFcIiwgMSk7XG4gICAgIGNvbnN0IGFycmF5U2hpcFBsYXllciA9IFtzaGlwNHBsYXllcixzaGlwM3BsYXllcixzaGlwMnBsYXllcixzaGlwMXBsYXllcl1cbiAgXG4gICAgLy8gbWFrZSBjb21wdXRlciBzaGlwXG4gICAgY29uc3Qgc2hpcDRjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDRDb21wXCIsNCk7XG4gICAgY29uc3Qgc2hpcDNjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDNDb21wXCIsMyk7XG4gICAgY29uc3Qgc2hpcDJjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDJDb21wXCIsMik7XG4gICAgY29uc3Qgc2hpcDFjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDFDb21wXCIsMSk7XG4gIFxuICAgIGNvbnN0IGFycmF5U2hpcFBsYXllckVuZW15ID0gW3NoaXA0Y29tcHV0ZXIsIHNoaXAzY29tcHV0ZXIsIHNoaXAyY29tcHV0ZXIsIHNoaXAxY29tcHV0ZXJdO1xuICAgIFxuICAgIC8vIHBsYWNlIGNvbXB1dGVyIHNoaXAgcmFuZG9tbHlcbiAgICBmdW5jdGlvbiBwbGFjZUNvbXB1dGVyU2hpcFJhbmRvbWx5KCl7XG4gICAgICB3aGlsZShhcnJheVNoaXBQbGF5ZXJFbmVteS5sZW5ndGggIT09IDApe1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGFycmF5U2hpcFBsYXllckVuZW15LnNoaWZ0KCk7XG4gICAgICAgIGxldCByYW5kb21Sb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpIDwgMCA/IDAgOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpXG4gICAgICAgIGxldCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpIDwgMCA/IDAgOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMSA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICBsZXQgaXNWYWxpZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmlzUGxhY2VTaGlwVmFsaWRDb21wdXRlcihjdXJyZW50U2hpcCxyYW5kb21Sb3csIHJhbmRvbUNvbCwgZGlyZWN0aW9uKVxuICAgICAgICAgIHdoaWxlKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgIHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSkgPCAwID8gMCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSlcbiAgICAgICAgICAgIHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSkgPCAwID8gMCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSlcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAxID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgICBpc1ZhbGlkID0gY29tcHV0ZXJHYW1lQm9hcmQuaXNQbGFjZVNoaXBWYWxpZENvbXB1dGVyKGN1cnJlbnRTaGlwLHJhbmRvbVJvdywgcmFuZG9tQ29sLCBkaXJlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wdXRlckdhbWVCb2FyZC5wbGFjZVNoaXBDb21wdXRlcihjdXJyZW50U2hpcCwgcmFuZG9tUm93LCByYW5kb21Db2wsIGRpcmVjdGlvbilcbiAgICAgICAgfSAgXG4gICAgfVxuICBcbiAgICBwbGFjZUNvbXB1dGVyU2hpcFJhbmRvbWx5KClcbiAgICBcbiAgICAvLyBpbml0aWFsaXplIHBsYXllciBcbiAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKFwicGxheWVyMVwiLCBwbGF5ZXIxR2FtZUJvYXJkKTtcbiAgICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyXCIsIGNvbXB1dGVyR2FtZUJvYXJkKTtcbiAgICBjb25zdCBwbGF5ZXJzID0gW3BsYXllcjEsIGNvbXB1dGVyXTtcbiAgICBcbiAgICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyc1swXTtcbiAgICBsZXQgYWN0aXZlUGxheWVyRW5lbXkgPSBwbGF5ZXJzWzFdO1xuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGlzT3ZlciA9IDA7IFxuICAgIGxldCBpc1JvdW5kU3RhcnQgPSAwOyAvLyBpZiBwbGF5ZXIgaGFzbnQgcGxhY2UgYWxsIHRoZSBzaGlwLCB0aGVuIGVuZW15IGJvYXJkIHdvbnQgc2hvdyB1cFxuICAgIFxuICAgIGNvbnN0IGdldEFycmF5U2hpcFBsYXllckxhdGVzdENvbmRpdGlvbiA9ICgpID0+IGFycmF5U2hpcFBsYXllclxuICAgIFxuICAgIGNvbnN0IGlzUm91bmRTdGFydENoZWNrID0gKCkgPT4ge1xuICAgICAgaWYoYXJyYXlTaGlwUGxheWVyLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGlzUm91bmRTdGFydCA9IDFcbiAgICAgICAgcmV0dXJuIGlzUm91bmRTdGFydDtcbiAgICAgIH19O1xuICAgIFxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVBZnRlclJlc2V0KCl7XG4gICAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gICAgICAgIGFjdGl2ZVBsYXllckVuZW15ID0gcGxheWVyc1sxXTtcbiAgICAgICAgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgaXNPdmVyID0gMDtcbiAgICAgICAgaXNSb3VuZFN0YXJ0ID0gMFxuICAgICAgICBcbiAgICAgICAgc2hpcDRwbGF5ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBzaGlwM3BsYXllci5yZXNldFNoaXBTdGF0ZSgpXG4gICAgICAgIHNoaXAycGxheWVyLnJlc2V0U2hpcFN0YXRlKClcbiAgICAgICAgc2hpcDFwbGF5ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXIucHVzaChzaGlwNHBsYXllcilcbiAgICAgICAgYXJyYXlTaGlwUGxheWVyLnB1c2goc2hpcDNwbGF5ZXIpXG4gICAgICAgIGFycmF5U2hpcFBsYXllci5wdXNoKHNoaXAycGxheWVyKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXIucHVzaChzaGlwMXBsYXllcilcbiAgICAgICAgXG4gICAgICAgIHNoaXA0Y29tcHV0ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBzaGlwM2NvbXB1dGVyLnJlc2V0U2hpcFN0YXRlKClcbiAgICAgICAgc2hpcDJjb21wdXRlci5yZXNldFNoaXBTdGF0ZSgpXG4gICAgICAgIHNoaXAxY29tcHV0ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXJFbmVteS5wdXNoKHNoaXA0Y29tcHV0ZXIpXG4gICAgICAgIGFycmF5U2hpcFBsYXllckVuZW15LnB1c2goc2hpcDNjb21wdXRlcilcbiAgICAgICAgYXJyYXlTaGlwUGxheWVyRW5lbXkucHVzaChzaGlwMmNvbXB1dGVyKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXJFbmVteS5wdXNoKHNoaXAxY29tcHV0ZXIpXG4gICAgICAgIHBsYWNlQ29tcHV0ZXJTaGlwUmFuZG9tbHkoKVxuICAgICAgfVxuICAgICAgXG4gIFxuICAgICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyID0gKCkgPT4gYWN0aXZlUGxheWVyO1xuICAgICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyTmFtZSA9ICgpID0+IGdldEFjdGl2ZVBsYXllcigpLmdldE5hbWUoKTsgLy8gY2hhaW4gbGlrZSB0aGlzIHRvIGJlIGR5bmFtaWMgKGJ1ZyAxLTJob3VycylcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckJvYXJkID0gKCkgPT4gZ2V0QWN0aXZlUGxheWVyKCkuZ2V0Qm9hcmRPYmooKS5nZXRCb2FyZCgpO1xuICAgICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyQm9hcmRPYmogPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXIoKS5nZXRCb2FyZE9iaigpO1xuICBcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckVuZW15ID0gKCkgPT4gYWN0aXZlUGxheWVyRW5lbXk7XG4gICAgICBjb25zdCBnZXRBY3RpdmVQbGF5ZXJFbmVteU5hbWUgPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXJFbmVteSgpLmdldE5hbWUoKTtcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckVuZW15Qm9hcmQgPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXJFbmVteSgpLmdldEJvYXJkT2JqKCkuZ2V0Qm9hcmQoKTtcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckVuZW15Qm9hcmRPYmogPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXJFbmVteSgpLmdldEJvYXJkT2JqKCk7XG4gIFxuICAgICAgY29uc3QgZ2V0UmVzdWx0TWVzc2FnZSA9ICgpID0+IHJlc3VsdDtcbiAgXG4gICAgICBjb25zdCBzd2l0Y2hQbGF5ZXJUdXJuID0gKCkgPT4ge1xuICAgICAgICBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0gPyBwbGF5ZXJzWzFdIDogcGxheWVyc1swXTtcbiAgICAgICAgYWN0aXZlUGxheWVyRW5lbXkgPSBhY3RpdmVQbGF5ZXJFbmVteSA9PT0gcGxheWVyc1sxXSA/IHBsYXllcnNbMF0gOiBwbGF5ZXJzWzFdO1xuICBcbiAgICAgIH1cbiAgICAgIFxuICBcbiAgICAgIGNvbnN0IHBsYXlSb3VuZCA9IChyb3csY29sKSA9PiB7IC8vIGFkZCB0aGUgZ3VhcmQoaWYgcm93IGNvbCBhbHJlYWR5IGJlZW4gaGl0LCB0aGVuIGRvIG5vdGhpbmcgb24gdGhlIERPTSksIHBsYXlSb3VuZCBvbmx5IGNhcmUgZm9yIHRoZSBsb2dpY1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBhY3RpdmVQbGF5ZXJFbmVteS5nZXRCb2FyZE9iaigpLmdldEJvYXJkQXRJbmRleChyb3csIGNvbCkgPT09IFwibWlzc1wiIHx8XG4gICAgICAgICAgICBhY3RpdmVQbGF5ZXJFbmVteS5nZXRCb2FyZE9iaigpLmdldEJvYXJkQXRJbmRleChyb3csIGNvbCkuaGFzQmVlbkhpdCA9PT0gdHJ1ZSB8fFxuICAgICAgICAgICAgaXNPdmVyID09PSAxXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBcbiAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFjdGl2ZVBsYXllci5sYXVuY2hBdHRhY2soYWN0aXZlUGxheWVyRW5lbXkuZ2V0Qm9hcmRPYmooKSxyb3csY29sKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5ZXJzLmxlbmd0aDsgaSs9IDEpIHtcbiAgICAgICAgICAgICAgaWYocGxheWVyc1tpXS5nZXRCb2FyZE9iaigpLmlzQWxsU2hpcFN1bmsoKSl7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYCR7cGxheWVyc1tNYXRoLmFicyhpLTEpXS5nZXROYW1lKCl9IGlzIHRoZSB3aW5uZXJgXG4gICAgICAgICAgICAgICAgaXNPdmVyID0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgdGhlcmUgaXMgd2lubmVyIGFscmVhZHlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoUGxheWVyVHVybigpO1xuICAgICAgICAgICAgaWYoYWN0aXZlUGxheWVyLmdldE5hbWUoKSA9PT0gXCJjb21wdXRlclwiKXtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrQ2VsbCA9IGFjdGl2ZVBsYXllckVuZW15LmdldEJvYXJkT2JqKCkuZ2V0Qm9hcmRBdEluZGV4KHJhbmRvbVJvdywgcmFuZG9tQ29sKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKHR5cGVvZiBjaGVja0NlbGwgPT09IFwib2JqZWN0XCIgJiYgY2hlY2tDZWxsLmhhc0JlZW5IaXQgPT09IHRydWUpIHx8IGNoZWNrQ2VsbCA9PT0gXCJtaXNzXCIpIHsgLy8gaWYgdGhlIGNlbGwgaXMgb2JqZWN0JiZhbHJlYWR5SGl0IE9SIGNlbGwgPSAnbWlzcycsIHdlIGdlbmVyYXRlIG5ldyByYW5kb21Sb3cgcmFuZG9tQ29sLlxuICAgICAgICAgICAgICAgICAgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgcmFuZG9tQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgY2hlY2tDZWxsID0gYWN0aXZlUGxheWVyRW5lbXkuZ2V0Qm9hcmRPYmooKS5nZXRCb2FyZEF0SW5kZXgocmFuZG9tUm93LCByYW5kb21Db2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBhY3RpdmVQbGF5ZXIubGF1bmNoQXR0YWNrKGFjdGl2ZVBsYXllckVuZW15LmdldEJvYXJkT2JqKCkscmFuZG9tUm93LHJhbmRvbUNvbCk7XG4gICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWVycy5sZW5ndGg7IGkrPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpXS5nZXRCb2FyZE9iaigpLmlzQWxsU2hpcFN1bmsoKSl7XG4gICAgICAgICAgICAgICAgICByZXN1bHQgPSBgJHtwbGF5ZXJzW01hdGguYWJzKGktMSldLmdldE5hbWUoKX0gaXMgdGhlIHdpbm5lcmBcbiAgICAgICAgICAgICAgICAgIGlzT3ZlciA9IDE7XG4gICAgICAgICAgICAgICAgICBzd2l0Y2hQbGF5ZXJUdXJuKCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgdGhlcmUgaXMgd2lubmVyIGFscmVhZHlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaFBsYXllclR1cm4oKTtcbiAgICAgICAgICAgIH1cbiAgXG4gICAgICAgIFxuICAgICAgICB9XG4gIFxuICAgICAgICBjb25zdCByZXNldEdhbWVDb250cm9sbGVyID0gKCkgPT4ge1xuICAgICAgICAgIHBsYXllcjFHYW1lQm9hcmQucmVzZXRCb2FyZCgpO1xuICAgICAgICAgIGNvbXB1dGVyR2FtZUJvYXJkLnJlc2V0Qm9hcmQoKTtcbiAgICAgICAgICBpbml0aWFsaXplQWZ0ZXJSZXNldCgpO1xuICAgICAgICB9ICAgIFxuICBcbiAgICAgICAgY29uc3QgaXNHYW1lT3ZlciA9ICgpID0+IGlzT3ZlclxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGxheVJvdW5kLFxuICAgICAgICBnZXRBY3RpdmVQbGF5ZXJOYW1lLFxuICAgICAgICBnZXRBY3RpdmVQbGF5ZXJFbmVteU5hbWUsXG4gICAgICAgIGdldEFjdGl2ZVBsYXllckJvYXJkLFxuICAgICAgICBnZXRBY3RpdmVQbGF5ZXJFbmVteUJvYXJkLFxuICAgICAgICBnZXRBY3RpdmVQbGF5ZXJCb2FyZE9iaixcbiAgICAgICAgZ2V0QWN0aXZlUGxheWVyRW5lbXlCb2FyZE9iaixcbiAgICAgICAgZ2V0UmVzdWx0TWVzc2FnZSxcbiAgICAgICAgZ2V0QXJyYXlTaGlwUGxheWVyTGF0ZXN0Q29uZGl0aW9uLFxuICAgICAgICByZXNldEdhbWVDb250cm9sbGVyLFxuICAgICAgICBpc1JvdW5kU3RhcnRDaGVjayxcbiAgICAgICAgaXNHYW1lT3ZlclxuICAgICAgfTtcbiAgfVxuICAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXIobmFtZSwgYm9hcmQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9LFxuICAgICAgZ2V0Qm9hcmRPYmooKSB7XG4gICAgICAgIHJldHVybiBib2FyZDsgLy8gdGhpcyB3aWxsIHJldHVybiBvYmplY3RcbiAgICAgIH0sXG4gICAgICBsYXVuY2hBdHRhY2soZW5lbXlHYW1lQm9hcmQsIHJvdywgY29sKSB7XG4gICAgICAgIGVuZW15R2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xuICAgICAgfSxcbiAgICB9O1xuICBcbn1cbiIsImltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9nYW1lQ29udHJvbGxlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcmVlbkNvbnRyb2xsZXIoKXtcbiAgICBjb25zdCBnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyID0gZ2FtZUNvbnRyb2xsZXIoKTtcbiAgICBjb25zdCBwbGF5ZXJDb250YWluZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1jb250YWluZXJcIik7XG4gICAgY29uc3QgY29tcHV0ZXJDb250YWluZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCB3aW5uZXJSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdFwiKTtcbiAgICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvdGF0ZVwiKTtcbiAgICBjb25zdCBzaGlwQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcC1jb250YWluZXJcIik7XG4gICAgbGV0IGlzUm90YXRlID0gMDtcbiAgICAvLyBldmVuIHRob3VnaCB0aGUgYWN0aXZlIHBsYXllciBpcyBnb2luZyB0byBzd2l0Y2gsIGJ1dCBldmVyeSB0aW1lIHBsYXlSb3VuZCgpIHRoZSBhY3RpdmVQbGF5ZXIgd2lsbCBiZSBiYWNrIHRvIHBsYXllciwgc28gZG9lc250IHJlYWxseSBtYXR0ZXIuIGluIHNpbXBsZSB0ZXJtcywgYWZ0ZXIgZXZlcnkgcGxheVJvdW5kLCBhY3RpdmVQbGF5ZXIgd2lsbCBiZSB0aGUgaHVtYW4xL3BsYXllcjEuIGFjdGl2ZVBsYXllciBzdGF0ZSBhbHdheXMgcGxheWVyMVxuICAgIFxuICBcbiAgICBjb25zdCB1cGRhdGVTY3JlZW4gPSAoKSA9PiB7XG4gICAgICBwbGF5ZXJDb250YWluZXJEaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgY29tcHV0ZXJDb250YWluZXJEaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmdldEFjdGl2ZVBsYXllckJvYXJkKCk7IC8vIHRha2UgbGF0ZXN0IGNvbmRpdGlvbiBvZiB0aGUgYm9hcmRcbiAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmdldEFjdGl2ZVBsYXllckVuZW15Qm9hcmQoKTtcbiAgXG4gICAgICAvLyB1cGRhdGUgcGxheWVyQm9hcmRcbiAgICAgIHBsYXllckJvYXJkLmZvckVhY2goKHJvdyxpbmRleEkpID0+IHtcbiAgICAgICAgcm93LmZvckVhY2goKGNlbGwsaW5kZXhKKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKFwiY2VsbC1wbGF5ZXJcIik7XG4gICAgICAgICAgY2VsbERpdi5kYXRhc2V0LnJvdyA9IGluZGV4STtcbiAgICAgICAgICBjZWxsRGl2LmRhdGFzZXQuY29sdW1uID0gaW5kZXhKO1xuICAgICAgICAgIGlmKHR5cGVvZiBjZWxsID09PSBcIm9iamVjdFwiICYmIGNlbGwuaGFzQmVlbkhpdCA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgICAgICAgfSBlbHNlIGlmICgodHlwZW9mIGNlbGwgPT09IFwib2JqZWN0XCIgJiYgY2VsbC5oYXNCZWVuSGl0ID09PSB0cnVlKSkge1xuICAgICAgICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbCA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgICAgIGNlbGxEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNlbGxEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGUgPT57XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgIH0pO1xuICAgICAgICAgIGNlbGxEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpPT57XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkcm9wU2hpcChlKTt9KVxuICAgICAgICAgIHBsYXllckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChjZWxsRGl2KTtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICBcbiAgXG4gIFxuICAgICAgLy8gdXBkYXRlIGNvbXB1dGVyQm9hcmQgaWYgcGxheWVyIGFscmVhZHkgcHV0IGFsbCB0aGUgc2hpcFxuICAgICAgaWYoZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5pc1JvdW5kU3RhcnRDaGVjaygpID09PSAxKXtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5mb3JFYWNoKChyb3csaW5kZXhJKSA9PiB7XG4gICAgICAgICAgcm93LmZvckVhY2goKGNlbGwsaW5kZXhKKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGNlbGxCdXR0b24uY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgICAgICBjZWxsQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBjZWxsQnV0dG9uLmRhdGFzZXQucm93ID0gaW5kZXhJO1xuICAgICAgICAgICAgY2VsbEJ1dHRvbi5kYXRhc2V0LmNvbHVtbiA9IGluZGV4SjtcbiAgICAgICAgICAgIGlmICgodHlwZW9mIGNlbGwgPT09IFwib2JqZWN0XCIgJiYgY2VsbC5oYXNCZWVuSGl0ID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICBjZWxsQnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwgPT09IFwibWlzc1wiKSB7XG4gICAgICAgICAgICAgIGNlbGxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKHR5cGVvZiBjZWxsID09PSBcIm9iamVjdFwiICYmIGNlbGwuaGFzQmVlbkhpdCA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICAgIGNlbGxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXB1dGVyQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNlbGxCdXR0b24pO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pICBcbiAgICAgIH1cbiAgXG4gICAgIFxuICBcbiAgICBmdW5jdGlvbiBzaG93V2lubmVyKCl7XG4gICAgICB3aW5uZXJSZXN1bHQudGV4dENvbnRlbnQgPSBnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmdldFJlc3VsdE1lc3NhZ2UoKTtcbiAgICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuICAgICAgcmVzZXRCdG4udGV4dENvbnRlbnQgPSBcInJlc2V0Qm9hcmRcIjtcbiAgICAgIHdpbm5lclJlc3VsdC5hcHBlbmRDaGlsZChyZXNldEJ0bik7XG4gICAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5yZXNldEdhbWVDb250cm9sbGVyKCk7XG4gICAgICAgIHdpbm5lclJlc3VsdC50ZXh0Q29udGVudCA9IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0UmVzdWx0TWVzc2FnZSgpO1xuICAgICAgICB1cGRhdGVTY3JlZW4oKTtcbiAgICAgICAgc2hpcENvbnRhaW5lcnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsXCJ0cnVlXCIpKVxuICAgICAgICByZXNldEJ0bi5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgXG4gICAgIC8vIGlmIHNvbWVvbmUgd2lucywgZGlzcGxheSB0aGUgd2lubmVyIHRvIHRoZSBET00uIFxuICAgICBpZihnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmlzR2FtZU92ZXIoKSA9PT0gMSkge1xuICAgICAgc2hvd1dpbm5lcigpO1xuICAgIH1cbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGNsaWNrSGFuZGxlckJvYXJkKGUpeyAvLyBmb3IgYXR0YWNraW5nIGNvbXB1dGVyQm9hcmRcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93ID0gZS50YXJnZXQuZGF0YXNldC5yb3c7XG4gICAgICBjb25zdCBzZWxlY3RlZENvbHVtbiA9IGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uO1xuICBcbiAgICAgIGlmKCFzZWxlY3RlZFJvdyB8fCAhc2VsZWN0ZWRDb2x1bW4pe3JldHVybn0gLy8gbWFrZSBzdXJlIGNsaWNrIHRoZSBjZWxsIG5vdCB0aGUgZ2FwcyBpbmJldHdlZW5cbiAgXG4gICAgICBnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLnBsYXlSb3VuZChzZWxlY3RlZFJvdyxzZWxlY3RlZENvbHVtbik7XG4gICAgICB1cGRhdGVTY3JlZW4oKTtcbiAgICB9XG4gIFxuICAgIGNvbXB1dGVyQ29udGFpbmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGNsaWNrSGFuZGxlckJvYXJkKTtcbiAgXG4gIFxuICAgIGZ1bmN0aW9uIHJvdGF0ZVNoaXAoKXtcbiAgICAgIHNoaXBDb250YWluZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcInJvdGF0ZVwiKTtcbiAgICAgIH0pXG4gICAgICBpZihpc1JvdGF0ZSA9PT0gMCkge2lzUm90YXRlID0gMX0gIGVsc2Uge2lzUm90YXRlID0gMH0gO1xuICAgIH1cbiAgXG4gIFxuICAgIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcm90YXRlU2hpcClcbiAgXG4gIFxuICAgIHVwZGF0ZVNjcmVlbigpOy8vIGluaXRpYWwgcmVuZGVyXG4gICAgXG4gIFxuICAgIGZ1bmN0aW9uIGRyYWdTdGFydGVyKGVsZW1lbnQpe1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGV2ZW50PT57XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBldmVudC50YXJnZXQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIGluaXRpYWxpemUgZHJhZyBpdGVtXG4gICAgc2hpcENvbnRhaW5lcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRyYWdTdGFydGVyKGl0ZW0pO1xuICAgIH0pXG4gIFxuICAgIGNvbnN0IGNlbGxzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsLXBsYXllclwiKVxuICBcbiAgICBjZWxsc0Rpdi5mb3JFYWNoKGNlbGw9PntcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGUgPT57XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICB9KVxuICAgIH0pXG4gIFxuICAgIGNlbGxzRGl2LmZvckVhY2goY2VsbD0+e1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSk9PntcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKSkgICAgXG4gICAgICAgIC8vIGNvbnN0IGNvb3JkWCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93KTsgLy8gRE9OVCBGT1JHRVQgUEFSU0VJTlQsIEVWRVJZIElOVCBPUiBOVU1CRVIgSEFWRSBUTyBCRSBQQVJTRUQgKEVSUk9SIDEtMiBIT1VSUylcbiAgICAgICAgLy8gY29uc3QgY29vcmRZID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICBkcm9wU2hpcChlKTtcbiAgICAgICAgdXBkYXRlU2NyZWVuKCk7XG4gICAgIH0pXG4gICAgfSlcbiAgXG4gICAgLy8gd2hlbiBkcm9wIHNoaXAsIHJ1biBwbGFjZVNoaXBDb21wdXRlciBtZXRob2QgYW5kIGFsc28gY2hlY2sgaWYgYXJyYXlTaGlwIGVtcHR5PyBpZiB5ZXMgdGhlbiBnYW1lIHN0YXJ0XG4gICAgZnVuY3Rpb24gZHJvcFNoaXAoZSl7XG4gICAgICBjb25zdCBzaGlwVHlwZSA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZVggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICBjb25zdCBjb29yZGluYXRlWSA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QXJyYXlTaGlwUGxheWVyTGF0ZXN0Q29uZGl0aW9uKCkubGVuZ3RoOyBpKz0xKXtcbiAgICAgICAgICAgIGlmIChnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmdldEFycmF5U2hpcFBsYXllckxhdGVzdENvbmRpdGlvbigpW2ldLmdldFNoaXBUeXBlKCkgPT09IHNoaXBUeXBlICYmIGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QWN0aXZlUGxheWVyQm9hcmRPYmooKS5pc1BsYWNlU2hpcFZhbGlkUGxheWVyKGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QXJyYXlTaGlwUGxheWVyTGF0ZXN0Q29uZGl0aW9uKClbaV0sIGNvb3JkaW5hdGVYLCBjb29yZGluYXRlWSwgaXNSb3RhdGUgPT09IDAgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIiApKXtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2hpcFR5cGV9YCkuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsXCJmYWxzZVwiKVxuICAgICAgICAgICAgICBjb25zdCBzcGxpY2VkSXRlbSA9IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QXJyYXlTaGlwUGxheWVyTGF0ZXN0Q29uZGl0aW9uKCkuc3BsaWNlKGksMSlbMF07IC8vIHVzZSBbMF0gY2F1c2UgaW4gdGhpcyBjYXNlLCB0aGVzIHNwbGljZSByZXR1cm4gYXJyYXlcbiAgICAgICAgICAgICAgZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRBY3RpdmVQbGF5ZXJCb2FyZE9iaigpLnBsYWNlU2hpcFBsYXllcihzcGxpY2VkSXRlbSxjb29yZGluYXRlWCxjb29yZGluYXRlWSxpc1JvdGF0ZSA9PSAwID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCIpO1xuICAgICAgICAgICAgICB1cGRhdGVTY3JlZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlwRmFjdG9yeSh0eXBlLCBsZW5ndGgpIHtcbiAgbGV0IHNoaXBIaXQgPSAwO1xuICBjb25zdCByZXNldFNoaXBTdGF0ZSA9ICgpID0+IHtcbiAgICBzaGlwSGl0ID0gMDtcbiAgfTtcbiAgY29uc3QgZ2V0U2hpcFR5cGUgPSAoKSA9PiB0eXBlO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBzaGlwSGl0ICs9IDE7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAoc2hpcEhpdCA9PT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICByZXR1cm4ge1xuICAgIHJlc2V0U2hpcFN0YXRlLFxuICAgIGdldFNoaXBUeXBlLFxuICAgIGdldExlbmd0aCxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGdldCBoZWFsdGgoKSB7XG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGggLSB0aGlzLnNoaXBIaXQ7XG4gICAgfSxcbiAgfTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW1wb3J0IFwiLi9zdHlsZS5jc3NcIiAvLyBhZnRlciBmaW5pc2ggZXZlcnl0aGluZywgZG9udCBmb3JnZXQgdG8gZGVsZXRlIHNjcmlwdFRhZyBhbmQgbGlua1RhZyAoIHRoaXMgd2lsbCBtYWtlIGplc3QgZXJyb3IsIHRyeSByZXNlYXJjaCBhYm91dCBob3cgdG8gaW1wb3J0IGNzcyBmcm9tIHNyYyBzbyBpdCBjYW4gbW92ZSB0byBkaXN0KVxuLy8gaG93IHRvIG1ha2Ugc3R5bGUuY3NzIGZyb20gc3JjIHRvIGRpc3QgYWZ0ZXIgd2VicGFja2luZz8gYWxzbywgbGl2ZXNlcnZlciBzdGlsbCBuZWVkZWQgY2F1c2UgaWYgaSBlZGl0IHNvbWUgdGVtcGxhdGUuaHRtbCB3aGlsZSBucG0gLS13YXRjaCwgdGhlbiBpdCB3b250IGNoYW5nZSB0aGUgaHRtbCwgaSBuZWVkIHRvIHJlb3Blbi4gc28gdGhlIGlkZWFsIElNTyBsaXZlU2VydmVyIGluIFNSQywgYWZ0ZXIgZmluYWwoaHRtbGNzcykgdGhlbiBucHh3ZWJwYWNrXG5cbmltcG9ydCBzY3JlZW5Db250cm9sbGVyIGZyb20gXCIuL3NjcmVlbkNvbnRyb2xsZXJcIjtcblxuXG5zY3JlZW5Db250cm9sbGVyKCk7XG5cbi8vIGFub3RoZXIgaWRlYSAoZXZlcnkgY2VsbCBwdXNoIGFuZCBjZWxsT2JqICwgdGhlbiBhZGQgaXNBdmFpbGFibGUgcHJvcCB3aGVuIHBsYWNpbmcgU2hpcCB0byBhZGQgY29udHJhaW50cyBjYW50IHB1dCBzdXJyb3VuZCBvbmVwbHVzQ29vcmRzKVxuXG4vLyBhbm90aGVyIHRoaW5ncyB0byBkbywgbWFrZSB0aGUgY29tcHV0ZXIgc21hcnRcblxuLy8gbGF0ZXIgb24gY2FuIHBvbGlzaCB0aGUgZGVzaWduICwgcmVmYWN0b3IgdG8gbWFrZSBjb2RlIGNsZWFuZXIobWF5YmU/KVxuXG4vLyB0aGluZ3MgdGhhdCBhbHdheXMgaGF2ZSB0byBiZSBjb25zaWRlcmVkICwgd2hlbiBjcmVhdGluZyBzb21ldGhpbmcsIGp1c3QgZG8gdGhlIG1vZGVsIGZpcnN0IChjYW4gYmUgcGxheWVkIGJ5IHVzaW5nIGNvbnNvbGUubG9nKSwgRE9NIG9ubHkgZ2V0IGRhdGEgZnJvbSB0aGUgbW9kZWwsIG5vIGhhbmRsaW5nIGxvZ2ljIGluIERPTSxcbi8vIHNvIGVkZ2UgY2FzZSBoYW5kbGVkIGluIHRoZSBtb2RlbC5cblxuLy8gY2FuIHNlcGFyYXRlIGVhY2ggRkYgdG8gZWFjaCBmaWxlICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==