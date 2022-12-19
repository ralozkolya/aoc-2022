import { readFileSync } from "fs";

const data = readFileSync("./input.txt")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((row) => row.split(",").map(Number));

const { min, max } = Math;

const droplet = [];

let area = 0;

let minX = Infinity,
  maxX = -Infinity,
  minY = Infinity,
  maxY = -Infinity,
  minZ = Infinity,
  maxZ = -Infinity;

const addBit = (bit, droplet) => {
  let area = 6;

  const [x, y, z] = bit;

  minX = min(minX, x);
  minY = min(minY, y);
  minZ = min(minZ, z);
  maxX = max(maxX, x);
  maxY = max(maxY, y);
  maxZ = max(maxZ, z);

  droplet[x] = droplet[x] || [];
  droplet[x][y] = droplet[x][y] || [];
  droplet[x][y][z] = true;

  if (droplet[x - 1]?.[y]?.[z]) area -= 2;
  if (droplet[x + 1]?.[y]?.[z]) area -= 2;
  if (droplet[x]?.[y - 1]?.[z]) area -= 2;
  if (droplet[x]?.[y + 1]?.[z]) area -= 2;
  if (droplet[x]?.[y]?.[z + 1]) area -= 2;
  if (droplet[x]?.[y]?.[z - 1]) area -= 2;

  return area;
};

data.forEach((bit) => {
  area += addBit(bit, droplet);
});

const getQueue = (x, y, z) => {
  return [
    { x: x - 1, y, z },
    { x: x + 1, y, z },
    { x, y: y - 1, z },
    { x, y: y + 1, z },
    { x, y, z: z - 1 },
    { x, y, z: z + 1 },
  ].filter(({ x, y, z }) => !droplet[x]?.[y]?.[z]);
};

const pockets = [];
let pocketArea = 0;

const findWayOut = (x, y, z) => {
  const queue = getQueue(x, y, z);
  const visited = {};

  while (queue.length) {
    const { x, y, z } = queue.shift();
    if (x < minX || x > maxX || y < minY || y > maxY || z < minZ || z > maxZ) {
      return true;
    }

    const key = `${x},${y},${z}`;
    if (!visited[key]) {
      visited[key] = true;
      queue.push(...getQueue(x, y, z));
    }
  }

  pocketArea += addBit([x, y, z], pockets);
  return false;
};

for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    for (let z = minZ; z <= maxZ; z++) {
      if (droplet[x]?.[y]?.[z]) {
        continue;
      }

      findWayOut(x, y, z);
    }
  }
}

console.log(area, pocketArea, area - pocketArea);
