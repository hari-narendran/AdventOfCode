const { readFileSync } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

let lines = readFile('./15/input.txt');
//let lines = readFile('./15/input.txt');
//console.log("🚀 ~ file: part_1_v1.js:10 ~ lines", lines);

function getInput() {
  let data = [];
  let minPoint = {};
  let maxPoint = {};
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < lines.length; i++) {
    let sensor = {};
    let beacon = {};
    let sensor_ = lines[i].split(':')[0];
    let beacon_ = lines[i].split(':')[1];
    sensor.x = Number(sensor_.split('x=').join(',').split(',')[1]);
    sensor.y = Number(sensor_.split('y=')[1]);
    beacon.x = Number(beacon_.split('x=').join(',').split(',')[1]);
    beacon.y = Number(beacon_.split('y=')[1]);

    //* Following code is to find the grid size
    minX = Math.min(minX, sensor.x, beacon.x);
    maxX = Math.max(maxX, sensor.x, beacon.x);
    minY = Math.min(minY, sensor.y, beacon.y);
    maxY = Math.max(maxY, sensor.y, beacon.y);
    data.push({ sensor, beacon });
  }
  minPoint = { x: minX, y: minY };
  maxPoint = { x: maxX, y: maxY };
  return { data, minPoint, maxPoint };
}

//* Calculate Manhattan distance
function calculateDistance(pointA, pointB) {
  return Math.abs(pointB.x - pointA.x) + Math.abs(pointB.y - pointA.y);
}

const { data, minPoint, maxPoint } = getInput();
console.log(minPoint);
console.log(maxPoint);

//* Add the manhattan distance for each Senson-Beacon to the object
for (let i = 0; i < data.length; i++) {
  let delta = calculateDistance(data[i].sensor, data[i].beacon);
  //console.log("🚀 ~ file: part_1_v1.js:39 ~ delta", delta)
  data[i].delta = delta;
}
//console.log(data);

function isOverlap(pointA, pointB) {
  return pointA.x == pointB.x && pointA.y == pointB.y;
}
function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function part1() {
  let nonBeaconMap = new Set();
  let beaconCount = 0;
  let existingBeacons = new Set();
  //const y = 10;
  const y = 2000000;
  for (const { sensor, beacon, delta } of data) {
    if (beacon.y == y) {
      beaconCount++;
      existingBeacons.add(beacon.x);
    }
    //let minDistance = calculateDistance(sensor, { x: sensor.x, y });
    const minDistance = distance(sensor, { x: sensor.x, y });
    //console.log(minDistance);
    if (minDistance <= delta) {
      //nonBeaconCount += 1;
      const distanceAroundSensorX = delta - minDistance;
      //for (let x = minPoint.x; x < maxPoint.x; x++) {
      for (
        let x = sensor.x - distanceAroundSensorX;
        x <= sensor.x + distanceAroundSensorX;
        x++
      ) {
        nonBeaconMap.add(x);
      }
    }
    //console.log(nonBeaconCount);
  }
  console.log(nonBeaconMap.size - existingBeacons.size);
  //console.log(nonBeaconMap);
}

part1();
