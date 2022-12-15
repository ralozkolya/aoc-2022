import { readFileSync } from "fs";

const data = readFileSync("./input.txt").toString();

const { abs } = Math;

const bound = 4000000;
const edges = {};

class Sensor {
  constructor([sx, sy], [bx, by]) {
    Object.assign(this, { sx, sy, bx, by });
    this.distance = abs(sx - bx) + abs(sy - by);
  }

  checkPos(x, y) {
    return this.distance < abs(this.sx - x) + abs(this.sy - y);
  }

  checkEdges() {
    for (let i = 0; i <= this.distance + 1; i++) {
      const diff = this.distance - i + 1;
      const points = [
        [this.sx + diff, this.sy + i],
        [this.sx - diff, this.sy + i],
        [this.sx + diff, this.sy - i],
        [this.sx - diff, this.sy - i],
      ].filter(
        (point) =>
          point[0] > -1 &&
          point[0] <= bound &&
          point[1] > -1 &&
          point[1] <= bound
      );

      outer: for (const point of points) {
        for (const sensor of sensors) {
          if (!sensor.checkPos(...point)) {
            continue outer;
          }
        }
        const count = edges[`${point.x}, ${point.y}`] ?? 0;
        edges[`${point[0]}, ${point[1]}`] = count + 1;
      }
    }
  }
}

const lines = data.split("\n").filter((a) => a);
const sensors = [];

for (const line of lines) {
  const [sCoords, bCoords] = line
    .split(":")
    .map((part) => part.match(/-?\d+/g).map(Number));
  const sensor = new Sensor(sCoords, bCoords);
  sensors.push(sensor);
}

for (const sensor of sensors) {
  sensor.checkEdges();
}

console.log(edges);
