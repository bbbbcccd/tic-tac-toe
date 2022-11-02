// gameBoard module stores data about the gameboard in an array
const gameBoard = (() => {
    let _gameboard = ["X", "X", "O", "O", "X", "O", "O", "X", "X"];

    const getBoard = () => _gameboard;
    const addMarkerToBoard = (marker, index) => {
        if (_gameboard[index] === "") {
            _gameboard[index] = marker;
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
        gameState.playerTurn = p1;
        gameBoard.clearBoard();
        displayController.clearBoard();
    };

    const playGame = () => {
        _initGame();
        
    }
    return {playGame};
})();