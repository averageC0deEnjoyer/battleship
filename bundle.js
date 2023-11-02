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
          player1GameBoard.resetShipState();
          computerGameBoard.resetShipState();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBFQUEwRTtBQUNwRztBQUNBLHlDQUF5QyxTQUFTO0FBQ2xELGdIQUFnSDtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoS2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7VUMxQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7O0FBRWtEOzs7QUFHbEQsNkRBQWdCOztBQUVoQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JlZW5Db250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUJvYXJkKCkge1xuICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBib2FyZC5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBib2FyZFtpXS5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhbm90aGVyIGJldHRlciB3YXkobWF5YmU/KSwgcHVzaCBhbGwgY2VsbG9iaiB0byBib2FyZCwgYW5kIGFkZCBpc0F2YWlsYWJsZSBwcm9wXG4gICAgY29uc3QgY2VsbE9iaiA9IChkYXRhKSA9PiAoe1xuICAgICAgaGFzQmVlbkhpdDogZmFsc2UsXG4gICAgICBkYXRhLCAvLyB0byBzYXZlIHNoaXAgb2JqZWN0IGRhdGFcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgICBib2FyZFtpXVtqXSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHJldHVybiB7XG4gICAgICBnZXRCb2FyZEF0SW5kZXgocm93LCBjb2wpIHtcbiAgICAgICAgcmV0dXJuIGJvYXJkW3Jvd11bY29sXTtcbiAgICAgIH0sXG4gICAgICBnZXRCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIGJvYXJkO1xuICAgICAgfSxcbiAgICAgIHBsYWNlU2hpcENvbXB1dGVyKHNoaXAsIHJvdywgY29sLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2hpcE9iaiA9IHNoaXA7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sK3NoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11baV0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbcm93XVtpXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IGNlbGxPYmooc2hpcE9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcm93IC0gMTsgaSA8PSByb3cgKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGNvbCAtIDE7IGogPCBjb2wgKyBzaGlwLmdldExlbmd0aCgpICsgMTsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAwIHx8IGogPCAwIHx8IGkgPiA5IHx8IGogPiA5KSB7IC8vIGlmIG91dCBvZiBib3VuZCwganVzdCBjb250aW51ZSB0aGUgbG9vcFxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBcInhcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdytzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW2ldW2NvbF0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbaV1bY29sXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfSAvLyB0byBjaGVjayBpZiBpIHB1dCBhIHNoaXAsIGlmIHRoZXJlIGlzIHNvbWUgWCBvciBhbHJlYWR5IHNoaXAsIHRoZW4ganVzdCBleGl0IGZ1bmNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IGNlbGxPYmooc2hpcE9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcm93IC0gMTsgaSA8PSByb3cgKyBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGNvbCAtIDE7IGogPD0gY29sICsgMTsgais9MSkge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgMCB8fCBqIDwgMCB8fCBpID4gOSB8fCBqID4gOSkge1xuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBcInhcIjsgLy8gcmF0aGVyIHRoYW4gdXNpbmcgeCwgYW5vdGhlciBiZXR0ZXIgaWRlYSBpcyBzZXR0aW5nIGV2ZXJ5IGNlbGwgd2l0aCBhbiBvYmplY3QsIGFuZCBhc3NpZ24geCB0byAnZGF0YScgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwbGFjZVNoaXBQbGF5ZXIoc2hpcCwgcm93LCBjb2wsIGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBzaGlwT2JqID0gc2hpcDtcbiAgICAgICAgbGV0IHN0YXJ0aW5nUm93UHJvY2Vzc2VkO1xuICAgICAgICBsZXQgc3RhcnRpbmdDb2xQcm9jZXNzZWQ7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSBcImhvcml6b250YWxcIjpcbiAgICAgICAgICAgIHN0YXJ0aW5nUm93UHJvY2Vzc2VkID0gcm93XG4gICAgICAgICAgICBzdGFydGluZ0NvbFByb2Nlc3NlZCA9IGNvbCA+IDkgLSAoc2hpcC5nZXRMZW5ndGgoKS0xKSA/IDkgLSAoc2hpcC5nZXRMZW5ndGgoKS0xKSA6IGNvbFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZF1bc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBpXSA9PT0gXCJvYmplY3RcIiB8fCBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZF1bc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBpXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgYm9hcmRbc3RhcnRpbmdSb3dQcm9jZXNzZWRdW3N0YXJ0aW5nQ29sUHJvY2Vzc2VkICsgaV0gPSBjZWxsT2JqKHNoaXBPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0aW5nUm93UHJvY2Vzc2VkIC0gMTsgaSA8PSBzdGFydGluZ1Jvd1Byb2Nlc3NlZCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gc3RhcnRpbmdDb2xQcm9jZXNzZWQgLSAxOyBqIDwgc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBzaGlwLmdldExlbmd0aCgpICsgMTsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAwIHx8IGogPCAwIHx8IGkgPiA5IHx8IGogPiA5KSB7IC8vIGlmIG91dCBvZiBib3VuZCwganVzdCBjb250aW51ZSB0aGUgbG9vcFxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgYm9hcmRbaV1bal0gPSBcInhcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgc3RhcnRpbmdSb3dQcm9jZXNzZWQgPSByb3cgPiA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgPyA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgOiByb3dcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29sUHJvY2Vzc2VkID0gY29sIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3N0YXJ0aW5nUm93UHJvY2Vzc2VkICsgaV1bc3RhcnRpbmdDb2xQcm9jZXNzZWRdID09PSBcIm9iamVjdFwiIHx8IGJvYXJkW3N0YXJ0aW5nUm93UHJvY2Vzc2VkICsgaV1bc3RhcnRpbmdDb2xQcm9jZXNzZWRdID09PSBcInhcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9IC8vIHRvIGNoZWNrIGlmIGkgcHV0IGEgc2hpcCwgaWYgdGhlcmUgaXMgc29tZSBYIG9yIGFscmVhZHkgc2hpcCwgdGhlbiBqdXN0IGV4aXQgZnVuY1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZCArIGldW3N0YXJ0aW5nQ29sUHJvY2Vzc2VkXSA9IGNlbGxPYmooc2hpcE9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRpbmdSb3dQcm9jZXNzZWQtIDE7IGkgPD0gc3RhcnRpbmdSb3dQcm9jZXNzZWQgKyBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0YXJ0aW5nQ29sUHJvY2Vzc2VkIC0gMTsgaiA8PSBzdGFydGluZ0NvbFByb2Nlc3NlZCArIDE7IGorPTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDAgfHwgaiA8IDAgfHwgaSA+IDkgfHwgaiA+IDkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgIGJvYXJkW2ldW2pdID0gXCJ4XCI7IC8vIHJhdGhlciB0aGFuIHVzaW5nIHgsIGFub3RoZXIgYmV0dGVyIGlkZWEgaXMgc2V0dGluZyBldmVyeSBjZWxsIHdpdGggYW4gb2JqZWN0LCBhbmQgYXNzaWduIHggdG8gJ2RhdGEnIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICBcbiAgICAgIGlzUGxhY2VTaGlwVmFsaWRDb21wdXRlcihzaGlwLCByb3csIGNvbCwgZGlyZWN0aW9uKXtcbiAgICAgICAgc3dpdGNoKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sK3NoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11baV0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbcm93XVtpXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gIFxuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdytzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtpXVtjb2xdID09PSBcIm9iamVjdFwiIHx8IGJvYXJkW2ldW2NvbF0gPT09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICBcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaXNQbGFjZVNoaXBWYWxpZFBsYXllcihzaGlwLCByb3csIGNvbCwgZGlyZWN0aW9uKXtcbiAgICAgICAgbGV0IHN0YXJ0aW5nUm93UHJvY2Vzc2VkO1xuICAgICAgICBsZXQgc3RhcnRpbmdDb2xQcm9jZXNzZWQ7ICAgICAgICAgICAgXG4gICAgICAgIHN3aXRjaChkaXJlY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwiaG9yaXpvbnRhbFwiOlxuICAgICAgICAgICAgc3RhcnRpbmdSb3dQcm9jZXNzZWQgPSByb3dcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29sUHJvY2Vzc2VkID0gY29sID4gOSAtIChzaGlwLmdldExlbmd0aCgpLTEpID8gOSAtIChzaGlwLmdldExlbmd0aCgpLTEpIDogY29sXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11bc3RhcnRpbmdDb2xQcm9jZXNzZWQgKyBpXSA9PT0gXCJvYmplY3RcIiB8fCBib2FyZFtyb3ddW3N0YXJ0aW5nQ29sUHJvY2Vzc2VkICsgaV0gPT09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbFwiOlxuICAgICAgICAgICAgc3RhcnRpbmdSb3dQcm9jZXNzZWQgPSByb3cgPiA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgPyA5IC0gKHNoaXAuZ2V0TGVuZ3RoKCktMSkgOiByb3dcbiAgICAgICAgICAgIHN0YXJ0aW5nQ29sUHJvY2Vzc2VkID0gY29sIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtzdGFydGluZ1Jvd1Byb2Nlc3NlZCArIGldW2NvbF0gPT09IFwib2JqZWN0XCIgfHwgYm9hcmRbc3RhcnRpbmdSb3dQcm9jZXNzZWQgKyBpXVtjb2xdID09PSBcInhcIikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlY2VpdmVBdHRhY2socm93LCBjb2wpIHtcbiAgICAgICAgLy8gbGF0ZXIgb24sIGlmIG1pc3Mgb3IgaGFzQmVlbkhpdCwgY2FudCBiZSBhdHRhY2tlZCBhZ2Fpbi5cbiAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sXS5oYXNCZWVuSGl0ID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIGlmIGFscmVhZHkgYmVlbiBoaXQgMSB0aW1lcywgZG8gbm90aGluZy5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiBib2FyZFtyb3ddW2NvbF0uZGF0YSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sXS5oYXNCZWVuSGl0ID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICBib2FyZFtyb3ddW2NvbF0uZGF0YS5oaXQoKTtcbiAgICAgICAgICBib2FyZFtyb3ddW2NvbF0uaGFzQmVlbkhpdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9hcmRbcm93XVtjb2xdID0gXCJtaXNzXCI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc0FsbFNoaXBTdW5rKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXS5oYXNCZWVuSGl0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICByZXNldEJvYXJkXG4gICAgfTtcbiAgfVxuICAiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllckZhY3RvcnlcIjtcbmltcG9ydCBnYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lQ29udHJvbGxlcigpeyAgICBcblxuICAgIC8vIGluaXRpYWxpemUgZ2FtZWJvYXJkXG4gICAgY29uc3QgcGxheWVyMUdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpOyBcbiAgICBjb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICAgIFxuICAgIC8vIG1ha2UgcGxheWVyIHNoaXBcbiAgICBjb25zdCBzaGlwNHBsYXllciA9IHNoaXBGYWN0b3J5KFwic2hpcDRcIiwgNCk7XG4gICAgIGNvbnN0IHNoaXAzcGxheWVyID0gc2hpcEZhY3RvcnkoXCJzaGlwM1wiLCAzKTtcbiAgICAgY29uc3Qgc2hpcDJwbGF5ZXIgPSBzaGlwRmFjdG9yeShcInNoaXAyXCIsIDIpO1xuICAgICBjb25zdCBzaGlwMXBsYXllciA9IHNoaXBGYWN0b3J5KFwic2hpcDFcIiwgMSk7XG4gICAgIGNvbnN0IGFycmF5U2hpcFBsYXllciA9IFtzaGlwNHBsYXllcixzaGlwM3BsYXllcixzaGlwMnBsYXllcixzaGlwMXBsYXllcl1cbiAgXG4gICAgLy8gbWFrZSBjb21wdXRlciBzaGlwXG4gICAgY29uc3Qgc2hpcDRjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDRDb21wXCIsNCk7XG4gICAgY29uc3Qgc2hpcDNjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDNDb21wXCIsMyk7XG4gICAgY29uc3Qgc2hpcDJjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDJDb21wXCIsMik7XG4gICAgY29uc3Qgc2hpcDFjb21wdXRlciA9IHNoaXBGYWN0b3J5KFwic2hpcDFDb21wXCIsMSk7XG4gIFxuICAgIGNvbnN0IGFycmF5U2hpcFBsYXllckVuZW15ID0gW3NoaXA0Y29tcHV0ZXIsIHNoaXAzY29tcHV0ZXIsIHNoaXAyY29tcHV0ZXIsIHNoaXAxY29tcHV0ZXJdO1xuICAgIFxuICAgIC8vIHBsYWNlIGNvbXB1dGVyIHNoaXAgcmFuZG9tbHlcbiAgICBmdW5jdGlvbiBwbGFjZUNvbXB1dGVyU2hpcFJhbmRvbWx5KCl7XG4gICAgICB3aGlsZShhcnJheVNoaXBQbGF5ZXJFbmVteS5sZW5ndGggIT09IDApe1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGFycmF5U2hpcFBsYXllckVuZW15LnNoaWZ0KCk7XG4gICAgICAgIGxldCByYW5kb21Sb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpIDwgMCA/IDAgOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpXG4gICAgICAgIGxldCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpIDwgMCA/IDAgOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSAoY3VycmVudFNoaXAuZ2V0TGVuZ3RoKCkgLSAxKSkpXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMSA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICBsZXQgaXNWYWxpZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmlzUGxhY2VTaGlwVmFsaWRDb21wdXRlcihjdXJyZW50U2hpcCxyYW5kb21Sb3csIHJhbmRvbUNvbCwgZGlyZWN0aW9uKVxuICAgICAgICAgIHdoaWxlKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgIHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSkgPCAwID8gMCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSlcbiAgICAgICAgICAgIHJhbmRvbUNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSkgPCAwID8gMCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIChjdXJyZW50U2hpcC5nZXRMZW5ndGgoKSAtIDEpKSlcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAxID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgICBpc1ZhbGlkID0gY29tcHV0ZXJHYW1lQm9hcmQuaXNQbGFjZVNoaXBWYWxpZENvbXB1dGVyKGN1cnJlbnRTaGlwLHJhbmRvbVJvdywgcmFuZG9tQ29sLCBkaXJlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wdXRlckdhbWVCb2FyZC5wbGFjZVNoaXBDb21wdXRlcihjdXJyZW50U2hpcCwgcmFuZG9tUm93LCByYW5kb21Db2wsIGRpcmVjdGlvbilcbiAgICAgICAgfSAgXG4gICAgfVxuICBcbiAgICBwbGFjZUNvbXB1dGVyU2hpcFJhbmRvbWx5KClcbiAgICBcbiAgICAvLyBpbml0aWFsaXplIHBsYXllciBcbiAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKFwicGxheWVyMVwiLCBwbGF5ZXIxR2FtZUJvYXJkKTtcbiAgICBjb25zdCBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyXCIsIGNvbXB1dGVyR2FtZUJvYXJkKTtcbiAgICBjb25zdCBwbGF5ZXJzID0gW3BsYXllcjEsIGNvbXB1dGVyXTtcbiAgICBcbiAgICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyc1swXTtcbiAgICBsZXQgYWN0aXZlUGxheWVyRW5lbXkgPSBwbGF5ZXJzWzFdO1xuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGlzT3ZlciA9IDA7IFxuICAgIGxldCBpc1JvdW5kU3RhcnQgPSAwOyAvLyBpZiBwbGF5ZXIgaGFzbnQgcGxhY2UgYWxsIHRoZSBzaGlwLCB0aGVuIGVuZW15IGJvYXJkIHdvbnQgc2hvdyB1cFxuICAgIFxuICAgIGNvbnN0IGdldEFycmF5U2hpcFBsYXllckxhdGVzdENvbmRpdGlvbiA9ICgpID0+IGFycmF5U2hpcFBsYXllclxuICAgIFxuICAgIGNvbnN0IGlzUm91bmRTdGFydENoZWNrID0gKCkgPT4ge1xuICAgICAgaWYoYXJyYXlTaGlwUGxheWVyLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGlzUm91bmRTdGFydCA9IDFcbiAgICAgICAgcmV0dXJuIGlzUm91bmRTdGFydDtcbiAgICAgIH19O1xuICAgIFxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVBZnRlclJlc2V0KCl7XG4gICAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcnNbMF07XG4gICAgICAgIGFjdGl2ZVBsYXllckVuZW15ID0gcGxheWVyc1sxXTtcbiAgICAgICAgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgaXNPdmVyID0gMDtcbiAgICAgICAgaXNSb3VuZFN0YXJ0ID0gMFxuICAgICAgICBcbiAgICAgICAgc2hpcDRwbGF5ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBzaGlwM3BsYXllci5yZXNldFNoaXBTdGF0ZSgpXG4gICAgICAgIHNoaXAycGxheWVyLnJlc2V0U2hpcFN0YXRlKClcbiAgICAgICAgc2hpcDFwbGF5ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXIucHVzaChzaGlwNHBsYXllcilcbiAgICAgICAgYXJyYXlTaGlwUGxheWVyLnB1c2goc2hpcDNwbGF5ZXIpXG4gICAgICAgIGFycmF5U2hpcFBsYXllci5wdXNoKHNoaXAycGxheWVyKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXIucHVzaChzaGlwMXBsYXllcilcbiAgICAgICAgXG4gICAgICAgIHNoaXA0Y29tcHV0ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBzaGlwM2NvbXB1dGVyLnJlc2V0U2hpcFN0YXRlKClcbiAgICAgICAgc2hpcDJjb21wdXRlci5yZXNldFNoaXBTdGF0ZSgpXG4gICAgICAgIHNoaXAxY29tcHV0ZXIucmVzZXRTaGlwU3RhdGUoKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXJFbmVteS5wdXNoKHNoaXA0Y29tcHV0ZXIpXG4gICAgICAgIGFycmF5U2hpcFBsYXllckVuZW15LnB1c2goc2hpcDNjb21wdXRlcilcbiAgICAgICAgYXJyYXlTaGlwUGxheWVyRW5lbXkucHVzaChzaGlwMmNvbXB1dGVyKVxuICAgICAgICBhcnJheVNoaXBQbGF5ZXJFbmVteS5wdXNoKHNoaXAxY29tcHV0ZXIpXG4gICAgICAgIHBsYWNlQ29tcHV0ZXJTaGlwUmFuZG9tbHkoKVxuICAgICAgfVxuICAgICAgXG4gIFxuICAgICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyID0gKCkgPT4gYWN0aXZlUGxheWVyO1xuICAgICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyTmFtZSA9ICgpID0+IGdldEFjdGl2ZVBsYXllcigpLmdldE5hbWUoKTsgLy8gY2hhaW4gbGlrZSB0aGlzIHRvIGJlIGR5bmFtaWMgKGJ1ZyAxLTJob3VycylcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckJvYXJkID0gKCkgPT4gZ2V0QWN0aXZlUGxheWVyKCkuZ2V0Qm9hcmRPYmooKS5nZXRCb2FyZCgpO1xuICAgICAgY29uc3QgZ2V0QWN0aXZlUGxheWVyQm9hcmRPYmogPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXIoKS5nZXRCb2FyZE9iaigpO1xuICBcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckVuZW15ID0gKCkgPT4gYWN0aXZlUGxheWVyRW5lbXk7XG4gICAgICBjb25zdCBnZXRBY3RpdmVQbGF5ZXJFbmVteU5hbWUgPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXJFbmVteSgpLmdldE5hbWUoKTtcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckVuZW15Qm9hcmQgPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXJFbmVteSgpLmdldEJvYXJkT2JqKCkuZ2V0Qm9hcmQoKTtcbiAgICAgIGNvbnN0IGdldEFjdGl2ZVBsYXllckVuZW15Qm9hcmRPYmogPSAoKSA9PiBnZXRBY3RpdmVQbGF5ZXJFbmVteSgpLmdldEJvYXJkT2JqKCk7XG4gIFxuICAgICAgY29uc3QgZ2V0UmVzdWx0TWVzc2FnZSA9ICgpID0+IHJlc3VsdDtcbiAgXG4gICAgICBjb25zdCBzd2l0Y2hQbGF5ZXJUdXJuID0gKCkgPT4ge1xuICAgICAgICBhY3RpdmVQbGF5ZXIgPSBhY3RpdmVQbGF5ZXIgPT09IHBsYXllcnNbMF0gPyBwbGF5ZXJzWzFdIDogcGxheWVyc1swXTtcbiAgICAgICAgYWN0aXZlUGxheWVyRW5lbXkgPSBhY3RpdmVQbGF5ZXJFbmVteSA9PT0gcGxheWVyc1sxXSA/IHBsYXllcnNbMF0gOiBwbGF5ZXJzWzFdO1xuICBcbiAgICAgIH1cbiAgICAgIFxuICBcbiAgICAgIGNvbnN0IHBsYXlSb3VuZCA9IChyb3csY29sKSA9PiB7IC8vIGFkZCB0aGUgZ3VhcmQoaWYgcm93IGNvbCBhbHJlYWR5IGJlZW4gaGl0LCB0aGVuIGRvIG5vdGhpbmcgb24gdGhlIERPTSksIHBsYXlSb3VuZCBvbmx5IGNhcmUgZm9yIHRoZSBsb2dpY1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBhY3RpdmVQbGF5ZXJFbmVteS5nZXRCb2FyZE9iaigpLmdldEJvYXJkQXRJbmRleChyb3csIGNvbCkgPT09IFwibWlzc1wiIHx8XG4gICAgICAgICAgICBhY3RpdmVQbGF5ZXJFbmVteS5nZXRCb2FyZE9iaigpLmdldEJvYXJkQXRJbmRleChyb3csIGNvbCkuaGFzQmVlbkhpdCA9PT0gdHJ1ZSB8fFxuICAgICAgICAgICAgaXNPdmVyID09PSAxXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBcbiAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFjdGl2ZVBsYXllci5sYXVuY2hBdHRhY2soYWN0aXZlUGxheWVyRW5lbXkuZ2V0Qm9hcmRPYmooKSxyb3csY29sKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5ZXJzLmxlbmd0aDsgaSs9IDEpIHtcbiAgICAgICAgICAgICAgaWYocGxheWVyc1tpXS5nZXRCb2FyZE9iaigpLmlzQWxsU2hpcFN1bmsoKSl7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYCR7cGxheWVyc1tNYXRoLmFicyhpLTEpXS5nZXROYW1lKCl9IGlzIHRoZSB3aW5uZXJgXG4gICAgICAgICAgICAgICAgaXNPdmVyID0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgdGhlcmUgaXMgd2lubmVyIGFscmVhZHlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoUGxheWVyVHVybigpO1xuICAgICAgICAgICAgaWYoYWN0aXZlUGxheWVyLmdldE5hbWUoKSA9PT0gXCJjb21wdXRlclwiKXtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21Db2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrQ2VsbCA9IGFjdGl2ZVBsYXllckVuZW15LmdldEJvYXJkT2JqKCkuZ2V0Qm9hcmRBdEluZGV4KHJhbmRvbVJvdywgcmFuZG9tQ29sKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKHR5cGVvZiBjaGVja0NlbGwgPT09IFwib2JqZWN0XCIgJiYgY2hlY2tDZWxsLmhhc0JlZW5IaXQgPT09IHRydWUpIHx8IGNoZWNrQ2VsbCA9PT0gXCJtaXNzXCIpIHsgLy8gaWYgdGhlIGNlbGwgaXMgb2JqZWN0JiZhbHJlYWR5SGl0IE9SIGNlbGwgPSAnbWlzcycsIHdlIGdlbmVyYXRlIG5ldyByYW5kb21Sb3cgcmFuZG9tQ29sLlxuICAgICAgICAgICAgICAgICAgcmFuZG9tUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgcmFuZG9tQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgY2hlY2tDZWxsID0gYWN0aXZlUGxheWVyRW5lbXkuZ2V0Qm9hcmRPYmooKS5nZXRCb2FyZEF0SW5kZXgocmFuZG9tUm93LCByYW5kb21Db2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBhY3RpdmVQbGF5ZXIubGF1bmNoQXR0YWNrKGFjdGl2ZVBsYXllckVuZW15LmdldEJvYXJkT2JqKCkscmFuZG9tUm93LHJhbmRvbUNvbCk7XG4gICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWVycy5sZW5ndGg7IGkrPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyc1tpXS5nZXRCb2FyZE9iaigpLmlzQWxsU2hpcFN1bmsoKSl7XG4gICAgICAgICAgICAgICAgICByZXN1bHQgPSBgJHtwbGF5ZXJzW01hdGguYWJzKGktMSldLmdldE5hbWUoKX0gaXMgdGhlIHdpbm5lcmBcbiAgICAgICAgICAgICAgICAgIGlzT3ZlciA9IDE7XG4gICAgICAgICAgICAgICAgICBzd2l0Y2hQbGF5ZXJUdXJuKCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgdGhlcmUgaXMgd2lubmVyIGFscmVhZHlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaFBsYXllclR1cm4oKTtcbiAgICAgICAgICAgIH1cbiAgXG4gICAgICAgIFxuICAgICAgICB9XG4gIFxuICAgICAgICBjb25zdCByZXNldEdhbWVDb250cm9sbGVyID0gKCkgPT4ge1xuICAgICAgICAgIHBsYXllcjFHYW1lQm9hcmQucmVzZXRTaGlwU3RhdGUoKTtcbiAgICAgICAgICBjb21wdXRlckdhbWVCb2FyZC5yZXNldFNoaXBTdGF0ZSgpO1xuICAgICAgICAgIGluaXRpYWxpemVBZnRlclJlc2V0KCk7XG4gICAgICAgIH0gICAgXG4gIFxuICAgICAgICBjb25zdCBpc0dhbWVPdmVyID0gKCkgPT4gaXNPdmVyXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwbGF5Um91bmQsXG4gICAgICAgIGdldEFjdGl2ZVBsYXllck5hbWUsXG4gICAgICAgIGdldEFjdGl2ZVBsYXllckVuZW15TmFtZSxcbiAgICAgICAgZ2V0QWN0aXZlUGxheWVyQm9hcmQsXG4gICAgICAgIGdldEFjdGl2ZVBsYXllckVuZW15Qm9hcmQsXG4gICAgICAgIGdldEFjdGl2ZVBsYXllckJvYXJkT2JqLFxuICAgICAgICBnZXRBY3RpdmVQbGF5ZXJFbmVteUJvYXJkT2JqLFxuICAgICAgICBnZXRSZXN1bHRNZXNzYWdlLFxuICAgICAgICBnZXRBcnJheVNoaXBQbGF5ZXJMYXRlc3RDb25kaXRpb24sXG4gICAgICAgIHJlc2V0R2FtZUNvbnRyb2xsZXIsXG4gICAgICAgIGlzUm91bmRTdGFydENoZWNrLFxuICAgICAgICBpc0dhbWVPdmVyXG4gICAgICB9O1xuICB9XG4gICIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXllcihuYW1lLCBib2FyZCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0sXG4gICAgICBnZXRCb2FyZE9iaigpIHtcbiAgICAgICAgcmV0dXJuIGJvYXJkOyAvLyB0aGlzIHdpbGwgcmV0dXJuIG9iamVjdFxuICAgICAgfSxcbiAgICAgIGxhdW5jaEF0dGFjayhlbmVteUdhbWVCb2FyZCwgcm93LCBjb2wpIHtcbiAgICAgICAgZW5lbXlHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCk7XG4gICAgICB9LFxuICAgIH07XG4gIFxufVxuIiwiaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2dhbWVDb250cm9sbGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2NyZWVuQ29udHJvbGxlcigpe1xuICAgIGNvbnN0IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIgPSBnYW1lQ29udHJvbGxlcigpO1xuICAgIGNvbnN0IHBsYXllckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBjb21wdXRlckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXItY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHdpbm5lclJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0XCIpO1xuICAgIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpO1xuICAgIGNvbnN0IHNoaXBDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWNvbnRhaW5lclwiKTtcbiAgICBsZXQgaXNSb3RhdGUgPSAwO1xuICAgIC8vIGV2ZW4gdGhvdWdoIHRoZSBhY3RpdmUgcGxheWVyIGlzIGdvaW5nIHRvIHN3aXRjaCwgYnV0IGV2ZXJ5IHRpbWUgcGxheVJvdW5kKCkgdGhlIGFjdGl2ZVBsYXllciB3aWxsIGJlIGJhY2sgdG8gcGxheWVyLCBzbyBkb2VzbnQgcmVhbGx5IG1hdHRlci4gaW4gc2ltcGxlIHRlcm1zLCBhZnRlciBldmVyeSBwbGF5Um91bmQsIGFjdGl2ZVBsYXllciB3aWxsIGJlIHRoZSBodW1hbjEvcGxheWVyMS4gYWN0aXZlUGxheWVyIHN0YXRlIGFsd2F5cyBwbGF5ZXIxXG4gICAgXG4gIFxuICAgIGNvbnN0IHVwZGF0ZVNjcmVlbiA9ICgpID0+IHtcbiAgICAgIHBsYXllckNvbnRhaW5lckRpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBjb21wdXRlckNvbnRhaW5lckRpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QWN0aXZlUGxheWVyQm9hcmQoKTsgLy8gdGFrZSBsYXRlc3QgY29uZGl0aW9uIG9mIHRoZSBib2FyZFxuICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QWN0aXZlUGxheWVyRW5lbXlCb2FyZCgpO1xuICBcbiAgICAgIC8vIHVwZGF0ZSBwbGF5ZXJCb2FyZFxuICAgICAgcGxheWVyQm9hcmQuZm9yRWFjaCgocm93LGluZGV4SSkgPT4ge1xuICAgICAgICByb3cuZm9yRWFjaCgoY2VsbCxpbmRleEopID0+IHtcbiAgICAgICAgICBjb25zdCBjZWxsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBjZWxsRGl2LmNsYXNzTGlzdC5hZGQoXCJjZWxsLXBsYXllclwiKTtcbiAgICAgICAgICBjZWxsRGl2LmRhdGFzZXQucm93ID0gaW5kZXhJO1xuICAgICAgICAgIGNlbGxEaXYuZGF0YXNldC5jb2x1bW4gPSBpbmRleEo7XG4gICAgICAgICAgaWYodHlwZW9mIGNlbGwgPT09IFwib2JqZWN0XCIgJiYgY2VsbC5oYXNCZWVuSGl0ID09PSBmYWxzZSl7XG4gICAgICAgICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgY2VsbCA9PT0gXCJvYmplY3RcIiAmJiBjZWxsLmhhc0JlZW5IaXQgPT09IHRydWUpKSB7XG4gICAgICAgICAgICBjZWxsRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjZWxsID09PSBcIm1pc3NcIikge1xuICAgICAgICAgICAgY2VsbERpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2VsbERpdi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZSA9PntcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgY2VsbERpdi5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSk9PntcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRyb3BTaGlwKGUpO30pXG4gICAgICAgICAgcGxheWVyQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNlbGxEaXYpO1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIFxuICBcbiAgXG4gICAgICAvLyB1cGRhdGUgY29tcHV0ZXJCb2FyZCBpZiBwbGF5ZXIgYWxyZWFkeSBwdXQgYWxsIHRoZSBzaGlwXG4gICAgICBpZihnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmlzUm91bmRTdGFydENoZWNrKCkgPT09IDEpe1xuICAgICAgICBjb21wdXRlckJvYXJkLmZvckVhY2goKHJvdyxpbmRleEkpID0+IHtcbiAgICAgICAgICByb3cuZm9yRWFjaCgoY2VsbCxpbmRleEopID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgY2VsbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgICAgIGNlbGxCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGNlbGxCdXR0b24uZGF0YXNldC5yb3cgPSBpbmRleEk7XG4gICAgICAgICAgICBjZWxsQnV0dG9uLmRhdGFzZXQuY29sdW1uID0gaW5kZXhKO1xuICAgICAgICAgICAgaWYgKCh0eXBlb2YgY2VsbCA9PT0gXCJvYmplY3RcIiAmJiBjZWxsLmhhc0JlZW5IaXQgPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgIGNlbGxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbCA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgICAgICAgY2VsbEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZigodHlwZW9mIGNlbGwgPT09IFwib2JqZWN0XCIgJiYgY2VsbC5oYXNCZWVuSGl0ID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgY2VsbEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcHV0ZXJDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY2VsbEJ1dHRvbik7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSkgIFxuICAgICAgfVxuICBcbiAgICAgXG4gIFxuICAgIGZ1bmN0aW9uIHNob3dXaW5uZXIoKXtcbiAgICAgIHdpbm5lclJlc3VsdC50ZXh0Q29udGVudCA9IGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0UmVzdWx0TWVzc2FnZSgpO1xuICAgICAgY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICByZXNldEJ0bi50ZXh0Q29udGVudCA9IFwicmVzZXRCb2FyZFwiO1xuICAgICAgd2lubmVyUmVzdWx0LmFwcGVuZENoaWxkKHJlc2V0QnRuKTtcbiAgICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICBnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLnJlc2V0R2FtZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgd2lubmVyUmVzdWx0LnRleHRDb250ZW50ID0gZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRSZXN1bHRNZXNzYWdlKCk7XG4gICAgICAgIHVwZGF0ZVNjcmVlbigpO1xuICAgICAgICBzaGlwQ29udGFpbmVycy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIixcInRydWVcIikpXG4gICAgICAgIHJlc2V0QnRuLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICBcbiAgICAgLy8gaWYgc29tZW9uZSB3aW5zLCBkaXNwbGF5IHRoZSB3aW5uZXIgdG8gdGhlIERPTS4gXG4gICAgIGlmKGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuaXNHYW1lT3ZlcigpID09PSAxKSB7XG4gICAgICBzaG93V2lubmVyKCk7XG4gICAgfVxuICAgIH1cbiAgXG4gICAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyQm9hcmQoZSl7IC8vIGZvciBhdHRhY2tpbmcgY29tcHV0ZXJCb2FyZFxuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3cgPSBlLnRhcmdldC5kYXRhc2V0LnJvdztcbiAgICAgIGNvbnN0IHNlbGVjdGVkQ29sdW1uID0gZS50YXJnZXQuZGF0YXNldC5jb2x1bW47XG4gIFxuICAgICAgaWYoIXNlbGVjdGVkUm93IHx8ICFzZWxlY3RlZENvbHVtbil7cmV0dXJufSAvLyBtYWtlIHN1cmUgY2xpY2sgdGhlIGNlbGwgbm90IHRoZSBnYXBzIGluYmV0d2VlblxuICBcbiAgICAgIGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIucGxheVJvdW5kKHNlbGVjdGVkUm93LHNlbGVjdGVkQ29sdW1uKTtcbiAgICAgIHVwZGF0ZVNjcmVlbigpO1xuICAgIH1cbiAgXG4gICAgY29tcHV0ZXJDb250YWluZXJEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsY2xpY2tIYW5kbGVyQm9hcmQpO1xuICBcbiAgXG4gICAgZnVuY3Rpb24gcm90YXRlU2hpcCgpe1xuICAgICAgc2hpcENvbnRhaW5lcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKFwicm90YXRlXCIpO1xuICAgICAgfSlcbiAgICAgIGlmKGlzUm90YXRlID09PSAwKSB7aXNSb3RhdGUgPSAxfSAgZWxzZSB7aXNSb3RhdGUgPSAwfSA7XG4gICAgfVxuICBcbiAgXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3RhdGVTaGlwKVxuICBcbiAgXG4gICAgdXBkYXRlU2NyZWVuKCk7Ly8gaW5pdGlhbCByZW5kZXJcbiAgICBcbiAgXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0ZXIoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQ9PntcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gaW5pdGlhbGl6ZSBkcmFnIGl0ZW1cbiAgICBzaGlwQ29udGFpbmVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgZHJhZ1N0YXJ0ZXIoaXRlbSk7XG4gICAgfSlcbiAgXG4gICAgY29uc3QgY2VsbHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGwtcGxheWVyXCIpXG4gIFxuICAgIGNlbGxzRGl2LmZvckVhY2goY2VsbD0+e1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZSA9PntcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgIH0pXG4gICAgfSlcbiAgXG4gICAgY2VsbHNEaXYuZm9yRWFjaChjZWxsPT57XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKT0+e1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpKSAgICBcbiAgICAgICAgLy8gY29uc3QgY29vcmRYID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3cpOyAvLyBET05UIEZPUkdFVCBQQVJTRUlOVCwgRVZFUlkgSU5UIE9SIE5VTUJFUiBIQVZFIFRPIEJFIFBBUlNFRCAoRVJST1IgMS0yIEhPVVJTKVxuICAgICAgICAvLyBjb25zdCBjb29yZFkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgIGRyb3BTaGlwKGUpO1xuICAgICAgICB1cGRhdGVTY3JlZW4oKTtcbiAgICAgfSlcbiAgICB9KVxuICBcbiAgICAvLyB3aGVuIGRyb3Agc2hpcCwgcnVuIHBsYWNlU2hpcENvbXB1dGVyIG1ldGhvZCBhbmQgYWxzbyBjaGVjayBpZiBhcnJheVNoaXAgZW1wdHk/IGlmIHllcyB0aGVuIGdhbWUgc3RhcnRcbiAgICBmdW5jdGlvbiBkcm9wU2hpcChlKXtcbiAgICAgIGNvbnN0IHNoaXBUeXBlID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgICBjb25zdCBjb29yZGluYXRlWCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93KTtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVZID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRBcnJheVNoaXBQbGF5ZXJMYXRlc3RDb25kaXRpb24oKS5sZW5ndGg7IGkrPTEpe1xuICAgICAgICAgICAgaWYgKGdhbWVDb250cm9sbGVyUGxhY2Vob2xkZXIuZ2V0QXJyYXlTaGlwUGxheWVyTGF0ZXN0Q29uZGl0aW9uKClbaV0uZ2V0U2hpcFR5cGUoKSA9PT0gc2hpcFR5cGUgJiYgZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRBY3RpdmVQbGF5ZXJCb2FyZE9iaigpLmlzUGxhY2VTaGlwVmFsaWRQbGF5ZXIoZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRBcnJheVNoaXBQbGF5ZXJMYXRlc3RDb25kaXRpb24oKVtpXSwgY29vcmRpbmF0ZVgsIGNvb3JkaW5hdGVZLCBpc1JvdGF0ZSA9PT0gMCA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiICkpe1xuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzaGlwVHlwZX1gKS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIixcImZhbHNlXCIpXG4gICAgICAgICAgICAgIGNvbnN0IHNwbGljZWRJdGVtID0gZ2FtZUNvbnRyb2xsZXJQbGFjZWhvbGRlci5nZXRBcnJheVNoaXBQbGF5ZXJMYXRlc3RDb25kaXRpb24oKS5zcGxpY2UoaSwxKVswXTsgLy8gdXNlIFswXSBjYXVzZSBpbiB0aGlzIGNhc2UsIHRoZXMgc3BsaWNlIHJldHVybiBhcnJheVxuICAgICAgICAgICAgICBnYW1lQ29udHJvbGxlclBsYWNlaG9sZGVyLmdldEFjdGl2ZVBsYXllckJvYXJkT2JqKCkucGxhY2VTaGlwUGxheWVyKHNwbGljZWRJdGVtLGNvb3JkaW5hdGVYLGNvb3JkaW5hdGVZLGlzUm90YXRlID09IDAgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIik7XG4gICAgICAgICAgICAgIHVwZGF0ZVNjcmVlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBGYWN0b3J5KHR5cGUsIGxlbmd0aCkge1xuICBsZXQgc2hpcEhpdCA9IDA7XG4gIGNvbnN0IHJlc2V0U2hpcFN0YXRlID0gKCkgPT4ge1xuICAgIHNoaXBIaXQgPSAwO1xuICB9O1xuICBjb25zdCBnZXRTaGlwVHlwZSA9ICgpID0+IHR5cGU7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIHNoaXBIaXQgKz0gMTtcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmIChzaGlwSGl0ID09PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIHJldHVybiB7XG4gICAgcmVzZXRTaGlwU3RhdGUsXG4gICAgZ2V0U2hpcFR5cGUsXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgZ2V0IGhlYWx0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aCAtIHRoaXMuc2hpcEhpdDtcbiAgICB9LFxuICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgXCIuL3N0eWxlLmNzc1wiIC8vIGFmdGVyIGZpbmlzaCBldmVyeXRoaW5nLCBkb250IGZvcmdldCB0byBkZWxldGUgc2NyaXB0VGFnIGFuZCBsaW5rVGFnICggdGhpcyB3aWxsIG1ha2UgamVzdCBlcnJvciwgdHJ5IHJlc2VhcmNoIGFib3V0IGhvdyB0byBpbXBvcnQgY3NzIGZyb20gc3JjIHNvIGl0IGNhbiBtb3ZlIHRvIGRpc3QpXG4vLyBob3cgdG8gbWFrZSBzdHlsZS5jc3MgZnJvbSBzcmMgdG8gZGlzdCBhZnRlciB3ZWJwYWNraW5nPyBhbHNvLCBsaXZlc2VydmVyIHN0aWxsIG5lZWRlZCBjYXVzZSBpZiBpIGVkaXQgc29tZSB0ZW1wbGF0ZS5odG1sIHdoaWxlIG5wbSAtLXdhdGNoLCB0aGVuIGl0IHdvbnQgY2hhbmdlIHRoZSBodG1sLCBpIG5lZWQgdG8gcmVvcGVuLiBzbyB0aGUgaWRlYWwgSU1PIGxpdmVTZXJ2ZXIgaW4gU1JDLCBhZnRlciBmaW5hbChodG1sY3NzKSB0aGVuIG5weHdlYnBhY2tcblxuaW1wb3J0IHNjcmVlbkNvbnRyb2xsZXIgZnJvbSBcIi4vc2NyZWVuQ29udHJvbGxlclwiO1xuXG5cbnNjcmVlbkNvbnRyb2xsZXIoKTtcblxuLy8gYW5vdGhlciBpZGVhIChldmVyeSBjZWxsIHB1c2ggYW5kIGNlbGxPYmogLCB0aGVuIGFkZCBpc0F2YWlsYWJsZSBwcm9wIHdoZW4gcGxhY2luZyBTaGlwIHRvIGFkZCBjb250cmFpbnRzIGNhbnQgcHV0IHN1cnJvdW5kIG9uZXBsdXNDb29yZHMpXG5cbi8vIGFub3RoZXIgdGhpbmdzIHRvIGRvLCBtYWtlIHRoZSBjb21wdXRlciBzbWFydFxuXG4vLyBsYXRlciBvbiBjYW4gcG9saXNoIHRoZSBkZXNpZ24gLCByZWZhY3RvciB0byBtYWtlIGNvZGUgY2xlYW5lcihtYXliZT8pXG5cbi8vIHRoaW5ncyB0aGF0IGFsd2F5cyBoYXZlIHRvIGJlIGNvbnNpZGVyZWQgLCB3aGVuIGNyZWF0aW5nIHNvbWV0aGluZywganVzdCBkbyB0aGUgbW9kZWwgZmlyc3QgKGNhbiBiZSBwbGF5ZWQgYnkgdXNpbmcgY29uc29sZS5sb2cpLCBET00gb25seSBnZXQgZGF0YSBmcm9tIHRoZSBtb2RlbCwgbm8gaGFuZGxpbmcgbG9naWMgaW4gRE9NLFxuLy8gc28gZWRnZSBjYXNlIGhhbmRsZWQgaW4gdGhlIG1vZGVsLlxuXG4vLyBjYW4gc2VwYXJhdGUgZWFjaCBGRiB0byBlYWNoIGZpbGUgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9