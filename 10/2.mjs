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

const rows = ["", "", "", "", "", ""];

for (let i = 0; i < 240; i++) {
  const row = Math.floor(i / 40);
  const col = i % 40;

  rows[row] += Math.abs(col - X) > 1 ? " " : "▮";

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

// console.log(X);

console.log(rows.join("\n"));
