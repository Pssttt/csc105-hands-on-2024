import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(0);
  const [value, setValue] = useState(null);

  return (
    <>
      <h1>Simple Calculator</h1>
      <div>Result: {result}</div>
      <input
        type="number"
        placeholder="Enter a number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div>
        <button onClick={() => setResult(result + value)}>Add</button>
        <button onClick={() => setResult(result - value)}>Subtract</button>
        <button onClick={() => setResult(result * value)}>Multiply</button>
        <button onClick={() => setResult(result / value)}>Divide</button>
      </div>
      <div>
        <button id="reset" onClick={() => setValue(0)}>
          Reset Input
        </button>
        <button id="reset" onClick={() => setResult(0)}>
          Reset Result
        </button>
      </div>
    </>
  );
}

export default App;
