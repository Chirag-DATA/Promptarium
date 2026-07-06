import { useState, useCallback } from "react";

const STORAGE_KEY = "promptvault_gemini_api_key";

export const useApiKey = () => {
  const [apiKey, setApiKeyState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "";
  });

  const setApiKey = useCallback((newKey) => {
    setApiKeyState(newKey);
    if (newKey) {
      localStorage.setItem(STORAGE_KEY, newKey);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return { apiKey, setApiKey };
};