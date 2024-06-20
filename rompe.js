
document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById('puzzle');
    const imageFolder = 'Rompe';
    const numRows = 4;
    const numCols = 4;
    const numPieces = numRows * numCols;
    const pieces = [];
    const imagePaths = [];

    for (let i = 1; i <= numPieces; i++) {
        imagePaths.push(`${imageFolder}/figura${i}.png`);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createPuzzle() {
        shuffle(imagePaths);

        for (let i = 0; i < imagePaths.length; i++) {
            const piece = document.createElement('td');
            piece.style.backgroundImage = `url(${imagePaths[i]})`;
            piece.draggable = true;
            piece.dataset.imageIndex = i;
            piece.addEventListener('dragstart', handleDragStart);
            piece.addEventListener('dragover', handleDragOver);
            piece.addEventListener('drop', handleDrop);
            pieces.push(piece);
        }

        shuffle(pieces);

        let pieceIndex = 0;
        for (let row = 0; row < numRows; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < numCols; col++) {
                tr.appendChild(pieces[pieceIndex++]);
            }
            puzzleContainer.appendChild(tr);
        }
    }

    function handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.imageIndex);
        event.target.classList.add('dragging');
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        const draggingElement = document.querySelector('.dragging');
        const droppedElement = event.target;
        
        if (draggingElement && droppedElement.tagName === 'TD') {
            const draggingIndex = draggingElement.dataset.imageIndex;
            const droppedIndex = droppedElement.dataset.imageIndex;
            
            [draggingElement.style.backgroundImage, droppedElement.style.backgroundImage] = 
                [droppedElement.style.backgroundImage, draggingElement.style.backgroundImage];
            
            [draggingElement.dataset.imageIndex, droppedElement.dataset.imageIndex] = 
                [droppedIndex, draggingIndex];

            draggingElement.classList.remove('dragging');
        }
        checkCompletion();
    }

    function checkCompletion() {
        let isComplete = true;
        for (const piece of pieces) {
            const pieceIndex = parseInt(piece.dataset.imageIndex);
            if (piece.style.backgroundImage !== `url(${imagePaths[pieceIndex]})`) {
                isComplete = false;
                break;
            }
        }
        if (isComplete) {
            alert('¡Muchas Felicidades, completaste el rompecabezas!');
        }
    }

    createPuzzle();
});