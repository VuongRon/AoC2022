const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");

const correctPairs = [];

const arrayStringToArray = (string) => {
  return JSON.parse(string);
};

const packetsInOrder = (left, right) => {
  if (left.length === 0 && right.length === 0) return null;
  if (left.length === 0) return true;
  if (right.length === 0) return false;

  const leftItem = left[0];
  const rightItem = right[0];

  console.log(`leftItem: ${JSON.stringify(leftItem)}, rightItem: ${JSON.stringify(rightItem)}`);

  if (typeof leftItem === "number" && typeof rightItem === "number") {
    if (leftItem < rightItem) return true;
    if (leftItem > rightItem) return false;
    return packetsInOrder(left.slice(1), right.slice(1));
  }

  if (typeof leftItem === "object" && typeof rightItem === "object") {
    const result = packetsInOrder(leftItem, rightItem);
    if (result === null) return packetsInOrder(left.slice(1), right.slice(1));
    return result;
  }

  if (typeof leftItem === "object" && typeof rightItem === "number") {
    const result = packetsInOrder(leftItem, [rightItem]);
    if (result === null) return packetsInOrder(left.slice(1), right.slice(1));
    return result;
  }

  if (typeof leftItem === "number" && typeof rightItem === "object") {
    const result = packetsInOrder([leftItem], rightItem);
    if (result === null) return packetsInOrder(left.slice(1), right.slice(1));
    return result;
  }

  return null;
};

for (let i = 0; i < data.length; i += 3) {
  const left = arrayStringToArray(data[i]);
  const right = arrayStringToArray(data[i + 1]);
  console.log(`Pair ${i / 3 + 1}:`);
  console.log(JSON.stringify(left));
  console.log(JSON.stringify(right));
  const result = packetsInOrder(left, right);
  console.log(`Result: ${result}`);
  console.log("");
  if (result) correctPairs.push(i / 3 + 1);
}

console.log(correctPairs);
console.log(correctPairs.reduce((sum, pair) => sum + pair, 0));
