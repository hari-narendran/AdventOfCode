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
  
  console.log(commonCharacters('acexivou', 'aegihobu'))
  console.log(commonCharacters('vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'))
  console.log(commonCharacters('vJrwpWtwJgWrhcsFMMfFFhFp', 'PmmdzqPrVvPwwTWBwg'))
  console.log(commonCharacters('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg'))
  console.log(commonCharacters('rsFMf', 'vrwWg'))
  console.log(commonCharacters('rsFMf', 'qzr'))
  console.log(commonCharacters('vrwWg', 'qzr'))
  
