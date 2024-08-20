import Grid from "./Grid.js";
import Tile from "./Tile.js";
import HomeScreen from "./HomeScreen.js";

//TODO: Add a few different options for themes (i.e. tile colours) on the home screen.
//TODO: Add a scoring system, with a leader board for personal bests.

const resetBtn = document.querySelector("[data-reset]");
const gameBoard = document.getElementById("game-board");

const themes = 6;
//* This variable is simply used to determine the hsl 'hue' value between the declared
//* number of themes.

const grid = new Grid(gameBoard);
const homeScreen = new HomeScreen(gameBoard, themes);

const playAgainBtn = document.querySelector("[data-play-again]");

homeScreenFunctions();
//? Either a while loop or recursive function here to check for different functions of the
//? home screen being used.

playAgainBtn.addEventListener("click", (e) => {
  e.stopPropagation;
  playAgain();
})

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

resetBtn.addEventListener("click", (e) => {
  e.stopImmediatePropagation;
  resetGame();
});

/* I stopped immediate event propagation here because the handleInput function is run on an
event listener attached to the window, otherwise the reset button would run twice on start. */

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

function homeScreenFunctions() {
  console.log("Working on a home screen currently");
  homeScreen.showHomeScreen();
}

function playAgain() {
  homeScreen.hideHomeScreen();
  resetGame();
}

function resetGame() {
  grid.clearAllCells();
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  setupInput();
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setupInput();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setupInput();
        return;
      }
      await moveDown();
      break;
    case "ArrowLeft":
      if (!canMoveLeft()) {
        setupInput();
        return;
      }
      await moveLeft();
      break;
    case "ArrowRight":
      if (!canMoveRight()) {
        setupInput();
        return;
      }
      await moveRight();
      break;
    default:
      setupInput();
      return;
  }

  grid.cells.forEach((cell) => {
    cell.mergeTiles();
    if (cell.isTileValue2048()) {
      newTile.waitForTransition(true).then(() => {
        alert("You win!");
        homeScreenFunctions();
      });
    }
  });

  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile.waitForTransition(true).then(() => {
      alert("You lose :(");
      homeScreenFunctions();
    });
    return;
  }

  setupInput();
}

function moveUp() {
  return slideTiles(grid.cellsByColumn);
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition());
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

function canMoveUp() {
  return canMove(grid.cellsByColumn);
}

function canMoveDown() {
  return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByRow);
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, i) => {
      if (i === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[i - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
