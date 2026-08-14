import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Desired folder
const DB_DIR = path.join(__dirname, "resource");

// Create folder if it doesn't exist
fs.mkdirSync(DB_DIR, { recursive: true });


// Database file
const DB_FILE = path.join(DB_DIR, "localdb.json");


export const readDatabase = () => {

    if (!fs.existsSync(DB_FILE)) {

        fs.writeFileSync(
            DB_FILE,
            JSON.stringify({}, null, 2)
        );

        return {};
    }

    const data = fs.readFileSync(DB_FILE, "utf-8");

    if (!data.trim()) {
        return {};
    }

    return JSON.parse(data);
};


export const writeDatabase = (data) => {

    fs.writeFileSync(
        DB_FILE,
        JSON.stringify(data, null, 2)
    );
};