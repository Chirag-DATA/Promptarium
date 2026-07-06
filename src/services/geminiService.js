const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const ACTION_INSTRUCTIONS = {
  improve: "Improve the clarity, specificity, and effectiveness of the following AI prompt. Return only the improved prompt text, with no preamble or explanation.",
  generate: "Based on the following short idea or topic, generate a complete, well-structured AI prompt. Return only the generated prompt text, with no preamble or explanation.",
  summarize: "Summarize the following AI prompt into a shorter, more concise version while preserving its core intent. Return only the summarized prompt text, with no preamble or explanation.",
  rewrite: "Rewrite the following AI prompt in a different phrasing style while preserving its meaning. Return only the rewritten prompt text, with no preamble or explanation.",
  optimize: "Optimize the following AI prompt for better results from a large language model, adding structure or constraints where helpful. Return only the optimized prompt text, with no preamble or explanation.",
};

export const enhancePrompt = async (apiKey, action, promptText) => {
  if (!apiKey) {
    throw new Error("No Gemini API key found. Add one in Settings first.");
  }

  const instruction = ACTION_INSTRUCTIONS[action];
  if (!instruction) {
    throw new Error(`Unknown action: ${action}`);
  }

  const response = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${instruction}\n\nPrompt:\n${promptText}` }],
        },
      ],
    }),
  });

  if (!response.ok) {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      throw new Error("Invalid or unauthorized API key. Check it in Settings.");
    }
    if (response.status === 429) {
      throw new Error("Rate limit reached. Wait a moment and try again.");
    }
    throw new Error(`Gemini API error (status ${response.status}).`);
  }

  const data = await response.json();
  const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!resultText) {
    throw new Error("Gemini returned an empty response.");
  }

  return resultText.trim();
};