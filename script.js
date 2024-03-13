const ui = (function(){
    const boardElement = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('restart');
    const startButton = document.getElementById('start');
    const player1Input = document.getElementById('playerOne');
    const player2Input = document.getElementById('playerTwo');
    let currentPlayer = 'X';

    function updateBoard(){
        for(let i = 0; i < cells.length; i++){
            cells[i].textContent = gameLogic.board[i] || '';
        }
    }

    function handleCellClick(event){
        const index = event.target.dataset.index;
        const currentPlayerName = currentPlayer === 'X' ? player1Input.value : player2Input.value;
        if(gameLogic.makeMove(index, currentPlayerName)){
            updateBoard();
            const winnerName = gameLogic.checkWinner();
            if(winner){
                alert(`Player ${winnerName} wins!`);
                gameLogic.resetBoard();
                updateBoard();
            } else {
                togglePlayer();
            }
        }
    }

    function togglePlayer(){
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function handleResetButtonClick(){
        gameLogic.resetBoard();
        updateBoard();
        player1Input.value = '';
        player2Input.value = '';
    }

    function handleStartButtonClick(){
        //Performs initialisation logic
        gameLogic.resetBoard();
        updateBoard();
        currentPlayer = 'X';
    }

    function initialize(){
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
        resetButton.addEventListener('click', handleResetButtonClick);

        startButton.addEventListener('click', handleStartButtonClick);
    }
    return {
        updateBoard,
        initialize,
    };
})();