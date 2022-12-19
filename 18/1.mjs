import { readFileSync } from "fs";

const data = readFileSync("./input.txt")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((row) => row.split(",").map(Number));

const droplet = [];

let area = 0;

const addBit = (bit) => {
  area += 6;

  const [x, y, z] = bit;

  droplet[x] = droplet[x] || [];
  droplet[x][y] = droplet[x][y] || [];
  droplet[x][y][z] = true;

  if (droplet[x - 1]?.[y]?.[z]) area -= 2;
  if (droplet[x + 1]?.[y]?.[z]) area -= 2;
  if (droplet[x]?.[y - 1]?.[z]) area -= 2;
  if (droplet[x]?.[y + 1]?.[z]) area -= 2;
  if (droplet[x]?.[y]?.[z + 1]) area -= 2;
  if (droplet[x]?.[y]?.[z - 1]) area -= 2;
};

data.forEach((bit) => {
  addBit(bit);
});

console.log(area);
