const { readFileSync, promises: fsPromises, cp } = require('fs');
const { it } = require('node:test');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n');
  return arr;
}

let lines = readFile('./notes1_v1.txt');
//let lines = readFile('./input.txt');
//console.log(lines);

class Monkey {
  constructor(monkeyData) {
    this.id = monkeyData.id;
    this.startItems = monkeyData.startItems.map((item) =>
      Number(item.trim(''))
    );
    this.operation = {
      op: monkeyData.operation[0],
      value: monkeyData.operation.split(' ')[1],
    };
    this.divisibleBy = monkeyData.divisibleBy;
    this.trueValue = monkeyData.trueTest;
    this.falseValue = monkeyData.falseTest;
    this.worryLevel = 0;
  }
  calculateWorryLevel(operation, item) {
    if (operation.value == 'old') {
      operation.value = this.worryLevel;
    } else {
      operation.value = item;
    }
    if (operation.op == '+') {
      this.worryLevel = item + operation.value;
    } else if (operation.op == '*') {
      this.worryLevel = item * operation.value;
    }
    this.worryLevel = Math.floor(this.worryLevel / 3);
  }
  testWorryLevel() {
    /* if (this.worryLevel % this.divisibleBy == 0) {
      //console.log('divisible by ' + this.divisibleBy);
      return true;
    }else {
        return false;
      } */
    return this.worryLevel % this.divisibleBy == 0;
  }
  inspectItem() {
    //this.worryLevel = this.startItems[0];
    this.startItems.forEach((item) => {
      this.worryLevel = item;
      this.calculateWorryLevel(this.operation, item);
      if (this.testWorryLevel()) {
        console.log('throw to monkey ' + this.trueValue);
      } else {
        console.log('throw to monkey ' + this.falseValue);
      }
    });
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
    _monkey['id']=key;
    const monkey = new Monkey(_monkey);
    monkeys.push(monkey);
    notes.push(_monkey);
    key++;
  }
});

//console.log(notes);
//console.log(monkeys);

/* for(let i =0; i<monkeys.length;i++){
    monkeys[i].inspectItem();
} */

monkeys.forEach((monkey) => {
  monkey.inspectItem();
});
console.log(monkeys);
