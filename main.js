const gameBoard = (() => {
    const playerTurn = document.querySelector('.player-turn');
    const startBtn = document.querySelector('#start-btn');
    const announceDisplay = document.querySelector('.announce');
    const xPlayerName = document.querySelector('#player1-name');
    const oPlayerName = document.querySelector('#player2-name');
    const gridContainer = document.querySelector('.grid-container');



    let board = []

    const playerFactories = (name, mark, turn, score) => {
        return {name, mark, turn, score}
    }
    
    const player1 = playerFactories("Player 1", "X", true, 0);
    const player2 = playerFactories("Player 2", "O", false, 0)
    
    let mouseDown = false;
    document.body.onmousedown = () => (mouseDown = true);
    document.body.onmouseup = () => (mouseDown = false);


    const winCombos = [
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

    const validateWin = () => {
        let gameWon = false;
        for(winCombo of winCombos){
            let a = board[winCombo[0]];
            let b = board[winCombo[1]];
            let c = board[winCombo[2]];
            if (a === b && b === c && a != undefined) {
                gameWon = true;
            }
        }
        return gameWon
    }

    

    const turnAndScore = () => {
        const continueBtn = document.querySelector('#continue-btn');
        const restartBtn = document.querySelector('#restart-btn');

        continueBtn.addEventListener('click', () => {
            gridContainer.innerHTML = ''
        })
        if(){
            playerTurn.textContent = "It's a draw, go again."
            continueBtn.style.display = "block"
            restartBtn.style.display = "block"
        }else if(validateWin() && player2.turn){
            player1.score++
            validateWin.gameWon = false
            playerTurn.textContent = player1.name + " Won this round."
            continueBtn.style.display = "block"
            restartBtn.style.display = "block"
        }else if(validateWin()){
            player2.score++;
            validateWin.gameWon = false;
            playerTurn.textContent = player2.name + " Won this round."
            continueBtn.style.display = "block"
            restartBtn.style.display = "block"
        }

        if(player1.turn == false && !validateWin()){
            playerTurn.textContent = player2.name + " Turn"

        }else if(player2.turn == false && !validateWin()){
            playerTurn.textContent = player1.name + " Turn"}
    announceDisplay.textContent = `${player1.score} - ${player2.score}`

    }

    const markDown = (e) => {
        if(mouseDown) return;
        if(validateWin()) return;
        if(e.target.textContent == '' && player1.turn && !validateWin()){
            e.target.textContent = player1.mark
            board[e.target.id] = player1.mark
            player1.turn = false
            player2.turn = true
        }else if(e.target.textContent == '' && player2.turn && !validateWin()){
            e.target.textContent = player2.mark
            board[e.target.id] = player2.mark
            player1.turn = true
            player2.turn = false
        }
        validateWin();
        turnAndScore();
    }

    const displayArray = () => {
        gridContainer.style.display = "grid"
        let ghostContainer = document.createDocumentFragment();
        let board = new Array(9)
        for( i = 0; i < board.length; i++){
            let div = document.createElement('div');
            div.textContent = ''
            div.className = "grid-squares";
            div.id = `${i}`
            ghostContainer.appendChild(div)
            div.addEventListener('mousedown', markDown);
        }
    gridContainer.appendChild(ghostContainer);
    }

    const startGame = () => {
        startBtn.style.display = "none"
        playerTurn.style.display = "block"
        if(xPlayerName.value != ''){player1.name = xPlayerName.value}
        if(oPlayerName.value != ''){player2.name = oPlayerName.value}
        playerTurn.textContent = player1.name + " Turn"
        document.querySelector('.name-container').style.display = 'none'
    }

    startBtn.addEventListener('click', () => {
        startGame();
        displayArray(board);

    })

    
    
})();

