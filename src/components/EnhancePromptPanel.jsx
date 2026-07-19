import { useState } from "react";
import { Link } from "react-router-dom";
import { useApiKey } from "../hooks/useApiKey";
import { enhancePrompt } from "../services/geminiService";
import { Sparkles } from "lucide-react";

const ACTIONS = [
  { key: "improve", label: "Improve" },
  { key: "rewrite", label: "Rewrite" },
  { key: "summarize", label: "Summarize" },
  { key: "optimize", label: "Optimize" },
];

const EnhancePromptPanel = ({ promptText, onApply }) => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const handleAction = async (actionKey) => {
    setError("");
    setResult("");
    setIsLoading(true);

    try {
      const enhanced = await enhancePrompt(apiKey, actionKey, promptText);
      setResult(enhanced);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onApply(result);
    setResult("");
  };

  if (!apiKey) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-3 text-sm text-gray-500 dark:text-gray-400">
        Add a Gemini API key in{" "}
        <Link to="/dashboard/settings" className="text-blue-600 hover:underline">
          Settings
        </Link>{" "}
        to enable AI enhancement.
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-800 p-3 flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action.key}
            type="button"
            disabled={isLoading || !promptText.trim()}
            onClick={() => handleAction(action.key)}
            className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={14} /> {action.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="text-xs text-gray-500 dark:text-gray-400">Thinking...</p>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {result && (
        <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-3 flex flex-col gap-2">
          <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {result}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Use this
            </button>
            <button
              type="button"
              onClick={() => setResult("")}
              className="text-xs font-medium text-gray-500 hover:underline"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancePromptPanel;