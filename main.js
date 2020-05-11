'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const pigLatin = (word) => {
  // convert word in array of words using "space" as separator
  let words = word.split(" ")
  // loop words
  for  (let i = 0 ; i < words.length ; i++){
    let wordType = getWordType(words[i])
    console.log(wordType)
    let newWord = cleanWord(words[i])
    console.log(newWord)
    if (wordType == "vowel") {
      // call convertVowel function
       newWord = convertVowel(newWord)
      // grab result and override item in array
      words[i] = newWord
    } else if (wordType == "consonant") {
      // call convertConsonant function
      newWord = convertConsonant(newWord)
      // grab result and override item in array
      words[i] = newWord
    } else {
      console.log("Can't find word type")
    }
// end loop
}
  // convert word array in string
  let newString = words.join(" ")
  return newString
}

const getWordType = (word) => {
  let vowels = ["a", "e", "i", "o", "u"]
  let wordType = ""
  for  (let i = 0 ; i < vowels.length ; i++){
    if(word.charAt(0) == vowels[i]){
      wordType = "vowel"
      break
    } else {
      wordType = "consonant"
    }
  }
  return wordType
}

const cleanWord = (word) => {
  let newWord = word
  newWord = newWord.replace("4", "a")
  newWord = newWord.replace("3", "e")
  newWord = newWord.replace("1", "i")
  newWord = newWord.replace("0", "o")
  newWord = newWord.trim()
  newWord = newWord.toLowerCase()
  return newWord
}

const convertVowel = (word) => {
  let newWord = word + "yay"
  return newWord
}

const convertConsonant = (word) => {
  let newWord = ""
  let newWord1 = ""
  let newWord2 = ""
  let foundVowel = false
  for  (let i = 0 ; i < word.length ; i++){
    if (word.charAt(i) == "a" || word.charAt(i) == "e" || word.charAt(i) == "i" || word.charAt(i) == "o" || word.charAt(i) == "u") {
      foundVowel = true
    }
    if (foundVowel == false) {
      newWord1 = newWord1 + word.charAt(i)
    } else {
      newWord2 = newWord2 + word.charAt(i)
    }
  }
  newWord = newWord2 + newWord1
  newWord = newWord + "ay"
  return newWord
}

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}






// **********
//   HINTS
// **********

// break your code into pieces and focus on one piece at a time...
// 1. if word begins with a vowel send to one function: adds "yay"
// 2. if word begins in with a consonant send to another function: splices off beginning, returns word with new ending.
// 3. if multiple words, create array of words, loop over them, sending them to different functions and creating a new array with the new words.
