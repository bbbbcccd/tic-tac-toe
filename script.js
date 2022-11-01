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