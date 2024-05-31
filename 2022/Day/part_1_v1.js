const { readFileSync } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

let lines = readFile('./sampleInput.txt');
console.log("🚀 ~ file: part_1_v1.js:10 ~ lines", lines);
