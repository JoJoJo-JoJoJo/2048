const gridSize = 4;
const cellSize = 20;
const cellGap = 2;

export default class Grid {
  #cells;
  //* The '#' sign makes a variable private i.e. it cannot be used outside of the class it is declared in.

  constructor(gridElement) {
    gridElement.style.setProperty("--grid-size", gridSize);
    gridElement.style.setProperty("--cell-size", `${cellSize}vmin`);
    gridElement.style.setProperty("--cell-gap", `${cellGap}vmin`);
    this.#cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement,
        index % gridSize,
        Math.floor(index / gridSize)
      );
    });
  }

  get cells() {
    return this.#cells;
  }

  // All this is saying is that you can now read the content of the cells variable (private) from outside of the class.

  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }

  // PRIVATE read-only function that returns all cells that don't currently contain a value on the gameBoard i.e. spaces without a tile on them.

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }

  clearAllCells() {
    this.#cells.forEach((cell) => cell.tile == null);
    //! Need to properly figure this one out still.
  }
}

class Cell {
  #cellElement;
  #x;
  #y;
  #tile;
  #mergeTile;

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (value == null) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(value) {
    this.#mergeTile = value;
    if (value == null) return;
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept(tile) {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value === tile.value)
    );
  }

  mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile.remove();
    this.mergeTile = null;
  } // Merges the two tiles, doubles the value of 'this.tile', and removes 'this.mergeTile'

  isTileValue2048() {
    if (this.tile != null && this.mergeTile != null)
      return this.tile.value === 2048;
  }
}

function createCellElements(gridElement) {
  const cells = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}
