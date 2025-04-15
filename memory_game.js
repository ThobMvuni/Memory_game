let errors = 0;
const symbols = ["a", "B", "C", "D", "E", "F", "G", "H"];
let cardPool, board = [];
const rows = 4, columns = 4;

let firstCard = null, secondCard = null;

window.onload = () => {
    setupBoard();
};

function setupBoard() {
    cardPool = [...symbols, ...symbols];
    shuffle(cardPool);

    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
    board = [];

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            const value = cardPool.pop();
            row.push(value);

            const card = document.createElement("img");
            card.id = `${r}-${c}`;
            card.dataset.value = value;
            card.className = "card";
            card.src = getBackImage(); 
            card.style.backgroundColor = "#888"; 
            card.addEventListener("click", onCardClick);
            boardContainer.appendChild(card);
        }
        board.push(row);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getBackImage() {
    // 1x1 transparent base64 PNG
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAokB9VsfX+EAAAAASUVORK5CYII=";
}

function onCardClick() {
    const [r, c] = this.id.split("-").map(Number);
    const value = board[r][c];

    // Ignore if already matched or already clicked
    if (this.src.includes(value + ".jpg") || secondCard) return;

    this.src = value + ".jpg";
    this.style.backgroundColor = "transparent";

    if (!firstCard) {
        firstCard = this;
    } else if (this !== firstCard) {
        secondCard = this;
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    if (firstCard.dataset.value !== secondCard.dataset.value) {
        firstCard.src = getBackImage();
        secondCard.src = getBackImage();
        firstCard.style.backgroundColor = "#888";
        secondCard.style.backgroundColor = "#888";

        errors++;
        document.getElementById("errors").innerText = `${errors}`;
    }

    firstCard = null;
    secondCard = null;
}
