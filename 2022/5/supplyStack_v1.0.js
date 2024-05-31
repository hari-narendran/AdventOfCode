const exp = require('constants');
const { readFileSync, promises: fsPromises } = require('fs');
const { it } = require('node:test');
const { getPriority } = require('os');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.replace(/\n/g, ',').split(',');
  //const arr = contents.split(/\r?\n/).split(',');
  return arr;
}

let rearrangements = readFile('./5/arrangements.txt');
// let rearrangements = readFile('./5/sampleData.txt');
console.log(rearrangements);

//     [D]
// [N] [C]
// [Z] [M] [P]

// let one = ['Z', 'N'];
// let two = ['M', 'C', 'D'];
// let three = ['P'];

//let stacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];

let stacks = [
  ['N', 'S', 'D', 'C', 'V', 'Q', 'T'],
  ['M', 'F', 'V'],
  ['F', 'Q', 'W', 'D', 'P', 'N', 'H', 'M'],
  ['D', 'Q', 'R', 'T', 'F'],
  ['R', 'F', 'M', 'N', 'Q', 'H', 'V', 'B'],
  ['C', 'F', 'G', 'N', 'P', 'W', 'Q'],
  ['W', 'F', 'R', 'L', 'C', 'T'],
  ['T', 'Z', 'N', 'S'],
  ['M', 'S', 'D', 'J', 'R', 'Q', 'H', 'N'],
];

// stacks.forEach((stack, index) => {
//   console.log('--** STACKS **--');
//   console.log(stack);
// });

let moveStack = (noOfCrates, origin, dest) => {
  let removedCrates = [];
  for (let i = 0; i < noOfCrates; i++) {
    removedCrates.push(stacks[origin].pop(i));
  }
  //console.log(removedCrates);
  //stacks[dest].concat(removedCrates)
  stacks[dest] = [...stacks[dest], ...removedCrates.reverse()];
  //console.log(stacks[dest]);
};

rearrangements.forEach((line) => {
  //console.log(line.split(' '))
  const str = line.split(' ');
  const origin = str[3];
  const dest = str[5];
  const noOfCrates = str[1];
  console.log('-- Instruction --');
  console.log(noOfCrates, origin, dest);
  moveStack(noOfCrates, origin - 1, dest - 1);
});

let topOfStacks = '';
stacks.forEach((stack, index) => {
  console.log('--** STACK '+index+' **--');
  console.log(stack);
  const lastIndex = stack.length-1;
  topOfStacks+=stack[lastIndex];
});

console.log(topOfStacks);
