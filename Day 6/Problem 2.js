const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString();
const markerLength = 14;
let index = 0;

while (index + markerLength - 1 < data.length) {
  let matchMap = {};
  let pairChar = "";
  for (let offset = 0; offset < markerLength; offset++) {
    const currentIndex = index + offset;
    if (matchMap.hasOwnProperty(data[currentIndex])) {
      pairChar = data[currentIndex];
      matchMap[data[currentIndex]] = matchMap[data[currentIndex]].concat(currentIndex);
    } else matchMap[data[currentIndex]] = [currentIndex];
  }
  if (pairChar === "") break;
  index = matchMap[pairChar][matchMap[pairChar].length - 2] + 1;
}

console.log(index + markerLength);
