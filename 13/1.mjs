import { readFile } from "node:fs/promises";

const data = (await readFile("./input.txt")).toString();

const rows = data.split("\n\n").map((row) =>
  row
    .split("\n")
    .filter((a) => a)
    .map((row) => JSON.parse(row))
);

const arr = Array.isArray;
const num = Number.isInteger;
const min = (a, b) => Math.min(a.length, b.length);
const envelope = (item) => (arr(item) ? item : [item]);

const compare = (left, right) => {
  left = envelope(left);
  right = envelope(right);

  for (let i = 0; i < min(left, right); i++) {
    const l = left[i];
    const r = right[i];

    if (num(l) && num(r)) {
      if (l === r) continue;
      return l < r;
    }

    const result = compare(l, r);
    if (null !== result) {
      return result;
    }
  }

  return left.length === right.length ? null : left.length < right.length;
};

let sum = 0;
rows.forEach((row, i) => {
  compare(...row) && (sum += i + 1);
});

console.log(sum);
