// src/utils/api.ts

const BASE_URL = "http://localhost:8000";

interface ChatResponse {
  reply: string;
}

export const sendMessage = async (text: string): Promise<ChatResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/chat/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to get response: ${err}`);
    }

    return await res.json();
  } catch (error) {
    console.error("[sendMessage] ❌", error);
    throw error;
  }
};

export const getSpeech = async (text: string): Promise<string> => {
  try {
    const res = await fetch(`${BASE_URL}/speech/speak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to get audio: ${err}`);
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob); // Local audio URL for <audio />
  } catch (error) {
    console.error("[getSpeech] ❌", error);
    throw error;
  }
};
