//Global object
let origBoard;
//Players in the game
const human = "X";
const computer = "O";
//Displays all the game combinations
const winCombos = [
    [0,1,2],
    [3,4,5],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]
const cells = document.querySelectorAll('.cell');

//Start Game Function
startGame();
function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys())
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';

        //Remove color when game resets
        cells[i].style.removeProperty('background-color');

        //Click Event Response
        cells[i].addEventListener('click', turnClick, false);
    }
}

//Click for Turn Function
function turnClick(square){
    //Check if there is a tie or when board is full
    if(typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, human)
        if (!checkTie()) turn(bestSport(), aiPlayer);
    }
}

//Define Turn Function
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innterText = player;
    let gameWon = checkWin(origBoard, player) 
        if (gameWon) gameOver(gameWon)
}

//Define Check Win Function
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;

    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

//Game Over Function
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == human ? 'blue' : 'red';
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
}

//Empty Square Function
function emptySquares() {
    return.origBoard.filter( s => typeof s == 'number')
}


//Check Best Spot Function
function bestSpot(){
    return emptySquares()[0];
}
