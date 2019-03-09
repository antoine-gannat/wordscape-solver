class Parser {
    parseAvailableLetters(availableLetters) {
        var availableLettersParsed = availableLetters.toLowerCase();
        availableLettersParsed = availableLettersParsed.split("");

        var availableLettersWithOccurence = [];
        availableLettersParsed.forEach((letter) => {
            const index = availableLettersWithOccurence.findIndex((l) => { return (l.letter === letter); });
            if (index === -1)
                availableLettersWithOccurence.push({ letter: letter, occurence: 1 });
            else
                availableLettersWithOccurence[index].occurence++;
        });
        return (availableLettersWithOccurence);
    }

    parseInputWord(inputWord) {
        var inputWordParsed = inputWord.toLowerCase();
        return (inputWordParsed);
    }
}
