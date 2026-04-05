import { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const submitTicket = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://your-backend-url.onrender.com/ticket",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      setAiResult(res.data.ai);
    } catch (error) {
      console.error(error);
      alert("Error submitting ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0f1a",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          border: "1px solid #444",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#111122",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>AI Ticketing System</h1>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #555",
            backgroundColor: "#1e1e2f",
            color: "white",
            boxSizing: "border-box",
          }}
        />

        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #555",
            backgroundColor: "#1e1e2f",
            color: "white",
            resize: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={submitTicket}
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Submit Ticket"}
        </button>

        {aiResult && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#1e1e2f",
              borderRadius: "8px",
              textAlign: "left",
              border: "1px solid #444",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>AI Response</h3>

            {aiResult.split("\n").map((line, index) => (
              <p key={index} style={{ margin: "5px 0" }}>
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;