import readline from "node:readline/promises";
import { createReadStream } from "node:fs";

const reader = readline.createInterface({
  input: createReadStream("./input.txt"),
});

const map = {};
const path = [];

for await (const line of reader) {
  if (line.startsWith("$ cd")) {
    if ("$ cd .." === line) {
      path.pop();
      continue;
    }

    const dir = line.substring(5);
    path.push(dir);
  } else if (line.match(/^\d/)) {
    const size = Number(line.match(/^\d+/)[0]);

    path.forEach((dir, i) => {
      const key = `${path.slice(0, i).join("/")}/${dir}`;
      map[key] = map[key] + size || size;
    });
  }
}

let sum = 0;
Object.keys(map)
  .filter((dir) => map[dir] <= 100000)
  .forEach((dir) => {
    sum += map[dir];
  });

console.log(sum);
