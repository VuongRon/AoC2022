const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString().split("\r\n");
const dividingLine = data.indexOf("");
const stackLines = data.slice(0, dividingLine - 1);
const instructions = data.slice(dividingLine + 1);
const stacks = {};

const objectUpsert = (obj, key, value) => {
  if (obj[key] === undefined) obj[key] = value;
  else obj[key] += value;
};

stackLines.forEach((stackLine) => {
  for (let i = 0; i * 4 < stackLine.length; i++) {
    const stackNumber = i + 1;
    const startingIndex = i * 4;
    const endingIndex = (i + 1) * 4;
    const substring = stackLine.substring(startingIndex, endingIndex);
    const stackValue = substring.trim();
    if (stackValue === "") continue;
    objectUpsert(stacks, stackNumber, stackValue[1]);
  }
});

instructions.forEach((instruction) => {
  const values = instruction.split(" ");
  const length = parseInt(values[1]);
  const fromStack = values[3];
  const toStack = values[5];
  stacks[toStack] = stacks[fromStack].substring(0, length) + stacks[toStack];
  stacks[fromStack] = stacks[fromStack].substring(length);
});

const finalValue = Object.values(stacks).reduce((string, stack) => string + stack[0], "");

console.log(finalValue);
