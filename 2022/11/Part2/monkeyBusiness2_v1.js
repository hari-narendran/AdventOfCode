const { readFileSync, promises: fsPromises, cp } = require('fs');
const { it } = require('node:test');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

//let lines = readFile('./11/notes1_v1.txt');
//let lines = readFile('../notes1_v1.txt');
let lines = readFile('../input.txt');
//console.log(lines);

class Monkey {
  constructor(monkeyData) {
    this.id = monkeyData.id;
    this.startItems = monkeyData.startItems.map((item) =>
      Number(item.trim(''))
    );
    this.endItems = [...this.startItems];
    this.operation = {
      op: monkeyData.operation[0],
      value: monkeyData.operation.split(' ')[1],
    };
    this.divisibleBy = monkeyData.divisibleBy;
    this.trueValue = monkeyData.trueTest;
    this.falseValue = monkeyData.falseTest;
    this.worryLevel = 0;
    this.inspectionCount = 0;
  }
  calculateWorryLevel(operation, item) {
    /* if (operation.value == 'old') {
      operation.value = this.worryLevel;
    } else {
      operation.value = Number(operation.value);
    } */
    if (operation.value !== 'old') {
      operation.value = Number(operation.value);
    }
    if (operation.op == '+') {
      if (operation.value == 'old') {
        this.worryLevel = item + item;
      } else {
        this.worryLevel = item + operation.value;
      }
    } else if (operation.op == '*') {
      if (operation.value == 'old') {
        this.worryLevel = item * item;
      } else {
        this.worryLevel = item * operation.value;
      }
    }
    /* let boredLevel = Math.floor(this.worryLevel / 3);
    this.worryLevel = boredLevel; */
    let managedLevel = this.worryLevel % divisor;
    this.worryLevel = managedLevel;
  }
  testWorryLevel() {
    return this.worryLevel % this.divisibleBy == 0;
  }
  inspectItem(item) {
    this.worryLevel = item;
    this.calculateWorryLevel(this.operation, item);
    if (this.testWorryLevel()) {
      //console.log('throw to monkey ' + this.trueValue);
      return true;
    } else {
      //console.log('throw to monkey ' + this.falseValue);
      return false;
    }
    console.log(this.worryLevel);
  }
}

let notes = [];
let key = 0;
let monkeys = [];
lines.forEach((line, index) => {
  let arr = [];
  //let _monkey = { id: index };
  let _monkey = {};
  if (line.startsWith('Monkey')) {
    for (let i = index + 1; i < index + 6; i++) {
      arr.push(lines[i].trim(' '));
    }
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].startsWith('Starting items')) {
        arr[j] = arr[j].split(':').slice(1);
        _monkey['startItems'] = arr[j][0].split(',');
      } else if (arr[j].startsWith('Operation')) {
        arr[j] = arr[j].split('old ').slice(1)[0];
        _monkey['operation'] = arr[j].toString();
      } else if (arr[j].startsWith('Test')) {
        arr[j] = arr[j].split('by ').slice(1)[0];
        _monkey['divisibleBy'] = Number(arr[j]);
      } else if (arr[j].startsWith('If true')) {
        arr[j] = arr[j].split('monkey ').slice(1)[0];
        _monkey['trueTest'] = Number(arr[j]);
      } else if (arr[j].startsWith('If false')) {
        arr[j] = arr[j].split('monkey ').slice(1)[0];
        _monkey['falseTest'] = Number(arr[j]);
      }
    }
    _monkey['id'] = key;
    const monkey = new Monkey(_monkey);
    monkeys.push(monkey);
    notes.push(_monkey);
    key++;
  }
});

function throwToMonkey(monkeyA, monkeyId) {
  //console.log('from ' + monkeyA.worryLevel + ' to ' + monkeyId);
  let item = monkeyA.startItems[0];
  //monkeyA.startItems = monkeyA.startItems.splice(1);
  monkeys.forEach((monkey) => {
    if (monkey.id == monkeyId) {
      monkey.startItems.push(monkeyA.worryLevel);
      monkey.endItems.push(monkeyA.worryLevel);
      monkeyA.endItems.shift();
    }
  });
  //monkeyA.startItems = monkeyA.startItems.splice(1);
}

//* This is the key to Part 2. THis is how we can manage the worry level
const divisor = monkeys.reduce((d, monkey) => d * monkey.divisibleBy, 1);

for (let round = 1; round <= 10000; round++) {
  //console.log('******************** ROUND ' + round + ' ********************');
  monkeys.forEach((monkey) => {
    // console.log(monkey);
    if (monkey.startItems) {
      monkey.startItems.forEach((item) => {
        // console.log(item);
        monkey.inspectionCount++;
        if (monkey.inspectItem(item)) {
          throwToMonkey(monkey, monkey.trueValue);
        } else {
          throwToMonkey(monkey, monkey.falseValue);
        }
      });
    } else return;
  });
  monkeys.forEach((monkey) => {
    //console.log(monkey.endItems);
    monkey.startItems = [...monkey.endItems];
    if(round==20){
      console.log(monkey.inspectionCount);
    }
    if(round==1000){
      console.log(monkey.inspectionCount);
    }
    if(round==2000){
      console.log(monkey.inspectionCount);
    }
  });
}

function calculateMonkeyBusiness(monkeys) {
  const inspectionCounts = monkeys.map((monkey) => monkey.inspectionCount);
  const topTwo = inspectionCounts.sort((a, b) => b - a).slice(0, 2);
  console.log(topTwo);
  return topTwo[0] * topTwo[1];
}

//console.log(monkeys);

let monkeyBusiness = calculateMonkeyBusiness(monkeys);
console.log(
  '🚀 ~ file: monkeyBusiness1_v3.js:165 ~ monkeyBusiness',
  monkeyBusiness
);
