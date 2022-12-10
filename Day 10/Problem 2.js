const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");
data = data.map((line) => line.split(" "));
let x = 1;
let cycle = 1;
const rowSize = 40;
const pixels = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};

const bumpCycle = () => {
  const row = Math.ceil(cycle / rowSize);
  let pixelInRow = (cycle % rowSize) - 1;
  const pixel = [-1, 0, 1].includes(x - pixelInRow) ? "#" : ".";
  pixels[row].push(pixel);
  cycle++;
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

for (const row of Object.values(pixels)) {
  console.log(row.join(""));
}
