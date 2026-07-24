import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auditWebsite = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post("https://pagepulse-backend-a1iy.onrender.com/audit", {
        url,
      });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Page Pulse</h1>

      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={auditWebsite}>Audit Website</button>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="card">
          <p><strong>HTTP Status:</strong> {result.httpStatus}</p>
          <p><strong>Response Time:</strong> {result.responseTimeMs} ms</p>
          <p><strong>Title:</strong> {result.pageTitle}</p>
          <p><strong>Meta Description:</strong> {result.metaDescription}</p>
          <p><strong>H1 Count:</strong> {result.h1Count}</p>
          <p><strong>Images Missing Alt:</strong> {result.imagesMissingAlt}</p>
          <p><strong>Approximate Word Count:</strong> {result.approximateWordCount}</p>
        </div>
      )}

      <footer>
        Built for{" "}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          Digital Heroes Training Task
        </a>
      </footer>
    </div>
  );
}

export default App;