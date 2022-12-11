import readline from "node:readline/promises";
import { createReadStream } from "node:fs";

const Op = {
  MUL: 1,
  ADD: 2,
};

class Monkey {
  items = [];
  operation = null;
  test = null;
  inspections = 0;

  constructor(items, operation, test) {
    this.items = items;
    this.operation = operation;
    this.test = test;
  }

  inspect() {
    while (this.items.length) {
      this.inspections++;
      const item = this.items.shift();
      const worry = this.operation.getValue(item);
      const monkeyIndex = this.test.getNext(worry);
      monkeys[monkeyIndex].items.push(worry);
    }
  }
}

class Operation {
  operation = null;
  value = 0;

  constructor(operation, value = 0) {
    this.operation = operation;
    this.value = value;
  }

  getValue(worry) {
    const v = (w) => Math.floor(w / 3);

    switch (this.operation) {
      case Op.ADD:
        return v(worry + this.value);
      default:
        return v(worry * (this.value || worry));
    }
  }
}

class Test {
  value = 0;

  constructor(value) {
    this.value = value;
  }

  getNext(worry) {
    return worry % this.value ? this.f : this.t;
  }
}

const reader = readline.createInterface({
  input: createReadStream("./input.txt"),
});

const extractNumber = (line) => Number(line.match(/\d+/g)?.[0]) ?? 0;

const monkeys = [];
let items, op, test;

for await (const line of reader) {
  if (line.startsWith("  S")) {
    items = line.split(":")[1].split(",").map(Number);
  }

  if (line.startsWith("  O")) {
    const _op = line.includes("+") ? Op.ADD : Op.MUL;
    const value = extractNumber(line);
    op = new Operation(_op, value);
  }

  if (line.startsWith("  T")) {
    test = new Test(extractNumber(line));
  }

  if (line.startsWith("   ")) {
    const prop = line.includes("true") ? "t" : "f";
    test[prop] = extractNumber(line);

    if ("f" === prop) {
      monkeys.push(new Monkey(items, op, test));
    }
  }
}

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    monkey.inspect();
  });
}

monkeys.sort((a, b) => b.inspections - a.inspections);
console.log(monkeys[0].inspections * monkeys[1].inspections);
