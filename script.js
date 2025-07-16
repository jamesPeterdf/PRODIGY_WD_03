const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("theme-toggle");
const winMessage = document.getElementById("winMessage");
const winnerText = document.getElementById("winnerText");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let confetti;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Create board tiles
for (let i = 0; i < 9; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.dataset.index = i;
  board.appendChild(tile);
}

board.addEventListener("click", (e) => {
  if (!e.target.classList.contains("tile") || !gameActive) return;

  const index = e.target.dataset.index;
  if (gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    winnerText.textContent = `🎉 Congratulations Player ${currentPlayer}! 🎉`;
    winMessage.classList.remove("hidden");
    startConfetti();
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
});

resetBtn.addEventListener("click", () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  document.querySelectorAll(".tile").forEach(tile => tile.textContent = "");
  winMessage.classList.add("hidden");
  stopConfetti();
});

function checkWin() {
  return winConditions.some(combination => {
    const [a, b, c] = combination;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ✅ Confetti Fix: Recreate each time
function startConfetti() {
  confetti = new ConfettiGenerator({
    target: 'confetti-canvas',
    max: 200,
    size: 1.2,
    animate: true,
    props: ['circle', 'square', 'triangle'],
    colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
  });
  confetti.render();
}

function stopConfetti() {
  if (confetti) confetti.clear();
  const oldCanvas = document.getElementById("confetti-canvas");
  const newCanvas = oldCanvas.cloneNode(true);
  oldCanvas.replaceWith(newCanvas);
}
