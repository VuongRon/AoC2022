const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");

class Monkey {
  constructor(items, operation, test) {
    this.items = items || [];
    this.operation = operation;
    this.test = test;
    this.trueTestTarget = null;
    this.falseTestTarget = null;
    this.itemsInspected = 0;
  }
}

const monkeys = {};
const divisors = [];

[...Array(Math.ceil(data.length / 7)).keys()].forEach((i) => {
  monkeys[data[i * 7].replace(":", "")] = new Monkey();
});

for (let i = 0; i < data.length; i += 7) {
  const monkey = monkeys[data[i].replace(":", "")];
  const items = data[i + 1]
    .replace("  Starting items: ", "")
    .split(", ")
    .map((i) => parseInt(i));
  const operationArray = data[i + 2].replace("  Operation: new = ", "").split(" ");
  let operation;
  if (operationArray[2] !== "old") {
    const operand = parseInt(operationArray[2]);
    operationArray[1] === "+" ? (operation = (a) => a + operand) : (operation = (a) => a * operand);
  } else {
    operationArray[1] === "+" ? (operation = (a) => a + a) : (operation = (a) => a * a);
  }
  const divisor = parseInt(data[i + 3].replace("  Test: divisible by ", ""));
  const test = (a) => a % divisor === 0;
  divisors.push(divisor);
  const trueTestTargetName = data[i + 4].replace("    If true: throw to ", "");
  const trueTestTarget = monkeys[trueTestTargetName[0].toUpperCase() + trueTestTargetName.slice(1)];
  const falseTestTargetName = data[i + 5].replace("    If false: throw to ", "");
  const falseTestTarget = monkeys[falseTestTargetName[0].toUpperCase() + falseTestTargetName.slice(1)];
  monkey.items = items;
  monkey.operation = operation;
  monkey.test = test;
  monkey.trueTestTarget = trueTestTarget;
  monkey.falseTestTarget = falseTestTarget;
}

const greatestCommonDivisor = divisors.reduce((gcd, divisor) => gcd * divisor, 1);

const processRound = () => {
  for (const key of Object.keys(monkeys)) {
    const monkey = monkeys[key];
    while (monkey.items.length > 0) {
      let item = monkey.items.shift();
      item = monkey.operation(item) % greatestCommonDivisor;
      monkey.test(item) ? monkey.trueTestTarget.items.push(item) : monkey.falseTestTarget.items.push(item);
      monkey.itemsInspected++;
    }
    monkeys[key] = monkey;
  }
};

for (let i = 1; i <= 10000; i++) {
  processRound();
}

const itemsInspected = Object.values(monkeys)
  .map((b) => b.itemsInspected)
  .sort((a, b) => b - a);

const monkeyBusiness = itemsInspected[0] * itemsInspected[1];

console.log(monkeyBusiness);
