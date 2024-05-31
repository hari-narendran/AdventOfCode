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

  let topTrees = [];
  for (let i = x - 1; i >= 0; i--) {
    topTrees.push(Number(treeMatrix.get([i, y])));
  }

  let bottomTrees = [];
  for (let i = x + 1; i < maxSize; i++) {
    bottomTrees.push(Number(treeMatrix.get([i, y])));
  }

  let leftTrees = [];
  for (let j = y - 1; j >= 0; j--) {
    leftTrees.push(Number(treeMatrix.get([x, j])));
  }

  let rightTrees = [];
  for (let j = y + 1; j < maxSize; j++) {
    rightTrees.push(Number(treeMatrix.get([x, j])));
  }

  //* If current tree is taller than any of the trees on Top, Bottom, Left, Right then Tree is Visible
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

let scenicScores = [];

let getScenicSCore = (index) => {
  let curTree = Number(treeMatrix.get(index));
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  let scenicScore = 0;

  //* For Top, Bottom, Left, Right Trees
  // keep adding viewing distance untill  its the edge or 
  // if you encounter same height or taller tree

  let topViewDistance = 0;
  for (let i = x - 1; i >= 0; i--) {
    let topTree = Number(treeMatrix.get([i, y]));
    if (curTree > topTree) {
      topViewDistance++;
    } else {
      topViewDistance++;
      break;
    }
  }

  let bottomViewDistance = 0;
  for (let i = x + 1; i < maxSize; i++) {
    let bottomTree = Number(treeMatrix.get([i, y]));
    if (curTree > bottomTree) {
      bottomViewDistance++;
    } else {
      bottomViewDistance++;
      break;
    }
  }

  let leftViewDistance = 0;
  for (let j = y - 1; j >= 0; j--) {
    let leftTree = Number(treeMatrix.get([x, j]));
    if (curTree > leftTree) {
      leftViewDistance++;
    } else {
      leftViewDistance++;
      break;
    }
  }

  let rightViewDistance = 0;
  for (let j = y + 1; j < maxSize; j++) {
    let rightTree = Number(treeMatrix.get([x, j]));
    if (curTree > rightTree) {
      rightViewDistance++;
    } else {
      rightViewDistance++;
      break;
    }
  }

  scenicScore =
    topViewDistance * bottomViewDistance * leftViewDistance * rightViewDistance;

  return scenicScore;
};

treeMatrix.forEach((tree, index) => {
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  //* Part 1
  //* This is check is to call checkNeighbours() only on the interior items/trees
  /* if (x > 0 && y > 0 && x < maxSize - 1 && y < maxSize - 1) {
    //* If current tree is visible in any direction add it to the total
    if (checkNeighbours(index)) {
      totalVisibleTrees++;
      console.log(index, treeMatrix.get(index));
      console.log('=============');
    }
  } */

  //* Part 2
  if (x > 0 && y > 0 && x < maxSize - 1 && y < maxSize - 1) {
    scenicScores.push(getScenicSCore(index));
  }
});

//console.log(totalVisibleTrees);

console.log(scenicScores);
console.log(math.max(scenicScores));
