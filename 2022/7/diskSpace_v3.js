const { dir } = require('console');
const exp = require('constants');
const { readFileSync, promises: fsPromises } = require('fs');
const { default: nodeTest, it } = require('node:test');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

//let tOutput = readFile('./terminalOutput.txt');
let tOutput = readFile('./sampleData.txt');
//console.log(tOutput);

class Directory {
  constructor(dirName) {
    this.name = dirName;
    this.parent = '';
    this.subDirs = [];
    this.totalSize = 0;
  }
  setParent(parentDirName) {
    this.parent = parentDirName;
    console.log(this.parent);
  }
  setSubDirs(subDirs) {
    this.subDirs = subDirs;
  }
  setTotalSize() {
    let sum = this.subDirs.reduce((partialSum, a) => partialSum + a, 0);
    console.log(sum);
    this.totalSize = sum ;
  }
  addSubDirSize(subDirSize){
    this.totalSize += subDirSize;
    console.log(this.totalSize);
  }
  getTotalSize(){
    return this.totalSize;
  }
}

class DirectoryTree {
  constructor() {
    this.dirTree = [];
  }
  addDirectory(dirName) {
    this.dirTree.push(dirName);
  }
  getDirectories() {
    return this.dirTree;
  }
  dispplayDirTree() {
    this.dirTree.forEach((dir) => {
      console.log(dir);
    });
  }
}

directoryTree = new DirectoryTree();
let currentPath = [];
let subDirs = [];

let changeDir = (arg) => {
  switch (arg) {
    case '/':
      currentPath = [''];
      break;
    case '..':
      currentPath.pop();
      break;
    default:
      subDirs = [];
      let dir = new Directory(arg);
      dir.setParent(currentPath.slice(-1)[0]);
      dir.setSubDirs(subDirs);
      currentPath.push(arg);
      //console.log('path - ' + currentPath);
      directoryTree.addDirectory(dir);
      break;
  }
};

let addFiles = (files) => {
  //console.log(files);
  if (files !== 'dir') {
    subDirs.push(Number(files));
  }
};

let addSizeToParent = (parent, subDirSize) => {
  directoryTree.getDirectories().forEach((dir) => {
    if(dir.name==parent){
      console.log('parent is '+dir.name)
     //dir.totalSize += subDirSize;
     dir.addSubDirSize(subDirSize);
      console.log(dir.totalSize)
    }
  });
}

let updateDirSize = (dirTree) => {
  dirTree.forEach((dir) => {
    let subDirSize = 0;
    dir.setTotalSize();
    if(dir.parent){
      subDirSize = dir.totalSize;
      addSizeToParent(dir.parent,subDirSize);
    }
  });
};

let atMostTotal = (dirTree,atmost) => {
  let total = 0;
  dirTree.forEach((dir, index) => {
    if(dir.totalSize < atmost){
      total += dir.totalSize;
      console.log('index '+index)
    }
  });
  return total;
}


for (let i = 0; i < tOutput.length; i++) {
  let cmd = tOutput[i].split(' ');
  if (cmd[0] == '$') {
    if (cmd[1] == 'cd') {
      let arg = cmd[2];
      //console.log('_ ' + tOutput[i]);
      changeDir(arg);
    }
  } else {
    //console.log('+ ' + tOutput[i]);
    addFiles(cmd[0]);
  }
}

updateDirSize(directoryTree.getDirectories());

directoryTree.dispplayDirTree();

let total = atMostTotal(directoryTree.getDirectories(),100000)
console.log('TOTAL')
console.log(total);
