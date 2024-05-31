const { readFileSync } = require('fs');
const { get } = require('http');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

let lines = readFile('./14/sampleInput.txt');
console.log('🚀 ~ file: part_1_v1.js:10 ~ lines', lines);

function getInput() {
  let map = new Set();
  let maxY = 0;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('->').join(',').split(' ,');
    //console.log(line);

    //* Convert each line to {x:0, y:0} format
    let points = line.map((l) => {
      let x = Number(l.split(',')[0]);
      let y = Number(l.split(',')[1]);
      maxY = y > maxY ? y : maxY;
      return { x, y };
    });

    //* Followinng part is to draw line between points

    //* Add first point from the list and remove it from the list
    let curPoint = points.shift();
    while (points.length) {
      let nextPoint = points.shift();
      while (curPoint.x !== nextPoint.x || curPoint.y !== nextPoint.y) {
        map.add(`${curPoint.x},${curPoint.y}`);
        if (curPoint.x !== nextPoint.x) {
          const delta =
            (nextPoint.x - curPoint.x) / Math.abs(nextPoint.x - curPoint.x);
          curPoint.x += delta;
        } else {
          const delta =
            (nextPoint.y - curPoint.y) / Math.abs(nextPoint.y - curPoint.y);
          curPoint.y += delta;
        }
      }
      map.add(`${curPoint.x},${curPoint.y}`);
    }
  }
  //console.log('🚀 ~ file: part_1_v1.js:26 ~ parseInput ~ maxY', maxY);
  return { map, maxY };
}

const { rocks, depth } = getInput();
console.log(getInput());
//console.log(depth);
