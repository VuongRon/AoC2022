const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString().split("\r\n\r\n");
let maxCalories = 0;
const calories = data.map((bag) => {
  const calorieSum = bag.split("\r\n").reduce((sum, item) => parseInt(item) + sum, 0);
  if (calorieSum > maxCalories) maxCalories = calorieSum;
  return calorieSum;
});

console.log(maxCalories);
