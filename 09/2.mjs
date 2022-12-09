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

const rope = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

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
    rope[0].x += dx;
    rope[0].y += dy;

    for (let i = 1; i < rope.length; i++) {
      const head = rope[i - 1];
      const tail = rope[i];

      const diffx = tail.x - head.x;
      const diffy = tail.y - head.y;

      if (Math.abs(diffx) + Math.abs(diffy) > 2) {
        tail.y += tail.y > head.y ? -1 : 1;
        tail.x += tail.x > head.x ? -1 : 1;
      } else {
        if (Math.abs(diffx) > 1) {
          tail.x += tail.x > head.x ? -1 : 1;
        }

        if (Math.abs(diffy) > 1) {
          tail.y += tail.y > head.y ? -1 : 1;
        }
      }
    }

    set.add(`${rope[rope.length - 1].x}, ${rope[rope.length - 1].y}`);
  }
};

lines.forEach((line) => {
  move(...line.split(" "));
});

console.log(set.size);
