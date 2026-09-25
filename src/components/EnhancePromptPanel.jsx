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
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-3.5 text-xs text-slate-500 dark:text-slate-400">
        Add a Gemini API key in{" "}
        <Link to="/dashboard/settings" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          Settings
        </Link>{" "}
        to enable AI enhancement.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col gap-3 bg-white dark:bg-[#111827]">
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action.key}
            type="button"
            disabled={isLoading || !promptText.trim()}
            onClick={() => handleAction(action.key)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles size={13} className="text-blue-600 dark:text-blue-400" /> {action.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Thinking...</p>
      )}

      {error && (
        <p className="text-xs font-semibold text-rose-600">{error}</p>
      )}

      {result && (
        <div className="rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 p-3 flex flex-col gap-2">
          <p className="text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
            {result}
          </p>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleApply}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Use this
            </button>
            <button
              type="button"
              onClick={() => setResult("")}
              className="text-xs font-semibold text-slate-500 hover:underline"
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