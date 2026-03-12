import { useState } from "react";
import './App.css'

function App() {
  const [language, setLanguage] = useState("");
  const [args, setArgs] = useState("");

  function generateDockerfile() {
    console.log("Generate:", language, args);
  }

  function explainDockerfile() {
    console.log("Explain:", language, args);
  }

  return (
    <div className="container">
      <h1>Dockerfile Generator</h1>

      <div className="inputs">
        <input
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <input
          placeholder="Additional args"
          value={args}
          onChange={(e) => setArgs(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button className="generate" onClick={generateDockerfile}>
          Generate Dockerfile
        </button>

        <button className="explain" onClick={explainDockerfile}>
          Explain Dockerfile
        </button>
      </div>
    </div>
  );
}

export default App;