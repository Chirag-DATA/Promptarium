import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

const getStorageKey = (userId) => `promptarium_gemini_api_key_${userId}`;

export const useApiKey = () => {
  const { user } = useAuth();
  const [apiKey, setApiKeyState] = useState("");

  useEffect(() => {
    if (!user) {
      setApiKeyState("");
      return;
    }

    const stored = localStorage.getItem(getStorageKey(user.id)) || "";
    setApiKeyState(stored);
  }, [user]);

  const setApiKey = useCallback(
    (newKey) => {
      if (!user) return;

      setApiKeyState(newKey);

      if (newKey) {
        localStorage.setItem(getStorageKey(user.id), newKey);
      } else {
        localStorage.removeItem(getStorageKey(user.id));
      }
    },
    [user]
  );

  return { apiKey, setApiKey };
};