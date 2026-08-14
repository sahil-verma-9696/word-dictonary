import {
    readDatabase,
    writeDatabase
} from "./fileStorage.js";


console.log("Dictionary repository initialized");


const dictionary = new Map();


// --------------------------------------------------
// Load existing dictionary
// --------------------------------------------------

const loadDictionary = () => {

    const data = readDatabase();

    for (const [word, frequency] of Object.entries(data)) {
        dictionary.set(word, frequency);
    }
};

// Initialize
loadDictionary();


// --------------------------------------------------
// save dictionary
// --------------------------------------------------

const save = () => {

    const data = Object.fromEntries(dictionary);

    writeDatabase(data);
};


// --------------------------------------------------
// Repository operations
// --------------------------------------------------

export const add = (word) => {

    if (dictionary.has(word)) {
        throw new Error("already exists");
    }

    dictionary.set(word, 1);

    save();
};


export const hasWord = (word) => {

    return dictionary.has(word);
};


export const increaseWordFreq = (word) => {

    if (!dictionary.has(word)) {
        throw new Error(
            "word does not exist in dictionary"
        );
    }

    const frequency = dictionary.get(word);

    dictionary.set(
        word,
        frequency + 1
    );

    save();
};


export const getWordFrequency = (word) => {

    return dictionary.get(word);
};


export const getAllWords = () => {

    return [...dictionary.entries()]
        .map(([word, frequency]) => ({
            word,
            frequency
        }));
};