import readline from "node:readline/promises";
import { createReadStream } from "node:fs";

const reader = readline.createInterface({
  input: createReadStream("./input.txt"),
});

const lines = [];

for await (const line of reader) {
  lines.push(line);
}

const set = new Set();

let hx = 0,
  hy = 0;
let tx = 0,
  ty = 0;

const getDir = (d) => {
  switch (d) {
    case "U":
      return [0, 1];
    case "D":
      return [0, -1];
    case "L":
      return [-1, 0];
    case "R":
      return [1, 0];
  }
};

const move = (d, n) => {
  const [dx, dy] = getDir(d);
  for (let i = 0; i < Number(n); i++) {
    hx += dx;
    hy += dy;

    const diffx = tx - hx;
    const diffy = ty - hy;

    if (Math.abs(diffx) + Math.abs(diffy) > 2) {
      tx += tx > hx ? -1 : 1;
      ty += ty > hy ? -1 : 1;
    } else {
      if (Math.abs(diffx) > 1) {
        tx += tx > hx ? -1 : 1;
      }

      if (Math.abs(diffy) > 1) {
        ty += ty > hy ? -1 : 1;
      }
    }

    set.add(`${tx}, ${ty}`);
  }
};

lines.forEach((line) => {
  move(...line.split(" "));
});

console.log(set.size);
