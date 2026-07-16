import { useState, useEffect } from "react";
import { useApiKey } from "../hooks/useApiKey";
import ProfileSection from "../components/ProfileSection";

const Settings = () => {
  const { apiKey, setApiKey } = useApiKey();
  const [inputValue, setInputValue] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setInputValue(apiKey);
  }, [apiKey]);

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(inputValue.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setApiKey("");
    setInputValue("");
  };

  return (
    <div className="max-w-lg">
      <ProfileSection />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Add your own Gemini API key to enable AI-powered prompt enhancement.
        Your key is stored only in this browser and is never sent anywhere except directly to Google's Gemini API.
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Gemini API Key
        </label>
        <input
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste your Gemini API key"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {saved ? "Saved ✓" : "Save Key"}
          </button>
          {apiKey && (
            <button
              type="button"
              onClick={handleClear}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Remove Key
            </button>
          )}
        </div>
      </form>

      <p className="mt-6 text-xs text-gray-400">
        Don't have a key? Get one for free from{" "}
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Google AI Studio
        </a>.
      </p>
    </div>
  );
};

export default Settings;