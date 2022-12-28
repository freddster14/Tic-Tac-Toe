const gameBoard = (() => {
    let board = []

    const playerFactories = (name, mark, turn) => {
        return {name, mark, turn}
    }
    
    const player1 = playerFactories("Player 1", "X", true);
    const player2 = playerFactories("PLayer 2", "O", false)
    
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
            console.log(a)
            console.log(b)
            console.log(c)

            if (a === b && b === c && a != undefined) {
                gameWon = true;
            }
        }
        return gameWon
    }

    const markDown = (e) => {
        if(mouseDown) return;
        console.log(validateWin.gameWon)
        if(e.target.textContent == '' && player1.turn && !validateWin()){
            e.target.textContent = player1.mark
            player1.turn = false
            player2.turn = true
            board[e.target.id] = player1.mark
            console.log(board)
            validateWin(); 
        }else if(e.target.textContent == '' && player2.turn && !validateWin()){
            e.target.textContent = player2.mark
            player1.turn = true
            player2.turn = false
            board[e.target.id] = player2.mark
            console.log(board)
            validateWin(); 
        }
       
    }

    const displayArray = () => {
        const gridContainer = document.querySelector('.grid-container');
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

    displayArray(board);
    
})();

