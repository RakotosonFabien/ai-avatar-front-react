import { useState } from "react";
import { sendMessage, getSpeech } from "../utils/api";

export default function LiveTest() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const aiReply = await sendMessage(input);
    setResponse(aiReply.reply);
    // setResponse("My default reply");

    const audioUrl = await getSpeech(aiReply.reply);
    // const audioUrl = await getSpeech("My default reply");
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="flex h-screen">
      {/* Chat Panel */}
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">🧠 Chat with AI</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring"
          placeholder="Type your thoughts..."
        />
        <button
          onClick={handleSend}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
        {response && (
          <div className="mt-6 p-4 bg-white rounded shadow text-lg">
            🤖 {response}
          </div>
        )}
      </div>

      {/* Avatar Panel */}
      <div className="w-[400px] bg-white p-8 border-l">
        <h2 className="text-2xl font-semibold mb-4">🧍 Avatar</h2>
        <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded border">
          (Avatar Canvas Coming Soon)
        </div>
      </div>
    </div>
  );
}
