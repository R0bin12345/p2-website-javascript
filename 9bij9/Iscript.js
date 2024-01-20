// Wacht tot de DOM volledig is geladen voordat de code wordt uitgevoerd
document.addEventListener("DOMContentLoaded", () => {
    // Verkrijg de DOM-elementen die nodig zijn voor het spel
    const boardElement = document.getElementById("board");
    const resultElement = document.getElementById("result");
    const restartButton = document.getElementById("restartBtn");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicControlButton = document.getElementById("musicControlBtn");

    // Initialiseer het speelbord en spelvariabelen
    let board = Array.from({ length: 9 }, () => Array(9).fill(null));
    let currentPlayer = "X";
    let gameActive = true;

    // Functie om de achtergrondmuziek af te spelen
    function playBackgroundMusic() {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().then(() => {
            console.log("Achtergrondmuziek wordt succesvol afgespeeld.");
        }).catch(error => {
            console.error("Er is een fout opgetreden bij het afspelen van de achtergrondmuziek:", error);
        });
    }

    // Functie om de achtergrondmuziek te pauzeren
    function pauseBackgroundMusic() {
        backgroundMusic.pause();
    }

    // Voeg een eventlistener toe voor het "canplaythrough" evenement om de achtergrondmuziek af te spelen
    backgroundMusic.addEventListener("canplaythrough", playBackgroundMusic);

    // Functie om het speelbord te renderen
    function renderBoard() {
        boardElement.innerHTML = "";
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.dataset.row = rowIndex.toString();
                cellElement.dataset.col = colIndex.toString();
                cellElement.textContent = cell || "";
                cellElement.addEventListener("click", handleCellClick);
                boardElement.appendChild(cellElement);
            });
        });
    }

    // Event handler voor het klikken op een cel
    function handleCellClick(event) {
        if (!gameActive) return;

        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);

        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            renderBoard();

            if (checkWinner()) {
                resultElement.textContent = `Speler ${currentPlayer} wint!`;
                gameActive = false;
            } else if (isBoardFull()) {
                resultElement.textContent = "Het is gelijkspel!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Functie om te controleren of er een winnaar is
    function checkWinner() {
        // Controleer rijen en kolommen
        for (let i = 0; i < 9; i++) {
            if (checkLine(board[i]) || checkLine(board.map(row => row[i]))) {
                return true;
            }
        }

        // Controleer diagonalen
        if (checkLine(board.map((row, index) => row[index]))) return true;
        if (checkLine(board.map((row, index) => row[8 - index]))) return true;

        return false;
    }

    // Functie om te controleren of alle cellen zijn ingevuld (gelijkspel)
    function checkLine(line) {
        return line.every(cell => cell === currentPlayer);
    }

    // Functie om te controleren of het speelbord vol is
    function isBoardFull() {
        return board.every(row => row.every(cell => cell !== null));
    }

    // Functie om het spel te herstarten
    function restartGame() {
        board = Array.from({ length: 9 }, () => Array(9).fill(null));
        currentPlayer = "X";
        gameActive = true;
        resultElement.textContent = "";
        renderBoard();
    }

    // Functie om de achtergrondmuziek aan/uit te zetten
    function toggleMusic() {
        if (backgroundMusic.paused) {
            playBackgroundMusic();
        } else {
            pauseBackgroundMusic();
        }
    }

    // Voeg eventlisteners toe voor de knoppen
    restartButton.addEventListener("click", restartGame);
    musicControlButton.addEventListener("click", toggleMusic);

    // Render het speelbord in het begin
    renderBoard();
});
