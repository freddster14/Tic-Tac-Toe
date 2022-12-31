const gameBoard = (() => {
    const playerTurn = document.querySelector('.player-turn');
    const startBtn = document.querySelector('#start-btn');
    const announceDisplay = document.querySelector('.announce');
    const xPlayerName = document.querySelector('#player1-name');
    const oPlayerName = document.querySelector('#player2-name');
    const gridContainer = document.querySelector('.grid-container');
    const roundNumber = document.querySelector('#round-number')


    let board = []
    let roundOver = false;
    let rounds = 3

    const playerFactories = (name, mark, turn, score) => {
        return {name, mark, turn, score}
    }
    
    const player1 = playerFactories("X", "X", true, 0);
    const player2 = playerFactories("O", "O", false, 0)
    


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

    const roundWin = () => {
        for(winCombo of winCombos){
            let a = board[winCombo[0]];
            let b = board[winCombo[1]];
            let c = board[winCombo[2]];
            if (a === b && b === c && a != undefined) {
                roundOver = true;
            }
        }
        return roundOver
    }


    const gameWinner = () => {
        let gameWon = false
        if(player1.score == rounds){
            playerTurn.textContent = `${player1.name} destroyed ${player2.name}`
            gameWon = true
        }else if(player2.score == rounds){
            playerTurn.textContent = `${player2.name} outplayed ${player1.name}`
            gameWon = true
        }

        return gameWon
    }

    const turnAndScore = () => {
        const continueBtn = document.querySelector('#continue-btn');
        const arrayBoard = [...document.querySelectorAll(".grid-squares")];
        if(gameWinner()) return;
        continueBtn.addEventListener('click', () => {
            arrayBoard.forEach(e => e.textContent = "");
            roundOver = false;
            board = []
            turnAndScore();
            continueBtn.style.display = "none";
            restartBtn.style.display = "none";
        })

        const restartBtn = document.querySelector('#restart-btn');
        restartBtn.addEventListener('click', () => {
            player1.score = 0;
            player2.score = 0;
            player1.turn = true;
            player2.turn = false;
            arrayBoard.forEach(e => e.textContent = "");
            roundOver = false;
            board = []
            turnAndScore();
            continueBtn.style.display = "none";
            restartBtn.style.display = "none";
            announceDisplay.textContent = `Best of ${rounds}`
        })
        
       

        if(roundWin() && player2.turn){
            player1.score++
            playerTurn.textContent = player1.name + " Won this round.";
            
        }else if(roundWin()){
            player2.score++;
            playerTurn.textContent = player2.name + " Won this round.";
            
        }else if(!board.includes(undefined) && board.length == 9){
            playerTurn.textContent = "It's a draw, go again.";
            continueBtn.style.display = "block";
            restartBtn.style.display = "block";
            roundOver = true
        }
        if(player1.turn == false && !roundWin()){
            playerTurn.textContent = player2.name + " Turn";
        }else if(player2.turn == false && !roundWin()){
            playerTurn.textContent = player1.name + " Turn"
        }
        
        announceDisplay.textContent = `${player1.score} - ${player2.score}`
        gameWinner();
        if(roundWin() && !gameWinner()){
            continueBtn.style.display = "block";
            restartBtn.style.display = "block";
        }else if(roundWin() && gameWinner()){restartBtn.style.display = "block"}
    }

    const markDown = (e) => {
        if(roundWin()) return;
        if(gameWinner()) return;
        if(e.target.textContent == '' && player1.turn && !roundWin()){
            e.target.textContent = player1.mark
            board[e.target.id] = player1.mark
            player1.turn = false
            player2.turn = true
        }else if(e.target.textContent == '' && player2.turn && !roundWin()){
            e.target.textContent = player2.mark
            board[e.target.id] = player2.mark
            player1.turn = true
            player2.turn = false
        }
        roundWin();
        if(!gameWinner()) turnAndScore();
        
        
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
        if(roundNumber.value != "" && roundNumber.value != 0) rounds = roundNumber.value;
        roundNumber.style.display = "none"
        announceDisplay.textContent = `Best of ${rounds}`
    }

    startBtn.addEventListener('click', () => {
        startGame();
        displayArray(board);
    })
})();

