const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");
data = data.map((line) => line.split(" "));
let x = 1;
let cycle = 0;
const signalStrengths = {};
const interestingCycles = [20, 60, 100, 140, 180, 220];

const bumpCycle = () => {
  cycle++;
  if (interestingCycles.includes(cycle)) signalStrengths[cycle] = x * cycle;
};

for (const instruction of data) {
  const command = instruction[0];
  if (command === "noop") bumpCycle();
  else if (command === "addx") {
    bumpCycle();
    bumpCycle();
    x += parseInt(instruction[1]);
  }
}

console.log(Object.values(signalStrengths).reduce((sum, num) => sum + num, 0));
