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

        if (playerHasWon() !==false) {
            playerText.innerText = 'Player ' + currentPlayer + ' has won!'
            let winningBlocks = playerHasWon()

            winningBlocks.map( box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }


        currentPlayer = currentPlayer == X ? O : X
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