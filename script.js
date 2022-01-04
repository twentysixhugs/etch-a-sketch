let firstLoad = true;

//grid
const gridContainer = document.querySelector('#grid-container');


//input and buttons
const gridSize = document.querySelector('#grid-size');
gridSize.value = 50; //set initial grid size for dragger

gridSize.addEventListener('change', replaceGrid);

let penModes = ["Black", "Random color", "Pick color", "Eraser"];
let penMode = 0; //this value will vary from 0 to 2 on click. 0 is default black

const penModeBtn = document.querySelector("#pen-mode-btn");
penModeBtn.addEventListener("click", () => {
    /*change what we will select from penModes array*/
    if (penMode < 3)
        penMode++; //increment if it hasn't reached the last option (the third one) yet
    else
        penMode = 0; //reload the counter, setting it back to black.

    penModeBtn.textContent = penModes[penMode];
    setPenMode(penModes[penMode], false);
});

const penModeContainer = document.querySelector("#pen-mode-container");

const clearGridBtn = document.querySelector("#clear-grid-btn");

clearGridBtn.addEventListener("click", replaceGrid);


//drawing
let color = "black"; //default

const colorInput = document.createElement("input");
colorInput.setAttribute('type', 'color');
colorInput.setAttribute('id', 'color-input');

colorInput.addEventListener('change', () => {
    color = colorInput.value;
})

//grid manipulation functions
function replaceGrid() {
    removeGrid();
    createGrid();

    const squareDivs = document.querySelectorAll(".square-div");

    squareDivs.forEach(squareDiv => {
        squareDiv.addEventListener("mouseover", getAndReplaceDivColor);
    });
    
    setPenMode(penModes[penMode]);
}

function removeGrid() {
    gridContainer.innerHTML = '';
}

function createGrid() {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize.value}, 1fr)`;

    for (let i = 0; i < gridSize.value * gridSize.value; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.setAttribute('class', 'square-div');
        gridContainer.appendChild(squareDiv);
    }
}

function changeSquareDivColor(e, color) {
    e.target.style.backgroundColor = color;
}

//other

function setPenMode(penMode, reload=true) {
    if (penMode === "Pick color") {
        penModeContainer.appendChild(colorInput);
    }
    if (penMode === "Black" && !firstLoad && !reload) {
        penModeContainer.removeChild(colorInput);
    }

    // if (!firstLoad) {
    //     for (let i = 0; i < gridSize.value * gridSize.value; i++) {
    //         const squareDiv = document.querySelector(".square-div");
    //         squareDiv.removeEventListener("mouseover", getAndReplaceDivColor);
    //     }
    // }
    firstLoad = false;
}

function getAndReplaceDivColor(e) {

    //

    if (penModes[penMode] === "Black") {
        //changeSquareDivColor(e, "black");
        this.style.backgroundColor = "black";
    }
    else if (penModes[penMode] === "Random color") {
        let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); //get random value and convert it to base 16
        changeSquareDivColor(e, randomColor);
    }
    else if (penModes[penMode] === "Pick color") {
        changeSquareDivColor(e, color);
    }
    else if (penModes[penMode] === "Eraser") {
        changeSquareDivColor(e, "white");
    }
}

function main() {
    createGrid();
    setPenMode(penModes[penMode], false);
    const squareDivs = document.querySelectorAll(".square-div");

    squareDivs.forEach(squareDiv => {
        squareDiv.addEventListener("mouseover", getAndReplaceDivColor);
    });
}

window.onload = () => main();
