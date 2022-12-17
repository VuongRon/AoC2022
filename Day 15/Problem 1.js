const fs = require("fs");

let data = fs
  .readFileSync("./problem1input")
  .toString()
  .split("\r\n")
  .map((line) => line.split(" "));

const getDistance = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const addToQuickRefMap = (key) => {
  if (!quickRefMap[key]) {
    quickRefMap[key] = 1;
  } else {
    quickRefMap[key]++;
  }
};

let xMin = Infinity;
let xMax = 0;
let yMin = Infinity;
let yMax = 0;

const sensorMap = {};
const beaconMap = {};

for (const line of data) {
  const sensorX = parseInt(line[2].split("=")[1]);
  const sensorY = parseInt(line[3].split("=")[1]);
  const beaconX = parseInt(line[8].split("=")[1]);
  const beaconY = parseInt(line[9].split("=")[1]);
  if (sensorX < xMin) xMin = sensorX;
  if (sensorX > xMax) xMax = sensorX;
  if (sensorY < yMin) yMin = sensorY;
  if (sensorY > yMax) yMax = sensorY;
  if (beaconX < xMin) xMin = beaconX;
  if (beaconX > xMax) xMax = beaconX;
  if (beaconY < yMin) yMin = beaconY;
  if (beaconY > yMax) yMax = beaconY;
  sensorMap[`(${sensorX},${sensorY})`] = {
    x: sensorX,
    y: sensorY,
    closestBeacon: {
      x: beaconX,
      y: beaconY,
    },
  };
  beaconMap[`(${beaconX},${beaconY})`] = { x: beaconX, y: beaconY };
}

const map = {};
const quickRefMap = {};
const rowOfNote = 2000000;

for (const sensor of Object.values(sensorMap)) {
  map[`${sensor.y - yMin},${sensor.x - xMin}`] = "S";
  const distance = getDistance(sensor.x, sensor.y, sensor.closestBeacon.x, sensor.closestBeacon.y);
  console.log(`Adding sensor field for sensor at ${sensor.x},${sensor.y} with distance ${distance}`);
  if (sensor.y + distance + 1 < rowOfNote || sensor.y - distance - 1 > rowOfNote) continue;
  const distanceFromRowOfNote = Math.abs(rowOfNote - sensor.y);
  console.log(`Parsing rows ${distanceFromRowOfNote} distance from sensor.`);
  if (sensor.y - distanceFromRowOfNote >= yMin && sensor.y - distanceFromRowOfNote === rowOfNote) {
    for (let j = 0; j <= distance - distanceFromRowOfNote; j++) {
      if (!map[`${sensor.y - distanceFromRowOfNote - yMin},${sensor.x - j - xMin}`]) {
        map[`${sensor.y - distanceFromRowOfNote - yMin},${sensor.x - j - xMin}`] = "#";
        addToQuickRefMap(`${sensor.y - distanceFromRowOfNote}`);
      }
      if (!map[`${sensor.y - distanceFromRowOfNote - yMin},${sensor.x + j - xMin}`]) {
        map[`${sensor.y - distanceFromRowOfNote - yMin},${sensor.x + j - xMin}`] = "#";
        addToQuickRefMap(`${sensor.y - distanceFromRowOfNote}`);
      }
    }
  }
  if (sensor.y + distanceFromRowOfNote <= yMax && sensor.y + distanceFromRowOfNote === rowOfNote) {
    for (let j = 0; j <= distance - distanceFromRowOfNote; j++) {
      if (!map[`${sensor.y + distanceFromRowOfNote - yMin},${sensor.x - j - xMin}`]) {
        map[`${sensor.y + distanceFromRowOfNote - yMin},${sensor.x - j - xMin}`] = "#";
        addToQuickRefMap(`${sensor.y + distanceFromRowOfNote}`);
      }
      if (!map[`${sensor.y + distanceFromRowOfNote - yMin},${sensor.x + j - xMin}`]) {
        map[`${sensor.y + distanceFromRowOfNote - yMin},${sensor.x + j - xMin}`] = "#";
        addToQuickRefMap(`${sensor.y + distanceFromRowOfNote}`);
      }
    }
  }
}

for (const beacon of Object.values(beaconMap)) {
  map[`${beacon.y - yMin},${beacon.x - xMin}`] = "B";
  if (quickRefMap[`${beacon.y}`]) quickRefMap[`${beacon.y}`] -= 1;
}

console.log(xMin, xMax, yMin, yMax);
console.log(quickRefMap);
