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

//let sectionAssignments = readFile('./4/sectionAssignments.txt');
let sectionAssignments = readFile('./4/sampleData.txt');
//console.log(sectionAssignments);

let getSectionRange = (sectionA, sectionB) => {
  //console.log(sectionA);
  //console.log(sectionB);
  startA = Number(sectionA[0]);
  startB = Number(sectionB[0]);
  endA = Number(sectionA[1]);
  endB = Number(sectionB[1]);
  // part 1
  /* return (
    (startA <= startB && endA >= endB) || (startA >= startB && endA <= endB)
  );
 */
  //part 2
  return (
    //B completely overlaps A
    (startA <= startB && endA >= endB) ||
    //A completely overlaps B
    (startA >= startB && endA <= endB) ||
    (startA <= endB && startB <= endA)
  );
};

let overlappedPairs = 0;
for (let i = 0; i < sectionAssignments.length; i += 2) {
  console.log('**-- Pair ' + (i + 1) + ' --**');
  console.log(sectionAssignments[i], sectionAssignments[i+1]);
  let isOverLapSection = getSectionRange(
    sectionAssignments[i].split('-'),
    sectionAssignments[i + 1].split('-')
  );
  console.log(isOverLapSection);
  if (isOverLapSection) overlappedPairs++;
}

console.log(overlappedPairs);
