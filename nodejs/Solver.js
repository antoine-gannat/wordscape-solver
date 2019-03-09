const allWords = require('./assets/allEnglishWords.json');

class Solver {
    constructor() {
        this.possibleWords = [];
    }

    findSameLengthWords(inputWordLength) {
        this.possibleWords = allWords.filter((word) => { return (word.length === inputWordLength) });
    }

    findWordsComposedWithAvailableLetters(availableLettersWithOccurence, inputWordLength, maxWordLength) {
        // For each word
        this.possibleWords = this.possibleWords.filter((word) => {
            // For each letters of the word
            var compatible = true;
            // For each available letters
            for (var i = 0; i < availableLettersWithOccurence.length; i++) {
                // Find the occurence of an available letter in the word
                const occurence = (word.match(new RegExp(availableLettersWithOccurence[i].letter, "g")) || []).length;
                // The word is not compatible if:
                //      The occurence is superior to the amount of times this letter is available
                //      The researched word has the maximum size possible and the occurence is different than the letter available
                if ((inputWordLength !== maxWordLength && occurence > availableLettersWithOccurence[i].occurence)
                    || (inputWordLength === maxWordLength && occurence !== availableLettersWithOccurence[i].occurence)) {
                    compatible = false;
                    break;
                }
            };
            if (!compatible)
                return (false);
            // Remove words with letters that should not be there
            var availableLetters = availableLettersWithOccurence.map((letter) => { return (letter.letter) });
            for (var i = 0; i < word.length; i++) {
                if (availableLetters.findIndex((l) => { return (l === word[i]); }) === -1) {
                    compatible = false;
                    break;
                }
            }
            return (compatible);
        });
    }

    findWordsCompatibleWithKnownLetters(inputWord) {
        // For each word
        this.possibleWords = this.possibleWords.filter((word) => {
            // For each letters of this word
            for (var i = 0; i < word.length; i++) {
                // If the inputWord letter is known and is different from the letter of this word, the word is not compatible
                if (inputWord[i] !== '?' && word[i] !== inputWord[i])
                    return (false);
            }
            return (true);
        });
    }

    findPossibleWords(inputWord, availableLettersWithOccurence, maxWordLength) {
        this.findSameLengthWords(inputWord.length);
        this.findWordsCompatibleWithKnownLetters(inputWord);
        this.findWordsComposedWithAvailableLetters(availableLettersWithOccurence, inputWord.length, maxWordLength);
        return (this.possibleWords);
    }
}

module.exports = new Solver;