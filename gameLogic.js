import { Player } from "./player.js";

export class Game {
    constructor(){
        this._board = new Array(3).fill(null).map(() => new Array(3).fill(null));

        this._players = [
            new Player("Player one", "X"),
            new Player("Player two", "O"),
        ];
        this._currentPlayer = 0;
    }

    switchTurn() {
    this._currentPlayer = (this._currentPlayer + 1) % this._players.length;
    }

    markTile(row, col){
        if(this.isValidTile(row, col)){
            const symbol = this._players[this._currentPlayer].getSymbol();
            this._board[row][col] = symbol;

            let textSymbol = document.createElement("p");
            textSymbol.textContent = symbol;
            document.querySelector(`[data-row="${row}"][data-col="${col}"]`).appendChild(textSymbol);
            return;
        }
        throw new Error("Invalid tile");
    }

    isValidTile(row, col){
        return this._board[row][col] === null;
    }

    isVictory(){
        const symbols = ['X', 'O'];
        for(let i = 0; i < 3; i++){
            if((this._board[i][0] === this._board[i][1] && this._board[i][0] === this._board[i][2]) && symbols.includes(this._board[i][0])) {
                return true;
            }
            if((this._board[0][i] === this._board[1][i] && this._board[0][i] === this._board[2][i]) && symbols.includes(this._board[0][i])) {
                return true;
            }
        }
        if((this._board[0][0] === this._board[1][1] && this._board[0][0] === this._board[2][2]) && symbols.includes(this._board[0][0])) {
                return true;
            }
            if((this._board[0][2] === this._board[1][1] && this._board[0][2] === this._board[2][0]) && symbols.includes(this._board[0][2])) {
                return true;
            }
            return false;
        }

        isBoardFull(){
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(this._board[i][j] === null){
                        return false;
                    }
                }
            }
            return true;
        }

        resetGame(){
            this._board = new Array(3).fill(null).map(() => new Array(3).fill(null));
            this._currentPlayer = 0;
        }

        getCurrentPlayerName(){
            return this._players[this._currentPlayer].getName();
        }
    }

