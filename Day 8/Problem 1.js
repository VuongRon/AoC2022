const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");
data = data.map((line) => line.split(""));

const isTreeVisible = (treeLine, treeHeight) => Math.max(...treeLine.map((i) => parseInt(i))) < parseInt(treeHeight);
const visibleTreeMap = {};

for (let x = 0; x < data.length; x++) {
  if (x === 0 || x === data[0].length - 1) {
    for (let y = 0; y < data[0].length; y++) {
      visibleTreeMap[`${x},${y}`] = true;
    }
  }

  for (let y = 0; y < data[0].length; y++) {
    if (y === 0 || y === data[0].length - 1) {
      visibleTreeMap[`${x},${y}`] = true;
      continue;
    }
    const visibleFromWest = isTreeVisible(data[x].slice(0, y), data[x][y]);
    const visibleFromEast = isTreeVisible(data[x].slice(y + 1, data[x].length), data[x][y]);
    if (visibleFromWest || visibleFromEast) visibleTreeMap[`${x},${y}`] = true;
  }
}

for (let y = 0; y < data[0].length; y++) {
  for (let x = 0; x < data.length; x++) {
    if (visibleTreeMap[`${x},${y}`]) continue;
    const visibleFromNorth = isTreeVisible(
      data.slice(0, x).map((row) => row[y]),
      data[x][y]
    );
    const visibleFromSouth = isTreeVisible(
      data.slice(x + 1, data.length).map((row) => row[y]),
      data[x][y]
    );
    if (visibleFromNorth || visibleFromSouth) visibleTreeMap[`${x},${y}`] = true;
  }
}

console.log(Object.keys(visibleTreeMap).length);
