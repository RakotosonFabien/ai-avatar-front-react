import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to AI Mood Companion</h1>
      <button
        onClick={() => navigate("/live")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Go to Live Test
      </button>
    </div>
  );
}
