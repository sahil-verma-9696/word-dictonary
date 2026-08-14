/**
 * 
 * @deprecated
 */
console.log("DB initialized");

const dictionary = new Map();

export const add = (word) => {
    if (dictionary.has(word)) {
        throw new Error("already exists");
    }

    dictionary.set(word, 1);
};

export const hasWord = (word) => {
    return dictionary.has(word);
};

export const increaseWordFreq = (word) => {
    if (!dictionary.has(word)) {
        throw new Error("word does not exist in dictionary");
    }

    dictionary.set(word, dictionary.get(word) + 1);
};

export const getWordFrequency = (word) => {
    return dictionary.get(word);
};

/**
 * 
 * @returns [ {key, value}, {key, value}, ...]
 */
export const getAllWords = () => {
    return [...dictionary.entries()].map(([word, frequency]) => ({
        word,
        frequency
    }));
};