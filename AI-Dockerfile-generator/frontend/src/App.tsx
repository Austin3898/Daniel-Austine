import { useState } from "react";
import './App.css'

function App() {
  const [language, setLanguage] = useState("");
  const [args, setArgs] = useState("");
  const [code, setCode] = useState("Code ...")
  const [loading, setLoading] = useState(false);

  async function generateDockerfile() {
    setLoading(true)
    const data = { language, additional_args: args}

    try{
      const response = await fetch("/api/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCode(result.response);
    } catch (error) {
      console.error(error);
      setCode("Error explaining Dockerfile");
    }

    setLoading(false)
  }

  async function explainDockerfile() {
    setLoading(true)

    const data = { dockerfile : code}
    try{
      const response = await fetch("/api/explain/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCode(result.response);
    } catch (error) {
      console.error(error);
      setCode("Error explaining Dockerfile");
    }

    setLoading(false)
  }

  function copyCode() {
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="container">
      <div className="content">
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
          <button className="generate" onClick={generateDockerfile} disabled={loading}>
             {loading ? "Generating..." : "Generate"}
          </button>

          <button className="explain" onClick={explainDockerfile} disabled={loading}>
             {loading ? "Explaining..." : "Explain"}
          </button>
        </div>

        <div className="code">
          <button className="copy" onClick={copyCode}>Copy</button>

            {loading ? (
              <div className="loader"></div>
            ): (
            <pre>
              <code>{code}</code>
            </pre>)}
        </div>
      </div>
    </div>
  );
}

export default App;