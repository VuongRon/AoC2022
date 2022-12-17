const fs = require("fs");

let data = fs
  .readFileSync("./problem1input")
  .toString()
  .split("\r\n")
  .map((line) => line.split(" "));

const addToQuickRefMap = (key) => {
  if (!quickRefMap[key]) {
    quickRefMap[key] = 1;
  } else {
    quickRefMap[key]++;
  }
};

const getDistance = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const inSensorRange = (x, y) => {
  for (const sensor of Object.values(sensorMap)) {
    if (getDistance(x, y, sensor.x, sensor.y) <= sensor.distance) {
      return true;
    }
  }
  return false;
};

const sensorMap = {};
const beaconMap = {};
const quickRefMap = {};
const distressBeaconXMin = 0;
const distressBeaconYMin = 0;
const distressBeaconXMax = 4000000;
const distressBeaconYMax = 4000000;

for (const line of data) {
  const sensorX = parseInt(line[2].split("=")[1]);
  const sensorY = parseInt(line[3].split("=")[1]);
  const beaconX = parseInt(line[8].split("=")[1]);
  const beaconY = parseInt(line[9].split("=")[1]);
  sensorMap[`(${sensorX},${sensorY})`] = {
    x: sensorX,
    y: sensorY,
    closestBeacon: { x: beaconX, y: beaconY },
    distance: getDistance(sensorX, sensorY, beaconX, beaconY),
  };
  beaconMap[`(${beaconX},${beaconY})`] = { x: beaconX, y: beaconY };
}

for (const sensor of Object.values(sensorMap)) {
  console.log(`Adding sensor field for sensor at ${sensor.x},${sensor.y} with distance ${sensor.distance}`);
  for (let i = 0; i <= sensor.distance + 1; i++) {
    const rowDistance = sensor.distance - i + 1;
    const newLeftX = sensor.x - rowDistance;
    const newRightX = sensor.x + rowDistance;
    if (sensor.y - i >= distressBeaconYMin) {
      const newY = sensor.y - i;
      const leftXWithinSensorRange = inSensorRange(newLeftX, newY);
      const rightXWithinSensorRange = inSensorRange(newRightX, newY);
      if (!leftXWithinSensorRange && newLeftX >= distressBeaconXMin) {
        addToQuickRefMap(`${newLeftX},${newY}`);
      }
      if (!rightXWithinSensorRange && newRightX <= distressBeaconXMax) {
        addToQuickRefMap(`${newRightX},${newY}`);
      }
    }
    if (sensor.y + i <= distressBeaconYMax) {
      const newY = sensor.y + i;
      const leftXWithinSensorRange = inSensorRange(newLeftX, newY);
      const rightXWithinSensorRange = inSensorRange(newRightX, newY);
      if (!leftXWithinSensorRange && sensor.x - rowDistance >= distressBeaconXMin) {
        addToQuickRefMap(`${sensor.x - rowDistance},${sensor.y + i}`);
      }
      if (!rightXWithinSensorRange && sensor.x + rowDistance <= distressBeaconXMax) {
        addToQuickRefMap(`${sensor.x + rowDistance},${sensor.y + i}`);
      }
    }
  }
}

console.log(quickRefMap);
