const { readFileSync, promises: fsPromises } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n').map((line) => {
    const input = line.split(' ');
    const res = {};
    res.op = input[0];
    if (res.op == 'addx') {
      res.value = parseInt(input[1]);
    }
    return res;
  });
  return arr;
}

// let instructions = readFile('./sampleData_2.txt');
let instructions = readFile('./instructions.txt');
//console.log(instructions);

class CPU {
  constructor(program) {
    this.program = program;
    this.currentLine = 0;
    this.cycle = 1;
    this.wait = 0;
    this.registers = {
      x: 1,
    };
  }
  runCycle() {
    if (this.currentLine >= this.program.length) {
      return false;
    }
    const line = this.program[this.currentLine];
    //console.log('🚀 ~ file: cathodeRay_v2.js:51 ~ CPU ~ runCycle ~ line', line);
    //this.currentLine++;
    this.cycle++;
    switch (line.op) {
      case 'noop':
        //this.cycle++;
        this.currentLine++;
        break;
      case 'addx':
        if (this.wait == 0) {
          //this.cycle++;
          this.wait = 1;
        } else {
          this.wait--;
          if (this.wait == 0) {
            //this.cycle++;
            this.registers.x += line.value;
            this.currentLine++;
          }
        }
        break;
      default:
        break;
    }
    return true;
  }
}

function part1() {
  let signalStrength = 0;
  let cpu = new CPU(instructions);
  for (let i = 0; i <= 220; i++) {
    cpu.runCycle();
    if (cpu.cycle % 40 === 20) {
      signalStrength+= cpu.cycle * cpu.registers.x;
    }
    //* All of the below conditions is included in above condition
    /* if(cpu.cycle==20){
      console.log(cpu);
      signalStrength+= 20*cpu.registers.x;
      console.log(20*cpu.registers.x)
    }
    else if(cpu.cycle==60){
      console.log(cpu);
      signalStrength+= 60*cpu.registers.x;
      console.log(60*cpu.registers.x)
    }
    else if(cpu.cycle==100){
      console.log(cpu);
      signalStrength+= 100*cpu.registers.x;
      console.log(100*cpu.registers.x)
    }
    else if(cpu.cycle==140){
      console.log(cpu);
      signalStrength+= 140*cpu.registers.x;
      console.log(140*cpu.registers.x)
    }
    else if(cpu.cycle==180){
      console.log(cpu);
      signalStrength+= 180*cpu.registers.x;
      console.log(180*cpu.registers.x)
    }
    else if(cpu.cycle==219){
      console.log(cpu);
      signalStrength+= 220*cpu.registers.x;
      console.log(220*cpu.registers.x)
    } */
  }
  console.log(signalStrength);
  //console.log(cpu);
}

// This also works
/* function part11(){
  const cpu = new CPU(instructions);
  console.log("🚀 ~ file: cathodeRay_v2.js:141 ~ part11 ~ instructions", instructions.length)
  let sum = 0;
  while (true) {
    // Run the program until the end
    if (!cpu.runCycle()) {
      break;
    }
    if (cpu.cycle % 40 === 20) {
      console.log(cpu);
      sum += cpu.cycle * cpu.registers.x;
    }
  }
  console.log(sum);
} */

part1();
