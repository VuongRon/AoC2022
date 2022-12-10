const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");
data = data.map((line) => line.split(" "));

class Coordinate {
  constructor(x, y, leader) {
    this.x = x || 0;
    this.y = y || 0;
    this.visited = { "0,0": true };
    this.leader = leader;
  }

  respondToLeader() {
    if (!this.leader) return;
    const xDiff = this.leader.x - this.x;
    const yDiff = this.leader.y - this.y;
    if ([-1, 0, 1].includes(xDiff) && [-1, 0, 1].includes(yDiff)) return;
    if ([-2, 2].includes(xDiff)) {
      if ([-1, 1].includes(yDiff)) this.y += yDiff;
      this.x += xDiff / 2;
    }
    if ([-2, 2].includes(yDiff)) {
      if ([-1, 1].includes(xDiff)) this.x += xDiff;
      this.y += yDiff / 2;
    }
    this.visited[`${this.x},${this.y}`] = true;
  }
}

const head = new Coordinate();
const tail = new Coordinate(0, 0, head);

for (const instruction of data) {
  const direction = instruction[0];
  let headMove;
  if (direction === "R") headMove = { axis: "x", value: 1 };
  if (direction === "L") headMove = { axis: "x", value: -1 };
  if (direction === "U") headMove = { axis: "y", value: 1 };
  if (direction === "D") headMove = { axis: "y", value: -1 };
  for (let i = 0; i < parseInt(instruction[1]); i++) {
    head[headMove.axis] += headMove.value;
    tail.respondToLeader();
  }
}

console.log(Object.keys(tail.visited).length);
