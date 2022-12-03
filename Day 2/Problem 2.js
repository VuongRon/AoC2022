const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString().split("\r\n");

const scoreMap = {
  "A X": 3,
  "A Y": 1 + 3,
  "A Z": 2 + 6,
  "B X": 1,
  "B Y": 2 + 3,
  "B Z": 3 + 6,
  "C X": 2,
  "C Y": 3 + 3,
  "C Z": 1 + 6,
};

const score = data.reduce((score, round) => {
  return score + scoreMap[round];
}, 0);

console.log(score);
