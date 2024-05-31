const exp = require('constants');
const { readFileSync, promises: fsPromises } = require('fs');
const { it } = require('node:test');
const { getPriority } = require('os');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.replace(/\n/g, ',').split(',');
  //const arr = contents.split(/\r?\n/).split(',');
  return arr;
}

let sectionAssignments = readFile('./4/sectionAssignments.txt');
//let sectionAssignments = readFile('./4/testData.txt');
//console.log(sectionAssignments);

let getSectionRange = (sectionRange) => {
  console.log(sectionRange);
  let sections = [];
  let sectionString = '';
  let min = Number(sectionRange[0]);
  let max = Number(sectionRange[1]);
  for (let i = min; i <= max; i++) {
    sectionString += i.toString();
    sections.push(i.toString());
  }
  //console.log(sectionString)
  return sectionString;
};

let expandedSections = [];
sectionAssignments.forEach((sectionRange, index) => {
  //console.log('**-- Pair ' + (index + 1) + ' --**');
  let sections = getSectionRange(sectionRange.split('-'));
  //console.log(sections);
  expandedSections.push(sections);
});
//console.log(expandedSections);


let checkSectionOverLap = (pairAsections, pairBsections) => {
  let isOverLapSection = false;
  console.log(pairAsections);
  console.log(pairBsections);
  if (
    pairAsections.includes(pairBsections) ||
    pairBsections.includes(pairAsections)
  ) {
    console.log('Overlap')
    isOverLapSection = true;
  }
  return isOverLapSection;
};

let overlappedPairs = 0;
for (let i = 0; i < expandedSections.length; i += 2) {
  console.log('**-- Pair ' + (i + 1) + ' --**');
  let isOverLapSection = checkSectionOverLap(
    expandedSections[i],
    expandedSections[i + 1]
  );
  //console.log(isOverLapSection);
  if (isOverLapSection) overlappedPairs += 1;
}

console.log('Overlapped assigned Pairs = ' + overlappedPairs);
