const { readFileSync } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

let lines = readFile('./15/sampleInput.txt');
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

function part1() {
  /* for (let i = 0; i < data.length; i++) {
    const { sensor, beacon, delta } = data[i];
    //const nonBeacons = new Set();

    let nonBeaconCount = 0;
    for (let j = minPoint.x; j < maxPoint.x; j++) {
      let curPoint = {};
      curPoint.x = j;
      curPoint.y = 10;
      if (!isOverlap(beacon, curPoint)) {
        let beaconDistance = calculateDistance(beacon, curPoint);
        if (beaconDistance < delta) {
          nonBeaconCount++;
        }
      }
    }
    console.log(nonBeaconCount);
  } */

  let nonBeaconSet = new Set();
  const y = 10;
  for (const line of data) {
    let nonBeaconCount = 0;
    console.log(line);
    if (line.beacon.y == y) {
    }
    let minDistance = calculateDistance(line.sensor, { x: line.sensor.x, y });
    console.log(minDistance);
    if (minDistance <= line.delta) {
      nonBeaconCount += 1;
    }
    console.log(nonBeaconCount);
  }
}

part1();
