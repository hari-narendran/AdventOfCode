const { readFileSync } = require('fs');
const { type } = require('os');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split(/\r?\n/);
  const testArr = contents
    .split('\n\n')
    .map((pair) => pair.split('\n').map(JSON.parse));
  //console.log(testArr)
  return testArr;
}

//let pairs = readFile('./13/sampleInput.txt');
let pairs = readFile('./13/input.txt');
//console.log("🚀 ~ file: part_1_v1.js:10 ~ lines", lines);

function parsedInput() {
  const pairs = [];
  for (let i = 0; i < lines.length; i += 3) {
    let pair = {};
    pair.left = lines[i].split(',');
    pair.right = lines[i + 1].split(',');
    pairs.push(pair);
  }
  return pairs;
}

console.log(pairs);

function comparePairs(pairA, pairB) {
  while (pairA.length > 0 && pairB.length > 0) {
    let left = pairA.shift();
    let right = pairB.shift();
    let leftIsNum = typeof left == 'number';
    let rightIsNum = typeof right == 'number';

    if (leftIsNum && rightIsNum) {
      if (left < right) {
        return 1;
      } else if (left > right) {
        return -1;
      }
    } else if (!leftIsNum && !rightIsNum) {
      let subCompare = comparePairs(left, right);
      if (subCompare != 0) {
        return subCompare;
      }
    } else if (leftIsNum && !rightIsNum) {
      let subCompare = comparePairs([left], right);
      if (subCompare != 0) {
        return subCompare;
      }
    } else if (!leftIsNum && rightIsNum) {
      let subCompare = comparePairs(left, [right]);
      if (subCompare != 0) {
        return subCompare;
      }
    }
  }
  if (pairA.length < pairB.length) {
    return 1;
  } else if (pairA.length > pairB.length) {
    return -1;
  } else return 0;
}

let rightIndices = [];
let dividerPackets = [[2]];
let smallerThanTwo = 1;
let smallerThanSix = 2;
pairs.forEach((pair, index) => {
  //console.log(pair);
  //console.log(pair.length)
  //let isRightOrder = comparePairs(pair[0], pair[1]);

  /* let pairARightOrder = comparePairs(pair[0], [[2]]);
  if (pairARightOrder > 0) smallerThanTwo += 1;
  let pairBRightOrder = comparePairs(pair[1], [[2]]);
  if (pairBRightOrder > 0) smallerThanTwo += 1; */

  pairARightOrder = comparePairs(pair[0], [[6]]);
  if (pairARightOrder > 0) smallerThanSix += 1;
  pairBRightOrder = comparePairs(pair[1], [[6]]);
  if (pairBRightOrder > 0) smallerThanSix += 1;

  //console.log({ pairARightOrder, pairBRightOrder });

  /* if (isRightOrder > 0) {
    console.log('Right');
    console.log(pair[0], pair[1]);
    console.log(index+1)
    rightIndices.push(index+1);
  } else if (isRightOrder < 0){
    console.log('Wrong');
    console.log(pair[0], pair[1]);
  } */
});

let sumOfIndices = rightIndices.reduce((a, b) => a + b, 0);

//console.log(rightIndices)
//console.log(sumOfIndices)

console.log(smallerThanTwo);
console.log(smallerThanSix);
