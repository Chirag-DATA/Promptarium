import { useState } from "react";

export const usePromptViewer = () => {
  const [viewingPrompt, setViewingPrompt] = useState(null);

  const openViewer = (prompt) => {
    setViewingPrompt(prompt);
  };

  const closeViewer = () => {
    setViewingPrompt(null);
  };

  return { viewingPrompt, openViewer, closeViewer };
};