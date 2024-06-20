const words = ['clima', 'cuidar', 'reciclar', 'plantar', 'ods', 'renovable', 'ecosistemas', 'sostenible', 'co2', 'energia'];
let selectedWord = '';
let lettersGuessed = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const hangmanCanvas = document.getElementById('hangman');
const hangmanContext = hangmanCanvas.getContext('2d');
hangmanCanvas.width = 200;
hangmanCanvas.height = 200;

const wordContainer = document.getElementById('word-container');
const lettersContainer = document.getElementById('letters-container');
const resetButton = document.getElementById('reset-button');

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    lettersGuessed = [];
    wrongGuesses = 0;
    drawHangman(0);
    displayWord();
    createLetterButtons();
}

function displayWord() {
    wordContainer.innerHTML = '';
    selectedWord.split('').forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = lettersGuessed.includes(letter) ? letter : '_';
        wordContainer.appendChild(letterElement);
    });

    if (wordContainer.textContent === selectedWord) {
        alert('¡Felicidades, has ganado!');
        disableLetterButtons();
    }
}

function createLetterButtons() {
    lettersContainer.innerHTML = '';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => guessLetter(letter));
        lettersContainer.appendChild(button);
    });
}

function guessLetter(letter) {
    if (!selectedWord.includes(letter)) {
        wrongGuesses++;
        drawHangman(wrongGuesses);
    }

    lettersGuessed.push(letter);
    displayWord();

    if (wrongGuesses >= maxWrongGuesses) {
        alert('¡Perdiste! La palabra era: ' + selectedWord);
        disableLetterButtons();
    }

    document.querySelectorAll('#letters-container button').forEach(button => {
        if (lettersGuessed.includes(button.textContent)) {
            button.disabled = true;
        }
    });
}

function drawHangman(wrongGuesses) {
    hangmanContext.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);

    hangmanContext.beginPath();
    hangmanContext.moveTo(10, 190);
    hangmanContext.lineTo(190, 190);
    hangmanContext.stroke();

    hangmanContext.moveTo(50, 190);
    hangmanContext.lineTo(50, 10);
    hangmanContext.lineTo(120, 10);
    hangmanContext.lineTo(120, 30);
    hangmanContext.stroke();

    if (wrongGuesses > 0) {
        hangmanContext.moveTo(150, 60);
        hangmanContext.arc(120, 60, 30, 0, Math.PI * 2, true);
        hangmanContext.stroke();
    }

    if (wrongGuesses > 1) {
        hangmanContext.moveTo(120, 90);
        hangmanContext.lineTo(120, 140);
        hangmanContext.stroke();
    }

    if (wrongGuesses > 2) {
        hangmanContext.moveTo(120, 100);
        hangmanContext.lineTo(90, 110);
        hangmanContext.stroke();
    }

    if (wrongGuesses > 3) {
        hangmanContext.moveTo(120, 100);
        hangmanContext.lineTo(150, 110);
        hangmanContext.stroke();
    }

    if (wrongGuesses > 4) {
        hangmanContext.moveTo(120, 140);
        hangmanContext.lineTo(100, 170);
        hangmanContext.stroke();
    }

    if (wrongGuesses > 5) {
        hangmanContext.moveTo(120, 140);
        hangmanContext.lineTo(140, 170);
        hangmanContext.stroke();
    }
}

function disableLetterButtons() {
    document.querySelectorAll('#letters-container button').forEach(button => {
        button.disabled = true;
    });
}

resetButton.addEventListener('click', initGame);

initGame();