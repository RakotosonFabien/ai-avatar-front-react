// src/pages/LiveTest.tsx
export default function LiveTest() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "20px", background: "#f8f8f8" }}>
        <h2>Chat Area</h2>
        <div style={{ border: "1px solid #ccc", height: "80%", padding: "10px" }}>
          (Future: Conversation log / AI responses here)
        </div>
      </div>

      <div style={{ width: "400px", padding: "20px", background: "#fff" }}>
        <h2>Avatar</h2>
        <div
          style={{
            width: "100%",
            height: "500px",
            border: "1px solid #ccc",
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          (Avatar Canvas)
        </div>
      </div>
    </div>
  )
}
