const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString().split("\r\n");
const pairs = data.map((line) => line.split(","));

const fullyContainedCount = pairs.reduce((count, pair) => {
  const [first, second] = pair;
  const [firstMin, firstMax] = first.split("-").map((num) => parseInt(num));
  const [secondMin, secondMax] = second.split("-").map((num) => parseInt(num));
  if (firstMin < secondMin) {
    if (secondMin <= firstMax && secondMax <= firstMax) return count + 1;
    return count;
  }
  if (firstMin == secondMin) {
    if ((secondMin <= firstMax && secondMax <= firstMax) || (firstMin <= secondMax && firstMax <= secondMax))
      return count + 1;
    return count;
  }
  if (firstMax <= secondMax) return count + 1;
  return count;
}, 0);

console.log(fullyContainedCount);
