import {
    add,
    hasWord,
    increaseWordFreq,
    getAllWords
} from "./db/repository.js";


export const defaultWordSearch = (q) => {

    if (!hasWord(q)) {
        return "NOT FOUND";
    }

    increaseWordFreq(q);

    return "FOUND";
};

export const prefixWordSearch = (q, k) => {

    const words = getAllWords();

    const matchingWords = words.filter(({ word }) =>
        word.startsWith(q)
    );

    matchingWords.sort((a, b) => {

        if (a.frequency !== b.frequency) {
            return b.frequency - a.frequency;
        }

        return a.word.localeCompare(b.word);
    });

    return matchingWords
        .slice(0, k)
        .map(({ word }) => word);
};

export const addWord = (word) => {
    add(word);
}