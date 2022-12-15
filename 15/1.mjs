import { readFileSync } from "fs";

const data = readFileSync("./input.txt").toString();

const { abs, min, max } = Math;

class Sensor {
  static beacons = {};
  static minX = Infinity;
  static maxX = -Infinity;

  constructor([sx, sy], [bx, by]) {
    Object.assign(this, { sx, sy, bx, by });
    Sensor.beacons[`${bx}, ${by}`] = true;
    this.distance = abs(sx - bx) + abs(sy - by);
    Sensor.minX = min(Sensor.minX, sx - this.distance);
    Sensor.maxX = max(Sensor.maxX, sx + this.distance);
  }

  checkPos(x, y) {
    return (
      Sensor.beacons[`${x}, ${y}`] ||
      this.distance < abs(this.sx - x) + abs(this.sy - y)
    );
  }
}

const lines = data.split("\n").filter((a) => a);
const sensors = [];
lines.forEach((line) => {
  const [sCoords, bCoords] = line
    .split(":")
    .map((part) => part.match(/-?\d+/g).map(Number));
  sensors.push(new Sensor(sCoords, bCoords));
});

let count = 0;
for (let i = Sensor.minX; i <= Sensor.maxX; i++) {
  for (const sensor of sensors) {
    if (!sensor.checkPos(i, 2000000)) {
      count++;
      break;
    }
  }
}

console.log(count);
