const gameLogic = (function (){
    let board = Array(9).fill(null);
    let currentPlayer = 'X';

    function resetBoard() {
        // console.log('Board Reset');
        board = Array(9).fill(null);
        currentPlayer = 'X'
        board.set('');
    }

    function makeMove(index, playerName){
        if(board[index] === null){
            board[index] = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            return true; // Move Successful
        }
        return false; // Cell already occupied
    }

    function checkWinner(){
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6]
        ];
        for(const combination of winningCombinations){ 
            const [a, b, c] = combination;

            if(board[a] && board[a] === board[b] && board[a] === board[c]){ 
                return board[a];
            }
        }
        return null;
    }

    return {
        board,
        resetBoard,
        makeMove,
        checkWinner,
    };
})();