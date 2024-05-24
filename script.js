let currentPlayer;
let playerXSymbol;
let playerOSymbol;
let winner = null;
const cells = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');
const winnerButton = document.getElementById('winnerButton');
const resetButton = document.getElementById('resetButton');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
let playerXName = 'Player 1';
let playerOName = 'Player 2';
let player1Wins = 0;
let player2Wins = 0;
const player1WinsDisplay = document.getElementById('player1Wins');
const player2WinsDisplay = document.getElementById('player2Wins');

function chooseSymbol(symbol) {
    playerXSymbol = symbol;
    playerOSymbol = symbol === 'X' ? 'O' : 'X';
    currentPlayer = playerXSymbol;
    playerXName = playerXInput.value || 'Player 1';
    playerOName = playerOInput.value || 'Player 2';
    document.querySelector('.symbol-selection').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
    resetButton.style.display = 'block';
}

function cellClicked(index) {
    if (!cells[index].textContent && !winner) {
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer);
        checkWinner();
        currentPlayer = currentPlayer === playerXSymbol ? playerOSymbol : playerXSymbol;
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            winner = cells[a].textContent;
            const winnerName = winner === playerXSymbol ? playerXName : playerOName;
            winnerDisplay.textContent = `${winnerName} wins!`;
            winnerButton.style.display = 'inline-block';

            if (winner === playerXSymbol) {
                player1Wins++;
                player1WinsDisplay.textContent = `Player 1 Wins: ${player1Wins}`;
            } else {
                player2Wins++;
                player2WinsDisplay.textContent = `Player 2 Wins: ${player2Wins}`;
            }
        }
    });

    if (!winner && Array.from(cells).every(cell => cell.textContent)) {
        winnerDisplay.textContent = "It's a draw!";
        winnerButton.style.display = 'inline-block';
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    winner = null;
    currentPlayer = playerXSymbol;
    winnerDisplay.textContent = '';
    winnerButton.style.display = 'none';
}

function showWinner() {
    winnerButton.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    playerXInput.addEventListener('change', () => {
        playerXName = playerXInput.value || 'Player 1';
    });

    playerOInput.addEventListener('change', () => {
        playerOName = playerOInput.value || 'Player 2';
    });
});
