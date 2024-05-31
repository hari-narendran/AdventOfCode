import { readFileSync, promises } from 'fs';
import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}
let forest = readFile('./forest.txt');
//let forest = readFile('./sampleData.txt');

// * split each row into to an array
let allTrees = [];
forest.forEach((row) => {
  allTrees.push(row.split(''));
});

console.log(math.matrix(allTrees));
// * convert array into to matrix ( math.js )
const treeMatrix = math.matrix(allTrees);
const matrixSize = treeMatrix.size();

let checkNeighbours = (index) => {
  let curTree = Number(treeMatrix.get(index));
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  let isVisible = false;

  //* Iterate through the items/trees on of current item/tree
  let topTrees = [];
  for (let i = x - 1; i >= 0; i--) {
    topTrees.push(Number(treeMatrix.get([i, y])));
  }
  // console.log(curTree);
  // console.log(topTrees);

  /* if (curTree > math.max(topTrees)) {
    // console.log('TOP');
    isVisible = true;
  } */

  let bottomTrees = [];
  for (let i = x + 1; i < maxSize; i++) {
    bottomTrees.push(Number(treeMatrix.get([i, y])));
  }
  // console.log(curTree);
  // console.log(bottomTrees);

  /* if (curTree > math.max(bottomTrees)) {
    // console.log('Bottom');
    isVisible = true;
  } */

  let leftTrees = [];
  for (let j = y - 1; j >= 0; j--) {
    leftTrees.push(Number(treeMatrix.get([x, j])));
  }
  // console.log(curTree);
  // console.log(leftTrees);

  /* if (curTree > math.max(leftTrees)) {
    // console.log('LEFT');
    isVisible = true;
  } */

  let rightTrees = [];
  for (let j = y + 1; j < maxSize; j++) {
    rightTrees.push(Number(treeMatrix.get([x, j])));
  }
  // console.log(curTree);
  // console.log(rightTrees);

  /* if (curTree > math.max(rightTrees)) {
    // console.log('RIGHT');
    isVisible = true;
  } */

  isVisible =
    curTree > math.max(topTrees) ||
    curTree > math.max(bottomTrees) ||
    curTree > math.max(leftTrees) ||
    curTree > math.max(rightTrees);

  return isVisible;
};

//* Calculate the number of items/trees on the boundary
let totalVisibleTrees = 0;
totalVisibleTrees += matrixSize[0] * 4 - 4;

treeMatrix.forEach((tree, index) => {
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  //* This is check is to call checkNeighbours() only on the interior items/trees
  if (x > 0 && y > 0 && x < maxSize - 1 && y < maxSize - 1) {
    if (checkNeighbours(index)) {
      totalVisibleTrees++;
      console.log(index, treeMatrix.get(index));
      console.log('=============');
    }
  }
});

console.log(totalVisibleTrees);
