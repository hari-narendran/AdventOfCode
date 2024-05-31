const { readFileSync, promises: fsPromises } = require('fs');
const { it } = require('node:test');
const { getPriority } = require('os');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

let itemsInSack = readFile('./3/ruckSackItems.txt');
//let itemsInSack = readFile('./3/sampleData.txt');
console.log(itemsInSack);

// https://javascript.plainenglish.io/create-an-array-of-alphabet-characters-in-javascript-with-this-simple-trick-930033079dd3
const lowerCase = Array.from(Array(26)).map((e, i) => i + 97);
const lowerCaseItems = lowerCase.map((x) => String.fromCharCode(x));
const upperCase = Array.from(Array(26)).map((e, i) => i + 65);
const upperCaseItems = upperCase.map((x) => String.fromCharCode(x));
// console.log(lowerCaseItems);
// console.log(upperCaseItems);

let allItems = lowerCaseItems.concat(upperCaseItems);
console.log(allItems);

let getSharedItem = (item) => {
  console.log(item.slice(0, item.length / 2));
  console.log(item.slice(item.length / 2, item.length));
  let compAitem = item.slice(0, item.length / 2);
  let compBitem = item.slice(item.length / 2, item.length);

  let sharedItem = '';
  for (let i = 0; i < compAitem.length; i++) {
    if (compAitem.includes(compBitem[i])) {
      //console.log(compBitem[i]);
      sharedItem = compBitem[i];
    }
  }
  return sharedItem;
};

let getGroupedSharedItems = (groupedItem) => {
    console.log(groupedItem);
    let noOfItems = groupedItem.length-1;
    let sharedItems = [];
    for(let i=0;i<=noOfItems;i++){
      if(i != noOfItems){
        //console.log(commonCharacters(groupedItem[i],groupedItem[i+1]))
        sharedItems.push(commonCharacters(groupedItem[i],groupedItem[i+1]));
      } else {
        //console.log(commonCharacters(groupedItem[i],groupedItem[i-2]))
        sharedItems.push(commonCharacters(groupedItem[i],groupedItem[i-2]));
      }
    }
    return sharedItems;
};

const commonCharacters = function(string1, string2) {
  let duplicateCharacter = '';
  for (let i = 0; i < string1.length; i += 1) {
    if (duplicateCharacter.indexOf(string1[i]) === -1) {
      if (string2.indexOf(string1[i]) !== -1) {
        duplicateCharacter += string1[i];
      }
    }
  }
  return duplicateCharacter;
};

let getItemPriority = (item) => {
  return allItems.indexOf(item) + 1;
};

let totalPriority = 0;
// Part 1
/* itemsInSack.forEach((item, index) => {
  console.log('**-- Rucksack ' + (index + 1) + ' --**');
  let sharedItem = getSharedItem(item);
  console.log('* Shared item ' + sharedItem);
  let priority = getItemPriority(sharedItem);
  console.log('* Item Priority ' + priority);
  totalPriority += priority;
}); */

/* console.log('**== TOTAL PRIORITY ==**');
console.log(totalPriority); */


// Part 2
for (let i = 0; i < itemsInSack.length; i += 3) {
  let groupedItems = itemsInSack.slice(i, i + 3);
  //console.log(groupedItems);
  let groupedSharedItems = getGroupedSharedItems(groupedItems);
  console.log('groupedSharedItems')
  console.log(groupedSharedItems)
  let sharedItem = getGroupedSharedItems(groupedSharedItems)[0];
  console.log('sharedItem')
  console.log(sharedItem);
  totalPriority+=getItemPriority(sharedItem)
}

console.log('**== TOTAL PRIORITY ==**');
console.log(totalPriority);
