const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString().split("\r\n");

const scoreMap = {
  X: 1,
  Y: 2,
  Z: 3,
};

const score = data.reduce((score, round) => {
  const moves = round.split(" ");
  let roundScore = scoreMap[moves[1]];
  if (["CX", "AY", "BZ"].includes(moves[0] + moves[1])) roundScore += 6;
  if (["AX", "BY", "CZ"].includes(moves[0] + moves[1])) roundScore += 3;
  return score + roundScore;
}, 0);

console.log(score);
