let playerText = document.getElementById('playerText');
let restartButton = document.getElementById('restartButton');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O = 'O'
const X = 'X'
let currentPlayer = X

// what was clicked
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id
    if(!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            playerText.innerText = 'Player ' + currentPlayer + ' has won!'
            let winningBlocks = playerHasWon()

            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        if (!isBoardFull()) {
            // cpu turn
            currentPlayer = O
            setTimeout(makeCPUMove, 500);
        } else {
            playerText.innerText = "It's a draw!";
        }
    }
}

//difficulty level:2 function
function makeCPUMove() {
    let bestMove = getBestMove();

    spaces[bestMove] = O;
    boxes[bestMove].innerText = O;

    if (playerHasWon() !== false) {
        playerText.innerText = 'Player ' + O + ' has won!';
        let winningBlocks = playerHasWon();
        winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
    } else {
        //ruch gracza
        currentPlayer = X;
    }
}

function getBestMove() {
    //czy ruch wygrywajacy
    for (let i = 0; i < spaces.length; i++) {
        if (spaces[i] === null) {
            spaces[i] = O;
            if (playerHasWon()) {
                spaces[i] = null; //usuniecie ruchu do obliczen
                return i;
            }
            spaces[i] = null;
        }
    }

    ///czy ruch blokujacy
    for (let i = 0; i < spaces.length; i++) {
        if (spaces[i] === null) {
            spaces[i] = X; //ruch przeciwnika
            if (playerHasWon()) {
                spaces[i] = null;
                return i;
            }
            spaces[i] = null;
        }
    }

    //jak nie ma wygrywajacego ani blokujacego to losowy ruch
    for (let i = 0; i < spaces.length; i++) {
        if (spaces[i] === null) {
            return i;
        }
    }
}


const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
]

function playerHasWon() {
    for (const condition of winningCombinations) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

function isBoardFull() {
    return spaces.every(space => space !== null);
}

restartButton.addEventListener('click', restartGame)

function restartGame() {
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerText = 'tic tac toe game'

    currentPlayer = X
}

startGame()   