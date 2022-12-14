const fs = require("fs");

let data = fs.readFileSync("./problem1input").toString().split("\r\n");
data = data.map((line) => line.split(""));

const treesVisible = (treeHeight, treeLine) => {
  if (treeLine.length === 1) return 1;
  const count = treeLine.findIndex((i) => i >= treeHeight);
  return count >= 0 ? count + 1 : treeLine.length;
};
let maxScenicScore = 0;

for (let x = 1; x < data.length - 1; x++) {
  for (let y = 1; y < data[0].length - 1; y++) {
    const treeHeight = data[x][y];
    const westScenicScore = treesVisible(treeHeight, data[x].slice(0, y).reverse());
    const eastScenicScore = treesVisible(treeHeight, data[x].slice(y + 1, data[x].length));
    const northScenicScore = treesVisible(
      treeHeight,
      data
        .slice(0, x)
        .map((row) => row[y])
        .reverse()
    );
    const southScenicScore = treesVisible(
      treeHeight,
      data.slice(x + 1, data.length).map((row) => row[y])
    );
    const scenicScore = westScenicScore * eastScenicScore * northScenicScore * southScenicScore;
    if (scenicScore > maxScenicScore) maxScenicScore = scenicScore;
  }
}

console.log(maxScenicScore);
