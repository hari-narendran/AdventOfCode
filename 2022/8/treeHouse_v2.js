//import { sqrt } from 'mathjs';
//const { readFileSync, promises: fsPromises } = require('fs');
import { readFileSync, promises } from 'fs';
import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}
//let forest = readFile('./forest.txt');
let forest = readFile('./8/sampleData.txt');
//console.log(forest);

let allTrees = [];
forest.forEach((row) => {
  allTrees.push(row.split(''));
});

//console.log(allTrees);

console.log(math.matrix(allTrees));
const treeMatrix = math.matrix(allTrees);
// .get(cloumnIndex, rowIndex)
//console.log(treeMatrix.get([0, 1]));
const matrixSize = treeMatrix.size();

let checkNeighbours = (index) => {
  let curTree = Number(treeMatrix.get(index));
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  let isTaller = false;

  //console.log(math.column(treeMatrix,y)._data)
  let curCol = math.column(treeMatrix,y)._data;
  let maxCol = math.max(curCol);
  //console.log(math.max(curCol))

  //console.log(math.row(treeMatrix,x)._data)
  let curRow = math.row(treeMatrix,x)._data;
  let maxRow = math.max(curRow);
  //console.log(math.max(curRow))

  isTaller = curTree > maxCol|| curTree > maxRow;
  //top
  /* for (let i = x - 1; i >= 0; i--) {
    if (treeMatrix.get(index) > treeMatrix.get([i, y])) {
      console.log(treeMatrix.get(index), treeMatrix.get([i,y]));
      isTaller = true;
    }
  } */
  return isTaller;
};

let isVisibleTrees = (index) => {
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  if (x > 0 && y > 0 && x < maxSize - 1 && y < maxSize - 1) {
    console.log(checkNeighbours(index));
    if(checkNeighbours(index)){
      console.log(index, treeMatrix.get(index))
    }
  }
};

let isVisibleTrees_ = (index) => {
  //console.log(treeMatrix.get(index));
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  if (x > 0 && y > 0 && x < maxSize - 1 && y < maxSize - 1) {
    let n = [x - 1, y];
    let w = [x, y - 1];
    let e = [x, y + 1];
    let s = [x + 1, y];
    //console.log('- ' + treeMatrix.get(s));
    if (
      treeMatrix.get(index) > treeMatrix.get(n) ||
      treeMatrix.get(index) > treeMatrix.get(w) ||
      treeMatrix.get(index) > treeMatrix.get(e) ||
      treeMatrix.get(index) > treeMatrix.get(s)
    ) {
      /* console.log(
        treeMatrix.get(index) + ' is taller than one of the neighbours'
      ); */
      return true;
    } else {
      return false;
    }
  }
  //console.log(treeMatrix.get(index));
  //console.log(math.add(index,2))
};

let totalVisibleTrees = 0;
totalVisibleTrees += matrixSize[0] * 4 - 4;
treeMatrix.forEach((tree, index) => {
  //console.log(tree, index);
  if (isVisibleTrees(index)) {
    totalVisibleTrees++;
  }
});

console.log(totalVisibleTrees);

/* console.log('get a sub matrix')
const h = math.diag(math.range(1, 4))
console.log(h) // [[1, 0, 0], [0, 2, 0], [0, 0, 3]]
console.log(h.subset(math.index([1, 2], [1, 2]))) // [[2, 0], [0, 3]]
const i = math.range(1, 6)
console.log(i) // [1, 2, 3, 4, 5]
console.log(i.subset(math.index(math.range(1, 4)))) // [2, 3, 4] */
