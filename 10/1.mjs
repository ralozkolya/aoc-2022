import readline from "node:readline/promises";
import { createReadStream } from "node:fs";

const reader = readline.createInterface({
  input: createReadStream("./input.txt"),
});

const lines = [];

for await (const line of reader) {
  lines.push(line);
}

let X = 1;
let read = true;
let value = 0;
const values = [];

for (let i = 1; i <= 220; i++) {
  if (!((i - 20) % 40)) {
    values.push(i * X);
  }

  if (!read) {
    read = true;
    X += value;
    continue;
  }

  const line = lines.shift();
  if ("noop" === line) {
    continue;
  }

  read = false;
  value = Number(line.split(" ")[1]);
}

console.log(values.reduce((a, b) => a + b));
