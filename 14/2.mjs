import { readFileSync } from "fs";

const data = readFileSync("./input.txt").toString();

const rocks = data
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(" -> ").map((cell) => cell.split(",").map(Number)));

const cave = new Array(1000).fill(1).map(() => new Array(1000).fill(false));

const { min, max } = Math;

let floor = 0;

rocks.forEach((formation) => {
  formation.reduce((a, b) => {
    const [r1, c1] = a;
    const [r2, c2] = b;

    for (let i = min(r1, r2); i <= max(r1, r2); i++) {
      for (let j = min(c1, c2); j <= max(c1, c2); j++) {
        cave[j][i] = true;
        floor = max(j, floor);
      }
    }

    return b;
  });
});

floor += 2;

cave[floor].fill(true);

let i = 0;
while (true) {
  let r = 0,
    c = 500;
  i++;

  if (cave[r + 1][c + 1]) {
    console.log("done", i);
    break;
  }

  while (true) {
    if (!cave[r + 1][c]) {
      r++;
      continue;
    }

    if (!cave[r + 1][c - 1]) {
      r++;
      c--;
      continue;
    }

    if (!cave[r + 1][c + 1]) {
      r++;
      c++;
      continue;
    }

    cave[r][c] = true;
    break;
  }
}
