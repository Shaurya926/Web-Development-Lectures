const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0, T: 0 };

const cells = document.querySelectorAll('.ttt-cell');
const statusEl = document.getElementById('status');
const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');
const scoreTieEl = document.getElementById('score-tie');
const restartBtn = document.getElementById('restart-btn');

function setStatus(message, cssClass) {
  statusEl.textContent = message;
  statusEl.className = cssClass || '';
}

function checkWinner() {
  for (const [a, b, c] of WINNING_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function handleCellClick(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;

  const cell = cells[index];
  cell.textContent = currentPlayer;
  cell.classList.add('taken', currentPlayer === 'X' ? 'x-mark' : 'o-mark');
  cell.setAttribute('aria-label', `cell ${index + 1} ${currentPlayer}`);

  const winCombo = checkWinner();

  if (winCombo) {
    gameOver = true;
    winCombo.forEach(i => cells[i].classList.add('win-cell'));
    scores[currentPlayer]++;
    updateScoreboard();
    setStatus(`${currentPlayer} wins!`, currentPlayer === 'X' ? 'turn-x' : 'turn-o');
  } else if (board.every(Boolean)) {
    gameOver = true;
    scores.T++;
    updateScoreboard();
    setStatus("It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setStatus(`${currentPlayer}'s turn`, currentPlayer === 'X' ? 'turn-x' : 'turn-o');
  }
}

function updateScoreboard() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreTieEl.textContent = scores.T;
}

function restartGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;

  cells.forEach((cell, i) => {
    cell.textContent = '';
    cell.className = 'ttt-cell';
    cell.setAttribute('aria-label', `cell ${i + 1}`);
  });

  setStatus("X's turn", 'turn-x');
}

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(+cell.dataset.i));
});

restartBtn.addEventListener('click', restartGame);

setStatus("X's turn", 'turn-x');