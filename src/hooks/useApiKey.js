import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

const GUEST_KEY = "promptarium_gemini_api_key_guest";
const getUserStorageKey = (userId) => `promptarium_gemini_api_key_${userId}`;

export const useApiKey = () => {
  const { user, isAuthenticated } = useAuth();
  const [apiKey, setApiKeyState] = useState("");

  const storageKey = isAuthenticated ? getUserStorageKey(user.id) : GUEST_KEY;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) || "";
    setApiKeyState(stored);
  }, [storageKey]);

  const setApiKey = useCallback(
    (newKey) => {
      setApiKeyState(newKey);

      if (newKey) {
        localStorage.setItem(storageKey, newKey);
      } else {
        localStorage.removeItem(storageKey);
      }
    },
    [storageKey]
  );

  return { apiKey, setApiKey };
};