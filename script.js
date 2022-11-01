// gameBoard module stores data about the gameboard in an array
const gameBoard = (() => {
    let _gameboard = ["X", "X", "O", "O", "X", "O", "O", "X", "X"];

    const getBoard = () => _gameboard;
    const addMarkerToBoard = (marker, index) => {
        if (_gameboard[index] === "") {
            _gameboard[index] = marker;
        }
    };
    const isBoardFull = () => {
        return !_gameboard.some(el => el === "");
    };

    return {getBoard, addMarkerToBoard, isBoardFull};
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

    // Listens for clicks on cells   
    _loopBoard((cell) => cell.addEventListener("click", (e) => console.log(e.target.getAttribute("data-index"))));

    return {renderBoard, clearBoard};
})();