import { addWord, defaultWordSearch, prefixWordSearch } from "./service.js";

export const getWord = (req, res, next) => {

    try {
        const { q, k } = req.query;

        let response;

        if(!k){
            response = defaultWordSearch(q);
        }else{
            response = prefixWordSearch(q, k);
        }

        res.status(200).json(response);
        
        return;
    } catch (error) {
        next(error);
    }

}

export const postWord = (req, res, next) => {

    try {
        const { word } = req.body;

        if(typeof word !== "string") throw new Error("Invalid input, word should type of string only");

        addWord(word);

        res.status(200).json({ message: "Word added successfully" });
        return;
    } catch (error) {
        next(error);
    }
}