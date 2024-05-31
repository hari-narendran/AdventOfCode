const { readFileSync } = require('fs');

const lines = readFileSync('./15/input.txt', { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

const regexp =
  /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Return a new object to avoid side effects between part 1 and 2
function getInput() {
  return lines.map((line) => {
    const match = line.match(regexp).groups;
    const result = {
      sensor: {
        x: parseInt(match.sensorX),
        y: parseInt(match.sensorY),
      },
      beacon: {
        x: parseInt(match.beaconX),
        y: parseInt(match.beaconY),
      },
    };

    result.dist = distance(result.sensor, result.beacon);

    return result;
  });
}

function part1() {
  const input = getInput();
  //console.log("🚀 ~ file: test.js:38 ~ part1 ~ input", input)
  //const y = input.length === 14 ? 10 : 2000000;
  const y = 2000000;
  let cannotContainBeacon = new Set();
  let beaconsOnLine = new Set();
  for (const { sensor, beacon, dist } of input) {
    if (beacon.y === y) {
      beaconsOnLine.add(beacon.x);
    }
    const minDistance = distance(sensor, { x: sensor.x, y });
    if (minDistance <= dist) {
      const distanceAroundSensorX = dist - minDistance;
      for (
        let x = sensor.x - distanceAroundSensorX;
        x <= sensor.x + distanceAroundSensorX;
        x++
      ) {
        cannotContainBeacon.add(x);
      }
    }
  }
  console.log(cannotContainBeacon.size - beaconsOnLine.size);
}

part1();