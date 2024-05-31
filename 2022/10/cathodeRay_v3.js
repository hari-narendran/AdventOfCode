const { readFileSync, promises: fsPromises, cp } = require('fs');

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

//let instructions = readFile('./sampleData_2.txt');
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

class CRT {
  constructor(width = 40, height = 6) {
    this.width = width;
    this.height = height;
    this.curIndex = 0;
    this.pixels = new Array(height).fill(0).map((line) => {
      return new Array(width).fill(' ');
    });
  }
  runCycle(spritePosition) {
    //console.log(this.curIndex, spritePosition);
    //this.drawPixel(spritePosition);
    const x = this.curIndex % this.width;
    const y = Math.floor(this.curIndex / this.width);
    if(y>=this.height){
      return;
    }
    if (
      x >= spritePosition - 1 &&
      x <= spritePosition + 1
    ) {
      //console.log('In Between');
      this.pixels[y][x] = '#';
    } else {
      this.pixels[y][x] = '.';
    }
    /* if (Math.abs(x - spritePosition) < 2) {
      console.log('In Between');
      this.pixels[y][x] = '#';
    } */
    this.curIndex++;
  }

  drawPixel(spritePosition) {}

  displayImage() {
    let image = this.pixels.map((line) => line.join('')).join('\n');
    console.log(image);
  }
}

function part1() {
  let signalStrength = 0;
  let cpu = new CPU(instructions);
  for (let i = 0; i <= 220; i++) {
    cpu.runCycle();
    if (cpu.cycle % 40 === 20) {
      signalStrength += cpu.cycle * cpu.registers.x;
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
  //console.log(signalStrength);
  //console.log(cpu);
}

function part2() {
  let cpu = new CPU(instructions);
  let crt = new CRT();
  /* for (let i = 0; i <= 220; i++) {
    crt.runCycle(cpu.registers.x);
    cpu.runCycle();
  } */
  while (true) {
    crt.runCycle(cpu.registers.x);
    if (!cpu.runCycle()) {
      break;
    }
  }
  crt.displayImage();
}

//part1();
part2();
