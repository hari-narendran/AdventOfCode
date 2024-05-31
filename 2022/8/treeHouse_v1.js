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
let forest = readFile('./sampleData.txt');
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

let isVisibleTrees = (index) => {
  console.log(treeMatrix.get(index));
  let x = index[0];
  let y = index[1];
  let maxSize = matrixSize[0];
  if (x > 0 && y > 0 && x < maxSize-1 && y < maxSize-1) {
    let n = [x - 1, y];
    let w = [x, y - 1];
    let e = [x, y + 1];
    let s = [x + 1, y];
    console.log('- ' + treeMatrix.get(s));
    if(treeMatrix.get(index) > treeMatrix.get(n)||treeMatrix.get(index) > treeMatrix.get(w) || treeMatrix.get(index) > treeMatrix.get(e)||treeMatrix.get(index) > treeMatrix.get(s)){
        console.log(treeMatrix.get(index)+' is taller than one of the neighbours')
        return true;
    } else {
        return false;
    }
    
  }
  //console.log(treeMatrix.get(index));
  //console.log(math.add(index,2))
};

// let getBoundaries = (matrix) => {
//     let boundaries = [];
//   matrix.forEach((ele, index) => {
//     let x = index[0];
//     let y = index[1];
//   });
//   return boundaries;
// };

// console.log(math.row(treeMatrix,0))
// const boundaries = getBoundaries(treeMatrix);
// console.log(boundaries);

let totalVisibleTrees = 0;
totalVisibleTrees += (matrixSize[0]*4)-4;
treeMatrix.forEach((tree, index) => {
  //console.log(tree, index);
  if(isVisibleTrees(index)){
    totalVisibleTrees ++;
  }
});

console.log(totalVisibleTrees);
