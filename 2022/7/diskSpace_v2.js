const exp = require('constants');
const { readFileSync, promises: fsPromises } = require('fs');
const { default: nodeTest, it } = require('node:test');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

//let rearrangements = readFile('./7/arrangements.txt');
let tOutput = readFile('./7/sampleData.txt');
//console.log(tOutput);

class NodeTree {
  constructor() {
    this.view = {};
    this.pwd = [];
    this.path = {};
  }

  add(item) {
    console.log('//' + item);
    if (item[0] == 'dir') {
      this.view[item[1]] = [];
      console.log('PWD : ' + this.pwd);
    } else {
      if (this.pwd.length) {
        let lastItem = this.pwd[this.pwd.length - 1];
        console.log(this.view[lastItem]);
        this.view[lastItem]?.push(item[0]);
      }
    }
  }

  cd(dirName) {
    switch (dirName) {
      case '/':
        console.log('Go Back Home');
        this.pwd = [''];
        break;
      case '..':
        if (nodeTree.pwd.length) {
          this.pwd.pop();
        }
        console.log('Go Back one step');
        break;
      default:
        console.log('Go to ' + dirName);
        console.log(this.path);
        this.pwd.push(dirName);
        console.log(Object.keys(this.path))
        if (Object.keys(this.path).includes(dirName)) {
          console.log('Includes');
          let currentPath = this.path[dirName];
          //this.path[dirName] = currentPath.concat;
          // this.path[dirName] = dirName + '%'
        } else {
          this.path[dirName] = [];
          this.path[dirName] = this.pwd;
        }
        console.log(this.path);
        break;
    }
  }
}

nodeTree = new NodeTree();

for (let i = 0; i < tOutput.length; i++) {
  let cmd = tOutput[i].split(' ');
  //console.log(cmd);
  if (cmd[0] == '$') {
    //console.log(tOutput[i]);
    if (cmd[1] == 'cd') {
      console.log('$$' + tOutput[i]);
      nodeTree.cd(cmd[2]);
    }
    console.log('**');
    console.log(nodeTree.pwd);
  } else {
    nodeTree.add(cmd);
  }
}

console.log('directories -> ' + nodeTree.pwd);
console.log(nodeTree.view);
console.log(nodeTree.path);
