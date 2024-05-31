const { readFileSync, promises: fsPromises } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n').map((line) => {
    const input = line.split(' ');
    const res = {};
    res.op=input[0];
    if(res.op=='addx'){
        res.value=parseInt(input[1]);
    }
    return res;
  });
  return arr;
}

let instructions = readFile('./sampleData_1.txt');
console.log(instructions);

class RegisterX {
  constructor() {
    this.x = 1;
    this.cycle = 0;
  }
  getX() {
    return this.x;
  }
  getCycle() {
    return this.cycle;
  }
  addx(value) {
    this.cycle += 2;
    this.x += value;
  }
  noop() {
    this.cycle += 1;
  }
}

function part1() {
  let registerX = new RegisterX();

  /* for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i].split(' ');
    if (instruction.length == 1) {
      registerX.noop();
    } else {
      registerX.addx(Number(instruction[1]));
      //console.log(instruction)
    }
    if (registerX.getCycle() == 20) {
      console.log('********** 20 **************');
      console.log(registerX.getX());
    }
    console.log(registerX.getCycle());
  } */

  console.log(registerX);
}

part1();
