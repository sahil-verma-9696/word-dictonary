# Dictionary Search & Auto-Suggestion System
---

# 1. Data Structures Used

## JavaScript `Map`

The primary in-memory data structure is a JavaScript `Map`.

```js
const dictionary = new Map();
```
---

# 2. API Endpoints

## Add Word

```http
POST /words
```

Request:

```json
{
  "word": "apple"
}
```

Response:

```json
{
  "word": "apple",
  "frequency": 1
}
```

---

## Exact Search

```http
GET /search?q=apple
```

Response:

```json
{
  "result": "FOUND"
}
```

or:

```json
{
  "result": "NOT FOUND"
}
```

---

## Prefix Suggestion

```http
GET /suggest?q=app&k=3
```

Response:

```json
{
  "suggestions": [
    "apple",
    "application",
    "apply"
  ]
}
```
---

## Install the Project

Clone or extract the project and move into the project directory:

```bash
cd backend
```

If the project contains dependencies, install them using:

```bash
npm install
```

---

## Start the Server

Run:

```bash
npm start
```

or, if the project uses the Node entry file directly:

```bash
node src/app.js
```

The server will start on:

```text
http://localhost:3000
```

---

# 3. How to Test

The API can be tested using Postman, curl, or another HTTP client.

### Add a word

```bash
curl -X POST http://localhost:3000/words \
-H "Content-Type: application/json" \
-d "{\"word\":\"apple\"}"
```

### Search a word

```bash
curl "http://localhost:3000/search?q=apple"
```

### Get suggestions

```bash
curl "http://localhost:3000/suggest?q=app&k=3"
```

---

# 4. Storage

The system uses:

```text
resource/localdb.json
```

as local persistent storage.

If the file or its directory does not exist, the application creates it automatically.

Example:

```text
project/
│
├── src/
│   ├── server.js
│   ├── routes.js
│   ├── service.js
│   │
│   └── db/
│       ├── dictionaryRepository.js
│       └── fileStorage.js
│       ├── resource/
|           └── localdb.json
│
└── package.json
```

The application loads existing data from the JSON file when it starts.

---

# 5. Technical Assumptions and Details

## In-Memory Dictionary

The `Map` is the primary working data structure.

The `JSON` file is used for persistence.

---

## Case Sensitivity

Words are treated exactly as they are provided.

For example:

```text
Apple
apple
```
---

# 12. Complexity

Let:

* `n` = number of words in the dictionary
* `m` = number of words matching the prefix

### Exact Search

Using `Map`:

```text
Lookup: approximately O(1)
```

Frequency update:

```text
O(1)
```

Therefore, the dictionary lookup itself is approximately:

```text
O(1)
```

---

### Prefix Suggestion

The current implementation scans all words:

```text
O(n)
```

Then sorts the matching words:

```text
O(m log m)
```

Therefore:

```text
O(n + m log m)
```

```

Improvments

For extremely large dictionaries, a `Trie` specialized prefix data structure could be used to improve prefix lookup performance.
```

---

# 13. Design Summary

```text
Routes
  │
  ▼
Service
  │
  │  Business logic
  ▼
Repository
  │
  │  Dictionary operations
  ▼
File Storage
  │
  │  Persistence
  ▼
localdb.json
```