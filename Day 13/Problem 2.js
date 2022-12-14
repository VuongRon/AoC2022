const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");

const twoDividerKey = [[2]];
const sixDividerKey = [[6]];

const buckets = {
  0: [],
  1: [],
  2: [twoDividerKey],
  3: [],
  4: [],
  5: [],
  6: [sixDividerKey],
  7: [],
  8: [],
  9: [],
  10: [],
  nothing: [],
};
const arrayStringToArray = (string) => {
  return JSON.parse(string);
};

const getFirstElement = (array) => {
  if (array.length === 0) return null;
  if (typeof array[0] === "number") return array[0];
  return getFirstElement(array[0]);
};

const packetsInOrder = (left, right) => {
  if (left.length === 0 && right.length === 0) return null;
  if (left.length === 0) return true;
  if (right.length === 0) return false;

  const leftItem = left[0];
  const rightItem = right[0];

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
  const leftFirstElement = getFirstElement(left);
  const leftBucketKey = leftFirstElement === null ? "nothing" : leftFirstElement;
  buckets[leftBucketKey].push(left);
  const rightFirstElement = getFirstElement(right);
  const rightBucketKey = rightFirstElement === null ? "nothing" : rightFirstElement;
  buckets[rightBucketKey].push(right);
}

for (const key of Object.keys(buckets)) {
  buckets[key] = buckets[key].sort((left, right) => {
    const result = packetsInOrder(left, right);
    if (result === null) return 0;
    if (result) return -1;
    return 1;
  });
}

const finalList = buckets.nothing.concat(
  buckets[0],
  buckets[1],
  buckets[2],
  buckets[3],
  buckets[4],
  buckets[5],
  buckets[6],
  buckets[7],
  buckets[8],
  buckets[9],
  buckets[10]
);

const twoDividerKeyIndex = finalList.findIndex((item) => item === twoDividerKey);
const sixDividerKeyIndex = finalList.findIndex((item) => item === sixDividerKey);

console.log((twoDividerKeyIndex + 1) * (sixDividerKeyIndex + 1));
