const { readFileSync } = require('fs');
const path = require('path');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

//let lines = readFile('./12/sampleInput.txt');
let lines = readFile('./12/input.txt');
// console.log("🚀 ~ ~ lines", lines);

function getInput() {
  const res = {
    start: {},
    end: {},
  };
  res.map = lines.map((line, x) =>
    [...line].map((value, y) => {
      if (value == 'S') {
        res.start = { x, y };
        return 0;
      } else if (value == 'E') {
        res.end = { x, y };
        return 25;
      }
      return value.charCodeAt(0) - 'a'.charCodeAt(0);
    })
  );
  return res;
}

function part1() {
  const input = getInput();
  //console.log('🚀 ~ file: part_1_v1.js:19 ~ part1 ~ input', input);

  const paths = [];

  // This is to iterate the 2d array and find points that are 0 which in turn is a 
  for (let i = 0; i < input.map.length; i++) {
    for (let j = 0; j < input.map[i].length; j++) {

    // only find the shortest path if current point is 0 which in turn is a
      if (input.map[i][j] == 0) {
        let visited = [];
        let queue = [];

        input.start.x = i;
        input.start.y = j;

        // setting current point as start 
        // and current point is 0 which in turn is a
        visited.push(`${input.start.x}${input.start.y}`);
        queue.push([input.start.x, input.start.y, 0]);

        while (queue.length) {
          // this where it iterates through the queue
          const [r, c, d] = queue.shift();

          const next = [
            [r + 1, c],
            [r - 1, c],
            [r, c + 1],
            [r, c - 1],
          ];
          for (let i = 0; i < next.length; i++) {
            // set nextRow aand nextColumn
            const nr = next[i][0];
            const nc = next[i][1];

            // check if nexrRow or nextColumn is out of bounds
            // if true continue iteration of next array
            if (
              nr < 0 ||
              nc < 0 ||
              nr >= input.map.length ||
              nc >= input.map[0].length
            )
              continue;

            // check if current position is already visited
            // if true continue iteration of next array
            if (visited.find((x) => x === `${nr}:${nc}`)) continue;
            // check if distance between current position and end position
            // if true continue iteration of next array
            if (input.map[nr][nc] - input.map[r][c] > 1) continue;
            // check if current position is at end position
            if (nr == input.end.x && nc == input.end.y) {
              console.log('Shortest Path');
              console.log(d + 1);
              paths.push(d+1);
              continue;
            }

            visited.push(`${nr}:${nc}`);
            queue.push([nr, nc, d + 1]);
          }
          // console.log(visited);
          // console.log(queue);
        }
      } else {
        continue;
      }
    }
  }
  console.log(paths);
  console.log(paths.sort((a,b) => a - b)[0]);
}

part1();
