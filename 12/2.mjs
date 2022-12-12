import { readFile } from "node:fs/promises";

class Cell {
  char = "";
  visited = false;
  prev = null;
  end = false;
  static start = null;

  constructor(char, row, col) {
    this.row = row;
    this.col = col;
    if ("S" === char) {
      this.char = "a";
    } else if ("E" === char) {
      this.char = "z";
      this.visited = true;
      Cell.start = this;
    } else if ("a" === char) {
      this.end = true;
      this.char = char;
    } else {
      this.char = char;
    }
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
    const adjacent = this.getAdjacent(row, col);
    const nonVisited = adjacent.filter((cell) => !cell.visited);
    const climbable = nonVisited.filter((cell) => cell.code - orig.code > -2);
    climbable.forEach((cell) => {
      cell.prev = orig;
      cell.visited = true;
    });
    return climbable;
  }

  traverse() {
    const { row, col } = Cell.start;
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

grid.traverse();
