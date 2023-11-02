export default function Player(name, board) {
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
