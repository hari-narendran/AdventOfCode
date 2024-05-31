const { readFileSync, promises: fsPromises } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

let strategyGuide = readFile('./2/strategyData.txt');
//let strategyGuide = readFile('./2/testData.txt');
console.log(strategyGuide);

let calculateScore = (roundPicks) => {
  //console.log(roundPicks);
  let opp_shape = getShape(roundPicks[0]);

  // This is for Part 1 strategy
   //let player_shape = getShape(roundPicks[1]);

  // This is for Part 2 strategy
  let player_shape = getNewShape(roundPicks[0], roundPicks[1]);

  let opp_shapeValue = getShapeValue(opp_shape);
  console.log(opp_shape);
  console.log(opp_shapeValue);

  let player_shapeValue = getShapeValue(player_shape);
  console.log('*' + player_shape);
  console.log(player_shapeValue);

  if (player_shape == opp_shape) {
    return 3 + player_shapeValue;
  } else if (
    (player_shape == 'ROCK' && opp_shape == 'SCISSORS') ||
    (player_shape == 'SCISSORS' && opp_shape == 'PAPER') ||
    (player_shape == 'PAPER' && opp_shape == 'ROCK')
  ) {
    return 6 + player_shapeValue;
  } else if (
    (player_shape == 'SCISSORS' && opp_shape == 'ROCK') ||
    (player_shape == 'PAPER' && opp_shape == 'SCISSORS') ||
    (player_shape == 'ROCK' && opp_shape == 'PAPER')
  ) {
    return 0 + player_shapeValue;
  }
};

let getShape = (roundPick) => {
  // console.log(roundPick);
  if (roundPick === 'A' || roundPick === 'X') return 'ROCK';
  if (roundPick === 'B' || roundPick === 'Y') return 'PAPER';
  else return 'SCISSORS';
};

let getNewShape = (oppPick, playPick) => {
  // console.log(roundPick);
  if (
    (oppPick === 'A' && playPick === 'X') ||
    (oppPick === 'B' && playPick === 'Z') ||
    (oppPick === 'C' && playPick === 'Y')
  ) {
    return 'SCISSORS';
  } else if (
    (oppPick === 'A' && playPick === 'Y') ||
    (oppPick === 'B' && playPick === 'X') ||
    (oppPick === 'C' && playPick === 'Z')
  ) {
    return 'ROCK';
  } else {
    return 'PAPER';
  }
};

let getShapeValue = (shape) => {
  if (shape == 'ROCK') return 1;
  else if (shape == 'PAPER') return 2;
  else return 3;
};

let totalScore = 0;

strategyGuide.forEach((round, index) => {
  console.log('**-- ROUND ' + (index + 1) + ' --**');
  console.log(round);
  // trim space from string eg:- 'A C'
  let roundSCore = calculateScore(round.replace(/\s/g, ''));
  console.log(roundSCore);
  totalScore += roundSCore;
});

console.log('**== TOTAL SCORE ==**');
console.log(totalScore);
