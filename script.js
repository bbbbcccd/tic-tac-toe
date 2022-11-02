// gameBoard module stores data about the gameboard in an array
const gameBoard = (() => {
    let _gameboard = ["X", "X", "O", "O", "X", "O", "O", "X", "X"];

    const getBoard = () => _gameboard;
    const addMarkerToBoard = (marker, index) => {
        if (_gameboard[index] === "") {
            _gameboard[index] = marker;
            return true;
        } else {
            return false;
        }
    };
    const clearBoard = () => {
        _gameboard = Array(9).fill("");
        return _gameboard;
    }
    const isBoardFull = () => {
        return !_gameboard.some(el => el === "");
    };

    return {getBoard, addMarkerToBoard, clearBoard, isBoardFull};
})();

// displayController module controls the html elements of the board
const displayController = (() => {
    const _gameBoard = document.querySelector(".gameboard");
    const _loopBoard = (fn) => {
        for (const cell of _gameBoard.children) {
            fn(cell);
        }
    };
    const renderBoard = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            _gameBoard.children[i].textContent = arr[i];
        }
    };
    const clearBoard = () => {
        _loopBoard(el => el.textContent = "");
    };

    // Listens for clicks on gameboard   
    const registerClick = (fn) => {
        _gameBoard.addEventListener("click", fn);
    };

    return {renderBoard, clearBoard, registerClick};
})();

// Person factory
// Each person object has a name and a marker
const Person = (name, marker) => {
    let _name = name;
    let _marker = marker;
    const getMarker = () => _marker;
    const getName = () => _name;
    const changeName = (newName) => {
        _name = newName;
    }
    return {getName, changeName, getMarker};
};

// gameControl module 
// Controls the flow of the game
const gameControl = (() => {

// Stores the current game state
    const gameState = {
        players: [],
        isGameOn: false,
        playerTurn: null,
        result: null,
        winner: null
    };

// Initialise game by creating 2 new players and clearing gameboard
    const _initGame = () => {
        gameState.isGameOn = true;
        const p1 = Person("Player 1", "X");
        const p2 = Person("Player 2", "O");
        gameState.players.push(p1, p2);
        gameState.playerTurn = p1;
        gameBoard.clearBoard();
        displayController.clearBoard();
    };

// Make a move in the game
    const move = index => {
        if (gameBoard.addMarkerToBoard(gameState.playerTurn.getMarker(), index)) {
            const newBoard = gameBoard.getBoard();
            displayController.renderBoard(newBoard);
        }
    };    

// Switch playerTurn in gameState
    const switchPlayerTurn = () => {
        if (gameState.playerTurn.getMarker() === gameState.players[0].getMarker()) {
            gameState.playerTurn = gameState.players[1];
        } else {
            gameState.playerTurn = gameState.players[0];
        }
    }

// Checks if game is over 
    const checkGameOver = () => {
        const board = gameBoard.getBoard();
        switch(true) {
            case (board[0] === board[1] && board[0] === board[2] && board[0] !== ""):
            case (board[3] === board[4] && board[3] === board[5] && board[3] !== ""):
            case (board[6] === board[7] && board[6] === board[8] && board[6] !== ""):    
            case (board[0] === board[3] && board[3] === board[6] && board[0] !== ""):
            case (board[1] === board[4] && board[1] === board[7] && board[1] !== ""):
            case (board[2] === board[5] && board[2] === board[8] && board[2] !== ""):
            case (board[0] === board[4] && board[0] === board[8] && board[0] !== ""):
            case (board[2] === board[4] && board[2] === board[6] && board[2] !== ""):
                gameState.isGameOn = false;
                gameState.result = "win";
                gameState.winner = gameState.playerTurn;
                console.log("Winner: " + gameState.winner.getMarker());
                break;

            case gameBoard.isBoardFull():
                gameState.isGameOn = false;
                gameState.result = "tie";
                console.log(gameState.result);
                break;

            default: 
                console.log("Game still going");
                break;
        }
    };

    const playGame = () => {
        _initGame();
        displayController.registerClick(e => {
            const index = e.target.getAttribute("data-index");
            if (gameState.isGameOn && index !== undefined) {
                move(index);
                checkGameOver();
                switchPlayerTurn();
            }
        })
    };

    return {playGame};
})();