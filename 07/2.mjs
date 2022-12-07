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

const total = 70000000;
const free = total - map["//"];

const order = Object.keys(map).sort((a, b) => map[a] - map[b]);

for (const dir of order) {
  if (map[dir] + free > 30000000) {
    console.log(map[dir]);
    break;
  }
}
