const ui = (function(){
    const boardElement = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('.restart');
    const startButton = document.getElementById('.start');
    const player1Input = document.getElementById('playerOne');
    const player2Input = document.getElementById('playerTwo');
    let currentPlayer = 'X';

    function updateBoard(){
        for(let i = 0; i < cells.length; i++){
            cells[i].textContent = gameLogic.getCellValue(i) || '';
        }
    }

    function handleCellClick(event){
        const index = event.target.dataset.index;
        if(gameLogic.makeMove(index)){
            updateBoard();
            const winner = gameLogic.checkWinner();
            if(winner){
                alert(`Player ${winner} wins!`);
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