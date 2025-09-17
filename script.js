let player1 = { name: "Player 1", color: "red" };
let player2 = { name: "Player 2", color: "yellow" };
let curPlayer;
let gameOver = false;
let board;
let rows = 6;
let columns = 7;

window.onload = function () {
    document.getElementById("startBtn").addEventListener("click", startGame);
    document.getElementById("restartBtn").addEventListener("click", () => location.reload());
};

function startGame() {
    player1.name = document.getElementById("player1Name").value || "Player 1";
    player1.color = document.getElementById("player1Color").value || "#ff0000";

    player2.name = document.getElementById("player2Name").value || "Player 2";
    player2.color = document.getElementById("player2Color").value || "#ffff00";

    curPlayer = player1; 
    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";

    setGame();
    updateTurnMessage();
}

function setGame() {
    board = [];

    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; 

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(" ");

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardDiv.append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = getAvailableRow(c);
    if (r === -1) return;

    board[r][c] = curPlayer.name;

    let tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.style.backgroundColor = curPlayer.color;

    checkWinner();
    if (!gameOver) {
        curPlayer = curPlayer === player1 ? player2 : player1;
        updateTurnMessage();
    }
}

function getAvailableRow(c) {
    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][c] === " ") {
            return r;
        }
    }
    return -1;
}

function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " ") {
                if (
                    board[r][c] === board[r][c + 1] &&
                    board[r][c + 1] === board[r][c + 2] &&
                    board[r][c + 2] === board[r][c + 3]
                ) {
                    setWinner(board[r][c], [[r, c], [r, c+1], [r, c+2], [r, c+3]]);
                    return;
                }
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== " ") {
                if (
                    board[r][c] === board[r + 1][c] &&
                    board[r + 1][c] === board[r + 2][c] &&
                    board[r + 2][c] === board[r + 3][c]
                ) {
                    setWinner(board[r][c], [[r, c], [r+1, c], [r+2, c], [r+3, c]]);
                    return;
                }
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " ") {
                if (
                    board[r][c] === board[r - 1][c + 1] &&
                    board[r - 1][c + 1] === board[r - 2][c + 2] &&
                    board[r - 2][c + 2] === board[r - 3][c + 3]
                ) {
                    setWinner(board[r][c], [[r, c], [r-1, c+1], [r-2, c+2], [r-3, c+3]]);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " ") {
                if (
                    board[r][c] === board[r + 1][c + 1] &&
                    board[r + 1][c + 1] === board[r + 2][c + 2] &&
                    board[r + 2][c + 2] === board[r + 3][c + 3]
                ) {
                    setWinner(board[r][c], [[r, c], [r+1, c+1], [r+2, c+2], [r+3, c+3]]);
                    return;
                }
            }
        }
    }
}

function setWinner(playerName, winningTiles) {
    let winnerMsg = document.getElementById("winner");
    winnerMsg.innerText = "🎉 Congratulations " + playerName + "! You Win! 🏆";
    gameOver = true;

    for (let [r, c] of winningTiles) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.classList.add("winning-tile");
    }
}

function updateTurnMessage() {
    document.getElementById("turn").innerText =  curPlayer.name + "'s turn";
}
