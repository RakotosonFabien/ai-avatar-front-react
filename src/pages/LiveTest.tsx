import { useState } from "react";
import { sendMessage, getSpeech } from "../utils/api";
import AvatarCanvas from "../components/AvatarCanvas";

export default function LiveTest() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const aiReply = await sendMessage(input);
      setResponse(aiReply.reply);

      const audioUrl = await getSpeech(aiReply.reply);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error("Error handling message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_600px] h-screen bg-gray-50">
      {/* Chat Panel */}
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🧠 Chat with AI</h2>
          <div className="min-h-[200px] bg-white p-4 rounded-lg shadow-inner border text-gray-800 mb-6 overflow-auto max-h-60">
            {response ? <p className="whitespace-pre-wrap">🤖 {response}</p> : <p className="text-gray-400 italic">AI response will appear here...</p>}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-28 p-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Type your thoughts..."
          />
        </div>
        <button
          onClick={handleSend}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Avatar Panel */}
      <div className="bg-white border-l p-6 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🧍 Avatar</h2>
        <div className="flex-1 bg-gray-100 border rounded-xl shadow-inner flex items-center justify-center text-gray-500 text-lg">
          <AvatarCanvas />
        </div>
      </div>
    </div>
  );
}
