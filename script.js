import { Game } from "gameLogic.js";

disbaleTiles();

let game;
let gameAction = document.querySelector(".gameAction");
let gameText = document.createElement("p");
let startButton = document.createElement("button");
let resetBtn = document.querySelector(".resetBtn");
resetBtn.addEventListener("click", gameReset);

gameAction.appendChild(startButton);
startButton.textContent = "START GAME";
startButton.addEventListener("click", () => {
    gameLoop();
})

function updatePlayText(){
    gameText.textContent = `It's ${game.getCurrentPlayerName()}'s turn!`
}

function gameLoop(){
    game = new Game();
    gameAction.removeChild(startButton);
    gameAction.appendChild(gameText);

    updatePlayText();

    let tiles = Array.from(document.getElementsByClassName("tile"));

    tiles.forEach(tile => {
        tile.setAttribute("class", "tile active")
        tile.addEventListener("click", clickTileHandler)
    });
}

function clickTileHandler(){
    const row = parseInt(this.dataset.row, 10);
    const col = parseInt(this.dataset.col, 10);

    if(game.isValidTile(row, col)){
        game.markTile(row, col);

        if(game.isVictory()){
            gameText.textContent = `${game.getCurrentPlayerName()} wins!`;
            disableTiles()
            return;
        }
        if(game.isBoardFull()){
            gameText.textContent = "It's a tie!";
            disbaleTiles();
            return;
        }

        game.switchTurn();
        updatePlayText();
    }
}

function disbaleTiles(){
    let tiles = Array.from(document.getElementsByClassName("tile"));

    tiles.forEach(tile => {
        tile.setAttribute("class", "tile disabled")
        tile.removeEventListener("click", clickTileHandler)
    });
}

function gameReset(){
    game.resetGame();
    gameAction.removeChild(gameText);
    gameAction.appendChild(startButton);
    disbaleTiles();
    document.querySelectorAll('.tile').forEach(tile => {
        tile.textContent = '';
    });
}