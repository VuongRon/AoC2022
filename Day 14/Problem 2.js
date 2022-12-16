const fs = require("fs");

let data = fs
  .readFileSync("./problem1input")
  .toString()
  .split("\r\n")
  .map((line) => line.split(" -> "));

const renderMap = (map) => {
  for (const line of map) {
    console.log(line.join(""));
  }
};

let xMin = Infinity;
let xMax = 0;
let yMax = 0;
const sandSpawn = 500;
let sandCount = 0;

for (const line of data) {
  for (const node of line) {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y > yMax) yMax = y;
  }
}

xMin = xMin - 200;
xMax = xMax + 200;
yMax = yMax + 2;

const map = new Array(yMax + 1).fill(".").map((_el, i) => {
  if (i === yMax) return new Array(xMax - xMin + 1).fill("#");
  return new Array(xMax - xMin + 1).fill(".");
});
map[0][sandSpawn - xMin] = "+";

for (const line of data) {
  for (let i = 0; i < line.length - 1; i++) {
    const [x1, y1] = line[i].split(",").map((i) => parseInt(i));
    const [x2, y2] = line[i + 1].split(",").map((i) => parseInt(i));
    if (x1 === x2) {
      const lowerY = y1 < y2 ? y1 : y2;
      const higherY = y1 > y2 ? y1 : y2;
      for (let y = lowerY; y <= higherY; y++) {
        map[y][x1 - xMin] = "#";
      }
    } else {
      const lowerX = x1 < x2 ? x1 : x2;
      const higherX = x1 > x2 ? x1 : x2;
      for (let x = lowerX; x <= higherX; x++) {
        map[y1][x - xMin] = "#";
      }
    }
  }
}

const releaseSand = () => {
  let settled = false;
  let sandPosition = [0, sandSpawn - xMin];
  let sandAdded = false;
  while (!settled) {
    if (sandPosition[0] + 1 > yMax) {
      settled = true;
      break;
    }
    if (["#", "o"].includes(map[sandPosition[0] + 1][sandPosition[1]])) {
      if (sandPosition[1] - 1 < 0) {
        settled = true;
        break;
      }
      if (["#", "o"].includes(map[sandPosition[0] + 1][sandPosition[1] - 1])) {
        if (sandPosition[1] + 1 > xMax - xMin) {
          settled = true;
          break;
        }
        if (["#", "o"].includes(map[sandPosition[0] + 1][sandPosition[1] + 1])) {
          map[sandPosition[0]][sandPosition[1]] = "o";
          sandAdded = !sandPosition.every((el, i) => el === [0, sandSpawn - xMin][i]);
          settled = true;
          break;
        }
        sandPosition = [sandPosition[0] + 1, sandPosition[1] + 1];
        continue;
      }
      sandPosition = [sandPosition[0] + 1, sandPosition[1] - 1];
      continue;
    }
    sandPosition = [sandPosition[0] + 1, sandPosition[1]];
  }
  return sandAdded;
};

while (releaseSand()) {
  sandCount++;
}

renderMap(map);
console.log(sandCount);
