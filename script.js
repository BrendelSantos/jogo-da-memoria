const cards = document.querySelectorAll('.card');
const TOTAL_CARDS = cards.length / 2;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let countCardsFounded = 0;

// Dun��o para virar a carta
function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = this;
        return;

    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();

}

// Checagem de cartas iguais
function checkForMatch() {

    if (firstCard.dataset.card === secondCard.dataset.card) {

        disableCards();
        return;

    }

    unflipCards();

}

// Desabilita cartas
function disableCards() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    countCardsFounded++;

    checkGameFinished();

}

// Desvira cartas
function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();

    }, 1500);

}

// Executa o reset do tabuleiro
function resetBoard() {

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}

function checkGameFinished() {

    if (countCardsFounded == TOTAL_CARDS) {

        setTimeout(() => {

            alert("PARABÉNS! JOGO FINALIZADO!");
            if (confirm("DESEJA REINICIAR O JOGO?"))
                location.reload();

        }, 1500);

    }

}

// Embaralha cartas
(function shuffle() {

    cards.forEach((card) => {

        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;

    })

})();

// Evento de clique na carta
cards.forEach((card) => {

    card.addEventListener('click', flipCard);

});