let regenerate = document.querySelector(".regenerate");
let home1 = document.querySelector(".home1");
let home2 = document.querySelector(".home2");
let complete = document.querySelector(".complete");

let reachedHome = false;

regenerate.addEventListener("click", () => {
    location.reload();
});

home1.addEventListener("click", () => {
    console.log("Returning to home page");
    document.location.href = '../main.html';
});

home2.addEventListener("click", () => {
    complete.style.display = "none";//make the div disappear
    console.log("Returning to home page");
    document.location.href = '../main.html';
});

let form = document.querySelector("#controls");
let container = document.querySelector(".form-container");
form.addEventListener("submit", generateMaze);

function generateMaze(event) {
    event.preventDefault();
    dropdown = document.getElementById("dropdown");
    selectedValue = dropdown.value;

    if (selectedValue == 0) {
        rows = columns = 10;
        delay = 50;
    }
    else if (selectedValue == 1) {
        rows = columns = 20;
        delay = 10;
    }
    else if (selectedValue == 2) {
        rows = columns = 30;
        delay = 0;
    }
    else if (selectedValue == 3) {
        rows = columns = 40;
        delay = 0;
    }
    else {
        rows = columns = 10;
        delay = 50;
    }

    container.style.display = "none";

    newMaze = new Maze(600, rows, columns, delay);
    newMaze.setup();
    newMaze.drawMaze();
}

document.addEventListener("keydown", move);

function move(event) {
    if (!generationComplete) {
        return;
    }
    if (reachedHome)
        return;
    let key = event.key;
    let row = currentCell.rowNumber;
    let col = currentCell.columnNumber;

    switch (key) {
        case "ArrowUp":
            if (!currentCell.walls.topWall) {
                let next = newMaze.grid[row - 1][col];
                currentCell = next;
                newMaze.drawMaze();
                currentCell.highlightCurrentCell(newMaze.noOfColumns);
                // not required if goal is in bottom right
                if (currentCell.goal) {
                    reachedHome = true;
                    complete.style.display = "block";
                }
            }
            break;

        case "ArrowRight":
            if (!currentCell.walls.rightWall) {
                let next = newMaze.grid[row][col + 1];
                currentCell = next;
                newMaze.drawMaze();
                currentCell.highlightCurrentCell(newMaze.noOfColumns);
                if (currentCell.goal) {
                    reachedHome = true;
                    complete.style.display = "block";//make the div visible
                }
            }
            break;

        case "ArrowDown":
            if (!currentCell.walls.bottomWall) {
                let next = newMaze.grid[row + 1][col];
                currentCell = next;
                newMaze.drawMaze();
                currentCell.highlightCurrentCell(newMaze.noOfColumns);
                if (currentCell.goal) {
                    reachedHome = true;
                    complete.style.display = "block";
                }
            }
            break;

        case "ArrowLeft":
            if (!currentCell.walls.leftWall) {
                let next = newMaze.grid[row][col - 1];
                currentCell = next;
                newMaze.drawMaze();
                currentCell.highlightCurrentCell(newMaze.noOfColumns);
                if (currentCell.goal) {
                    reachedHome = true;
                    complete.style.display = "block";
                }
            }
            break;
    }
}
