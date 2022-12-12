import { readFile } from "node:fs/promises";

class Cell {
  char = "";
  visited = false;
  prev = null;
  end = false;

  constructor(char, row, col) {
    this.row = row;
    this.col = col;
    this.char = "S" === char ? "a" : "E" === char ? "z" : char;
    this.end = "E" === char;
    this.code = this.char.charCodeAt(0);
  }

  path() {
    let i = 0;
    let cell = this;
    while (cell.prev) {
      i++;
      cell = cell.prev;
    }
    return i;
  }
}

class Grid {
  cells = [];

  constructor(data) {
    data
      .split("\n")
      .filter((a) => a)
      .forEach((line, row) => {
        this.cells.push([...line].map((char, col) => new Cell(char, row, col)));
      });
  }

  getAdjacent(row, col) {
    return [
      this.cells[row][col - 1],
      this.cells[row][col + 1],
      this.cells[row - 1]?.[col],
      this.cells[row + 1]?.[col],
    ].filter((a) => a);
  }

  getNeighbours(row, col) {
    const orig = this.cells[row][col];
    orig.visited = true;
    const adjacent = this.getAdjacent(row, col);
    const nonVisited = adjacent.filter((cell) => !cell.visited);
    const climbable = nonVisited.filter((cell) => cell.code - orig.code < 2);
    climbable.forEach((cell) => {
      cell.prev = orig;
      cell.visited = true;
    });
    return climbable;
  }

  traverse(row, col) {
    const queue = this.getNeighbours(row, col);

    while (queue.length) {
      const cell = queue.shift();

      if (cell.end) {
        console.log("found", cell.path());
        return;
      }

      queue.push(...this.getNeighbours(cell.row, cell.col));
    }
  }
}

const grid = new Grid((await readFile("./input.txt")).toString());

grid.traverse(20, 0);
