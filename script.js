import { Game } from "./gameLogic.js";


let game;
let gameAction = document.querySelector(".gameAction");
let gameText = document.createElement("p");
let resetBtn = document.querySelector(".resetBtn");


document.getElementById("startButton").addEventListener("click", gameLoop);
resetBtn.addEventListener("click", gameReset);

function updatePlayText(){
    gameText.textContent = `It's ${game.getCurrentPlayerName()}'s turn!`
}

function gameLoop(){
    game = new Game();
    gameAction.removeChild(document.getElementById("startButton"));
    gameAction.appendChild(gameText);

    updatePlayText();

    let tiles = Array.from(document.getElementsByClassName("tile"));

    tiles.forEach(tile => {
        tile.classList.add("active");
        tile.addEventListener("click", clickTileHandler)
    });
}

function clickTileHandler(){
    const row = parseInt(this.dataset.row, 10);
    const col = parseInt(this.dataset.col, 10);

    if(game.isValidTile(row, col)){
        game.markTile(row, col); //marks the tile

        if(game.isVictory()){
            gameText.textContent = `${game.getCurrentPlayerName()} wins!`;
            disableTiles()
            return;
        }
        if(game.isBoardFull()){
            gameText.textContent = "It's a tie!";
            disableTiles();
            return;
        }

        game.switchTurn();
        updatePlayText();
    }
}

function disableTiles(){
    let tiles = Array.from(document.getElementsByClassName("tile"));
    tiles.forEach(tile => {
        tile.classList.add("disabled");
        tile.removeEventListener("click", clickTileHandler);
    });
}

function gameReset(){
    game.resetGame();
    gameAction.removeChild(gameText);
    gameAction.innerHTML += '<button id="startButton">Start Game</button>';
    disableTiles();
    document.querySelectorAll('.tile').forEach(tile => {
        tile.textContent = '';
    });
    document.getElementById("startButton").addEventListener("click", gameLoop);
}