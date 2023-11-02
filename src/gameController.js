import Player from "./playerFactory";
import gameBoard from "./gameBoard";
import shipFactory from "./shipFactory"

export default function gameController(){    

    // initialize gameboard
    const player1GameBoard = gameBoard(); 
    const computerGameBoard = gameBoard();
    
    // make player ship
    const ship4player = shipFactory("ship4", 4);
     const ship3player = shipFactory("ship3", 3);
     const ship2player = shipFactory("ship2", 2);
     const ship1player = shipFactory("ship1", 1);
     const arrayShipPlayer = [ship4player,ship3player,ship2player,ship1player]
  
    // make computer ship
    const ship4computer = shipFactory("ship4Comp",4);
    const ship3computer = shipFactory("ship3Comp",3);
    const ship2computer = shipFactory("ship2Comp",2);
    const ship1computer = shipFactory("ship1Comp",1);
  
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
    const player1 = Player("player1", player1GameBoard);
    const computer = Player("computer", computerGameBoard);
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
  