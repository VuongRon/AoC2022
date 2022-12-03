const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString().split("\r\n\r\n");
let maxCalories = 0;
let secondMaxCalories = 0;
let thirdMaxCalories = 0;
const calories = data.map((bag) => {
  const calorieSum = bag.split("\r\n").reduce((sum, item) => parseInt(item) + sum, 0);
  if (calorieSum > maxCalories) {
    thirdMaxCalories = secondMaxCalories;
    secondMaxCalories = maxCalories;
    maxCalories = calorieSum;
  } else if (calorieSum > secondMaxCalories) {
    thirdMaxCalories = secondMaxCalories;
    secondMaxCalories = calorieSum;
  } else if (calorieSum > thirdMaxCalories) {
    thirdMaxCalories = calorieSum;
  }
  return calorieSum;
});

console.log(maxCalories + secondMaxCalories + thirdMaxCalories);
