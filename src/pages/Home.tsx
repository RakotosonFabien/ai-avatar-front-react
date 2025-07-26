// src/pages/Home.tsx
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: "center", paddingTop: "150px" }}>
      <h1>Welcome to AI Mood Companion</h1>
      <button
        onClick={() => navigate("/live")}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          marginTop: "40px",
          cursor: "pointer",
        }}
      >
        Go to Live Test
      </button>
    </div>
  )
}
