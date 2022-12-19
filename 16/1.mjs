import { readFileSync } from "fs";
import { Permutation } from "js-combinatorics";

const data = readFileSync("./input.txt").toString();

const valves = {};

data
  .split("\n")
  .filter((a) => a)
  .forEach((line) => {
    const name = line.substring(6, 8);
    const rate = +line.match(/\d+/)[0];
    const next = Array.from(line.split(";")[1].match(/[A-Z]{2}/g));
    valves[name] = { name, rate, next };
  });

const cache = {};

const getHops = (from, to) => {
  const queue = from.next.map((valve) => ({ valve, hops: 1 }));

  if (from.name === to) {
    return 0;
  }

  const key = `${from.name},${to}`;
  if (cache[key]) {
    return cache[key];
  }

  let valve, hops;
  while (({ valve, hops } = queue.shift())) {
    if (valve === to) {
      cache[key] = hops;
      return hops;
    }

    queue.push(
      ...valves[valve].next.map((valve) => ({ valve, hops: hops + 1 }))
    );
  }
};

const nonZero = Object.keys(valves).filter((valve) => valves[valve].rate > 0);

console.log(nonZero.length);

const permutations = new Permutation(nonZero);
let max = 0;

for (let i = BigInt(0); i < permutations.length; i++) {
  const permutation = permutations.at(i);

  let pressure = 0,
    time = 30,
    current = Object.keys(valves)[0];

  for (const valve of permutation) {
    const hops = getHops(valves[current], valve);
    const diff = (time - hops - 1) * valves[valve].rate;
    if (diff < 0) {
      break;
    }
    pressure += diff;
    time -= hops + 1;
    current = valve;
  }

  max = Math.max(pressure, max);

  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(`${max}, ${i}`);
  // process.stdout.write("\n");
}
