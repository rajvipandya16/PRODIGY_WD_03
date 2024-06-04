const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const aboutButton = document.getElementById('aboutButton');
const closeButton = document.getElementById('closeButton');
const aboutModal = document.getElementById('aboutModal');
const player1NameInput = document.getElementById('player1Name');
const player2NameInput = document.getElementById('player2Name');
const player1NameDisplay = document.getElementById('player1NameDisplay');
const player2NameDisplay = document.getElementById('player2NameDisplay');
const startButton = document.getElementById('startButton');
const pvpButton = document.getElementById('pvpButton');
const pvaiButton = document.getElementById('pvaiButton');

let currentPlayer = 'O';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'PvP'; // Default to Player vs Player mode

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive()) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    showStar(clickedCell);

    if (checkWinner()) {
        alert(currentPlayer === 'O' ? `${player1NameDisplay.textContent} wins!` : `${player2NameDisplay.textContent} wins!`);
        resetGame();
    } else if (!gameState.includes('')) {
        alert('Draw!');
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
        if (gameMode === 'PvAI' && currentPlayer === 'X') {
            setTimeout(cpuMove, 500); // Add a delay for the CPU move
        }
    }
}

function showStar(element) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 80 + 10}%`;
    star.style.top = `${Math.random() * 80 + 10}%`;
    element.appendChild(star);
    setTimeout(() => {
        element.removeChild(star);
    }, 500);
}

function isGameActive() {
    return !checkWinner() && gameState.includes('');
}

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function cpuMove() {
    let emptyCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
    });
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = 'X';
    cells[randomIndex].textContent = 'X';
    showStar(cells[randomIndex]);
    if (checkWinner()) {
        alert('CPU wins!');
        resetGame();
    } else if (!gameState.includes('')) {
        alert('Draw!');
        resetGame();
    }
    currentPlayer = 'O';
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
}

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
    if (gameMode === 'PvAI') {
        player2NameDisplay.textContent = 'CPU';
    } else {
        player2NameDisplay.textContent = player2NameInput.value.trim() || 'Player 2';
    }
}

resetButton.addEventListener('click', resetGame);

aboutButton.addEventListener('click', () => {
    aboutModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});

startButton.addEventListener('click', () => {
    const player1Name = player1NameInput.value.trim();
    const player2Name = player2NameInput.value.trim();
    player1NameDisplay.textContent = player1Name || 'Player 1';
    player2NameDisplay.textContent = player2Name || 'Player 2';
    resetGame();
});

pvpButton.addEventListener('click', () => setGameMode('PvP'));
pvaiButton.addEventListener('click', () => setGameMode('PvAI'));

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
