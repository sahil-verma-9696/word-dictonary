import {  useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {

  // -----------------------------
  // Add Word
  // -----------------------------

  const [word, setWord] = useState("");
  const [addResult, setAddResult] = useState(null);
  const [addError, setAddError] = useState(null);


  // -----------------------------
  // Exact Search
  // -----------------------------

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);


  // -----------------------------
  // Prefix Suggestion
  // -----------------------------

  const [prefix, setPrefix] = useState("");
  const [k, setK] = useState(5);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestError, setSuggestError] = useState(null);


  // -----------------------------
  // Add Word API
  // POST /words
  // -----------------------------

  const handleAddWord = async () => {

    setAddResult(null);
    setAddError(null);

    if (!word.trim()) {
      setAddError("Please enter a word");
      return;
    }

    try {

      const res = await fetch(`${BASE_URL}/words`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          word: word.trim()
        })
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error || "Failed to add word");
      }

      setAddResult(payload);

    } catch (error) {
      setAddError(error.message);
    }
  };


  // -----------------------------
  // Exact Search API
  // GET /search?q=...
  // -----------------------------

  const handleSearch = async () => {

    setSearchResult(null);
    setSearchError(null);

    if (!searchQuery.trim()) {
      setSearchError("Please enter a word");
      return;
    }

    try {

      const res = await fetch(
        `${BASE_URL}/words?q=${encodeURIComponent(searchQuery.trim())}`
      );

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error || "Search failed");
      }

      setSearchResult(payload);

    } catch (error) {
      setSearchError(error.message);
    }
  };


  // -----------------------------
  // Prefix Suggestion API
  // GET /suggest?q=...&k=...
  // -----------------------------

  const handleSuggest = async () => {

    setSuggestions([]);
    setSuggestError(null);

    if (!prefix.trim()) {
      setSuggestError("Please enter a prefix");
      return;
    }

    try {

      const res = await fetch(
        `${BASE_URL}/words?q=${encodeURIComponent(prefix.trim())}&k=${k}`
      );

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error || "Suggestion request failed");
      }

      setSuggestions(payload || []);

    } catch (error) {
      setSuggestError(error.message);
    }
  };



  return (
    <div>

      <h1>Word Dictionary</h1>


      {/* ======================================
          ADD WORD
      ====================================== */}

      <section>

        <h2>Add Word</h2>

        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter word"
        />

        <button onClick={handleAddWord}>
          Add Word
        </button>

        {addResult && (
          <pre>
            {JSON.stringify(addResult, null, 2)}
          </pre>
        )}

        {addError && (
          <p>{addError}</p>
        )}

      </section>


      {/* ======================================
          EXACT SEARCH
      ====================================== */}

      <section>

        <h2>Search Word</h2>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter exact word"
        />

        <button onClick={handleSearch}>
          Search
        </button>

        {searchResult && (
          <pre>
            {JSON.stringify(searchResult, null, 2)}
          </pre>
        )}

        {searchError && (
          <p>{searchError}</p>
        )}

      </section>


      {/* ======================================
          PREFIX SUGGESTION
      ====================================== */}

      <section>

        <h2>Suggestions</h2>

        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="Enter prefix"
        />

        <input
          type="number"
          value={k}
          min="1"
          onChange={(e) => setK(Number(e.target.value))}
        />

        <button onClick={handleSuggest}>
          Get Suggestions
        </button>

        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        {suggestions.length === 0 && !suggestError && prefix && (
          <p>No suggestions found.</p>
        )}

        {suggestError && (
          <p>{suggestError}</p>
        )}

      </section>

    </div>
  );
}

export default App;