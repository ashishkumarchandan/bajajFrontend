import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" }
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    document.title = "ABCD123"; // Set to roll number
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setError(null);
      const res = await axios.post("https://bajajbackend-hvkf.onrender.com/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON input");
      setResponse(null);
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    let filteredData = {};

    if (selectedFilters.some((f) => f.value === "alphabets")) {
      filteredData.alphabets = response.alphabets;
    }
    if (selectedFilters.some((f) => f.value === "numbers")) {
      filteredData.numbers = response.numbers;
    }
    if (selectedFilters.some((f) => f.value === "highest_alphabet")) {
      filteredData.highest_alphabet = response.highest_alphabet;
    }

    return filteredData;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Frontend Application</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here...'
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h2>Filter Response</h2>
          <Select
            options={options}
            isMulti
            onChange={setSelectedFilters}
          />
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
