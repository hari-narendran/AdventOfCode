const { readFileSync } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

let lines = readFile('./12/sampleInput.txt');
// console.log("🚀 ~ file: part_1_v1.js:10 ~ lines", lines);

function getInput() {
  const res = {
    start: {},
    end: {},
  };
  res.map = lines.map((line, y) =>
    [...line].map((value, x) => {
      if (value == 'S') {
        res.start = { y, x };
        return 0;
      } else if (value == 'E') {
        res.end = { y, x };
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
  let visited = [];
  let queue = [];
  //let dist =0;
  visited.push(`${input.start.x}${input.start.y}`);
  queue.push([input.start.x,input.start.y,0]);

  while(queue.length) {
    for (let i = 0; i < input.map.length; i++) {
      for (let j = 0; j < input.map[i].length; j++) {
        //console.log(input.map[i][j]);
        //visited.push({ x: i, y: j });
        //visited.push(`${i}${j}`);
        const [r,c,d] = queue.shift();

        const adjacent = [
          [i + 1, j],
          [i - 1, j],
          [i, j + 1],
          [i, j - 1],
        ];
  
        for (let a = 0; a < adjacent.length; a++) {
          const adjX = adjacent[a][0];
          const adjY = adjacent[a][1];
          if (
            adjX < 0 ||
            adjY < 0 ||
            adjX >= adjacent.length ||
            adjY >= adjacent[a].length
          ) {
            continue;
          }
          console.log(`${adjX}${adjY}`);
          if (visited.find((v) => v == `${adjX}${adjY}`)) {
            console.log('visited');
            continue;
          }
          if (input.map[i[j]] - input.map[adjX][adjY] > 1) {
            console.log('High');
            continue;
          }
          if(adjX == input.end.x && adjY == input.end.y){
            console.log('End');
            return;
          }
  
          visited.push(`${i}${j}`);
          queue.push([adjX,adjY,d+1]);
        }
      }
    }
  }
  console.log(visited);
  console.log(queue);
}

part1();
