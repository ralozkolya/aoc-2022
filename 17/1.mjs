import { readFileSync } from "fs";

const data = readFileSync("./test.txt").toString();

const WIDTH = 7;

const figures = [
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
];

const getDir = (i) => data[i % data.length];
const getRow = (fill = 1) => new Array(WIDTH).fill(fill);

class Piece {
  static index = 0;

  constructor(index) {
    this.x = 2;
    this.y = grid.length + 3;
    this.figure = figures[index % figures.length];
    this.height = this.figure.length;
    this.width = this.figure[0].length;
  }

  moveX(dir) {
    if ("<" === dir && this.x > 0) {
      this.willCollide(this.x - 1, this.y) || this.x--;
    } else if (">" === dir && this.x + this.width < WIDTH) {
      this.willCollide(this.x + 1, this.y) || this.x++;
    }
  }

  moveY() {
    if (!this.willCollide(this.x, this.y - 1)) {
      this.y--;
      return true;
    }

    return false;
  }

  willCollide(x, y) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (grid[i + y]?.[j + x] && this.figure[i][j]) {
          return true;
        }
      }
    }
    return false;
  }

  mergeIntoGrid() {
    for (let i = this.y; i < this.y + this.height; i++) {
      grid[i] = grid[i] || getRow(0);

      for (let j = this.x; j < this.width + this.x; j++) {
        grid[i][j] = this.figure[i - this.y][j - this.x] || grid[i][j];
      }
    }
  }

  static make() {
    const piece = new Piece(Piece.index++);
    return piece;
  }
}

const grid = [getRow()];

let piece = Piece.make();

for (let i = 0; Piece.index < 1000000000000; i++) {
  piece.moveX(getDir(i));

  if (!piece.moveY()) {
    piece.mergeIntoGrid();
    piece = Piece.make();
  }
}

console.log(grid.length - 1);
