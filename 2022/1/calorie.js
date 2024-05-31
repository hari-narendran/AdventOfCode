console.log('December 1');
console.log("Calorie Counting - Day 1 - Advent of Code 2022 ");

const { readFileSync, promises: fsPromises } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

// read the file and convert to array
let calorieArray = readFile('./1/calorieData.txt');
//let calorieArray = readFile('./1/data.txt');
console.log("-- List of calories of food carried by Elf");
console.log(calorieArray);
// array that holds the total calories carries by each elf
let elfCalTotal = [];
// temp variable to hold total calories of elf on each iteration
let totCal = 0;

calorieArray.forEach((cal) => {
    if (cal) {
    totCal += Number(cal);
  } else {
    elfCalTotal.push(totCal);
    totCal = 0;
  }
});

console.log("-- List of total calories of food carried by each Elf");
console.log(elfCalTotal);

/* let maxCalories = Math.max.apply(null, elfCalTotal);
console.log("-- Most calories carried by an Elf");
console.log(maxCalories);

console.log("-- Elf that carries the most calories");
console.log(elfCalTotal.indexOf(maxCalories)+1); */

// sort the calories desc and reverse it and pick the top 3 calories
let sortedElfCalories = elfCalTotal.sort((a,b) => a-b).reverse().splice(0,3);
console.log(sortedElfCalories);

console.log("-- Most calories carried by an Elf");
console.log(sortedElfCalories[0]);

// add the top 3 calories
let topThreeTotalCal = sortedElfCalories.reduce( (partialSum, a) => partialSum + a, 0);
console.log("-- Total calories carried by top 3 Elves");
console.log(topThreeTotalCal);

