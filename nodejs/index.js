const Solver = require('./Solver');
const Parser = require('./Parser');

// check args
if (process.argv.length != 4) {
    console.log("Usage: node index.js {word} {available_letters}");
    console.log("\tsentence: Word to complete with '?' as missing letters");
    console.log("\tavailable_letters: List of letters available");
    console.log("\n\tExample: node index.js h???o lleho");
    console.log("\tResponse: hello");
    return;
}

// Parse the input word
const inputWord = Parser.parseInputWord(process.argv[2]);

// Parse the available letters
var availableLettersWithOccurence = Parser.parseAvailableLetters(process.argv[3]);
const maxWordLenth = process.argv[3].length;

// Find words with the same length
const possibleWords = Solver.findPossibleWords(inputWord, availableLettersWithOccurence, maxWordLenth);

console.log("Possible words:");
possibleWords.forEach((word) => {
    console.log(word);
})