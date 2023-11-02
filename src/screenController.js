import gameController from "./gameController"

export default function screenController(){
    const gameControllerPlaceholder = gameController();
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
  