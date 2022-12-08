import readline from "node:readline/promises";
import { createReadStream } from "node:fs";

const reader = readline.createInterface({
  input: createReadStream("./input.txt"),
});

const lines = [];

for await (const line of reader) {
  lines.push(line.split("").map(Number));
}

console.log(lines);

const visibleLeft = (row, column, lines) => {
  const line = lines[row];
  const left = line.slice(0, column);
  const tree = lines[row][column];
  return !left.length || !left.filter((i) => tree <= i).length;
};

const visibleRight = (row, column, lines) => {
  const line = lines[row];
  const right = line.slice(column + 1);
  const tree = lines[row][column];
  return !right.length || !right.filter((i) => tree <= i).length;
};

const visibleUp = (row, column, lines) => {
  const up = lines.slice(0, row).map((row) => row[column]);
  const tree = lines[row][column];
  return !up.length || !up.filter((i) => tree <= i).length;
};

const visibleDown = (row, column, lines) => {
  const down = lines.slice(row + 1).map((row) => row[column]);
  const tree = lines[row][column];
  return !down.length || !down.filter((i) => tree <= i).length;
};

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (
      visibleDown(i, j, lines) ||
      visibleLeft(i, j, lines) ||
      visibleUp(i, j, lines) ||
      visibleRight(i, j, lines)
    ) {
      sum++;
    }
  }
}

console.log(sum);
