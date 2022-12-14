const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");

const elevationMap = {
  S: 0,
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
  E: 25,
};

const mapWidth = data[0].length;
const mapHeight = data.length;
const shortestStepsMemo = {};
let startingX = 0;
let startingY = 0;
let endingX = 0;
let endingY = 0;

for (let i = 0; i < data.length; i++) {
  let startFound = false;
  let endFound = false;
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === "S") {
      startingX = i;
      startingY = j;
      startFound = true;
    }
    if (data[i][j] === "E") {
      endingX = i;
      endingY = j;
      endFound = true;
    }
    if (startFound && endFound) break;
  }
  if (startFound && endFound) break;
}

shortestStepsMemo[`${startingX},${startingY}`] = 0;

const isLegalMove = (startingX, startingY, potentialX, potentialY, visited) => {
  if (potentialX < 0 || potentialX >= mapHeight) return false;
  if (potentialY < 0 || potentialY >= mapWidth) return false;
  if (visited[`${potentialX},${potentialY}`]) return false;
  let originalPoint = data[startingX][startingY];
  let point = data[potentialX][potentialY];
  return elevationMap[point] - elevationMap[originalPoint] <= 1;
};

const queue = [{ position: [startingX, startingY], steps: 0 }];
const visited = {};
visited[`${startingX},${startingY}`] = true;

while (queue.length) {
  const { position, steps } = queue.shift();
  const [x, y] = position;

  const neighbours = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].filter(([potentialX, potentialY]) => isLegalMove(x, y, potentialX, potentialY, visited));

  for (let i = 0; i < neighbours.length; i++) {
    const [potentialX, potentialY] = neighbours[i];
    visited[`${potentialX},${potentialY}`] = true;
    shortestStepsMemo[`${potentialX},${potentialY}`] = steps + 1;
    queue.push({ position: [potentialX, potentialY], steps: steps + 1 });
  }
}

console.log(shortestStepsMemo[`${endingX},${endingY}`]);
