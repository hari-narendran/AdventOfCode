const { readFileSync } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split(/\r?\n/);
  const testArr = contents
    .split('\n\n')
    .map((pair) => pair.split('\n').map(JSON.parse));
  //console.log(testArr)
  return testArr;
}

let pairs = readFile('./13/sampleInput_.txt');
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

function compareArrays(arrA, arrB) {
  let isRightOrder = true;
  arrA.forEach((element,index) => {
    if(element>arrB[index] || index >= arrB.length){
      isRightOrder = false;
    }
  });
  return isRightOrder;
}

function comparePairs(pairA, pairB) {
  //console.log(pairA + ' vs ' + pairB);
  //console.log(pairA.length + ' vs ' + pairB.length);
  if (pairB.length == 0) {
    //console.log('Right empty');
    return false;
  }
  if (pairA.length == 0) {
    //console.log('Left empty');
    return true;
  }
  if (pairA.length == 1 && pairB.length == 1) {
    if (Array.isArray(pairA[0]) && Array.isArray(pairB[0])) {
      //console.log(pairA + ' vs ' + pairB);
      return compareArrays(pairA[0],pairB[0]);
    }
    if (!Array.isArray(pairA[0]) && !Array.isArray(pairB[0])) {
      //console.log(pairA + ' vs ' + pairB);
      return pairA[0] < pairB[0];
    }
  } else {
    pairA.forEach((pair,index) => {
      if(index < pairB.length){
        if (Array.isArray(pair) && Array.isArray(pairB[index])) {
          let compare =  comparePairs([pair],[pairB[index]]);
          return compare;
        }
      }
    });
  }

  /* if(Array.isArray(pairB[1])){
    console.log('Array ',pairB)
  } else {
    console.log('Int ',pairB)
  } */
}

pairs.forEach((pair) => {
  console.log(pair);
  //console.log(pair.length)
  let isRightOrder = comparePairs(pair[0], pair[1]);
  if (isRightOrder) {
    console.log('Right');
    console.log(pair[0], pair[1]);
  } else {
    console.log('Wrong');
    console.log(pair[0], pair[1]);
  }
});

/* let a1 = [[1,5]]
let a2 = [[1,4]]

let comp = compareArrays(a1,a2);
console.log("🚀 ~ file: part_1_v1.js:81 ~ comp", comp) */
