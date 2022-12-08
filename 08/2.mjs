import readline from "node:readline/promises";
import { createReadStream } from "node:fs";

const reader = readline.createInterface({
  input: createReadStream("./input.txt"),
});

const lines = [];

for await (const line of reader) {
  lines.push(line.split("").map(Number));
}

const visibleLeft = (row, column, lines) => {
  const line = lines[row];
  const trees = line.slice(0, column).reverse();
  const tree = lines[row][column];
  if (!trees.length) {
    return 0;
  }

  for (let i = 0; i < trees.length; i++) {
    const _tree = trees[i];
    if (_tree >= tree) {
      return i + 1;
    }
  }

  return trees.length;
};

const visibleRight = (row, column, lines) => {
  const line = lines[row];
  const trees = line.slice(column + 1);
  const tree = lines[row][column];
  if (!trees.length) {
    return 0;
  }

  for (let i = 0; i < trees.length; i++) {
    const _tree = trees[i];
    if (_tree >= tree) {
      return i + 1;
    }
  }

  return trees.length;
};

const visibleUp = (row, column, lines) => {
  const trees = lines
    .slice(0, row)
    .map((row) => row[column])
    .reverse();
  const tree = lines[row][column];
  if (!trees.length) {
    return 0;
  }

  for (let i = 0; i < trees.length; i++) {
    const _tree = trees[i];
    if (_tree >= tree) {
      return i + 1;
    }
  }

  return trees.length;
};

const visibleDown = (row, column, lines) => {
  const trees = lines.slice(row + 1).map((row) => row[column]);
  const tree = lines[row][column];
  if (!trees.length) {
    return 0;
  }

  for (let i = 0; i < trees.length; i++) {
    const _tree = trees[i];
    if (_tree >= tree) {
      return i + 1;
    }
  }

  return trees.length;
};

const scores = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const left = visibleLeft(i, j, lines);
    const right = visibleRight(i, j, lines);
    const up = visibleUp(i, j, lines);
    const down = visibleDown(i, j, lines);
    scores.push(left * right * up * down);
  }
}
console.log(Math.max(...scores));
