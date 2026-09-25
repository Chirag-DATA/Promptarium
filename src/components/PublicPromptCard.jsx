import { useState } from "react";
import { Heart, Copy, Check } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const MODEL_THEMES = {
  ChatGPT: {
    badge: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    dot: "bg-emerald-500",
  },
  Claude: {
    badge: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
    dot: "bg-amber-500",
  },
  Gemini: {
    badge: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    dot: "bg-blue-500",
  },
  Other: {
    badge: "bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400",
  },
};

const PublicPromptCard = ({ prompt, onToggleLike, onSelectPrompt }) => {
  const { isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const modelStyle = MODEL_THEMES[prompt.ai_model] || MODEL_THEMES.Other;
  const authorPhotoUrl = prompt.author_photo
    ? `${import.meta.env.VITE_API_BASE_URL}${prompt.author_photo}`
    : null;

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onToggleLike(prompt.id, true);
      return;
    }

    setIsLiking(true);
    try {
      await onToggleLike(prompt.id, false);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div
      onClick={() => onSelectPrompt?.(prompt)}
      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-6 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
    >
      <div>
        {/* Model Badge & Like */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${modelStyle.badge}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${modelStyle.dot}`} />
              {prompt.ai_model || "LLM"}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {prompt.category}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLike}
            disabled={isLiking}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              prompt.is_liked
                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50"
                : "text-slate-400 dark:text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Heart
              size={13}
              className={prompt.is_liked ? "fill-rose-500 stroke-rose-500" : ""}
            />
            <span>{prompt.like_count}</span>
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight line-clamp-1 mb-2.5">
          {prompt.title}
        </h3>

        {/* Monospace Code Preview Box */}
        <div className="rounded-2xl bg-slate-50 dark:bg-[#0B0F19]/90 border border-slate-200/70 dark:border-slate-800/90 p-3.5 mb-3.5 text-xs text-slate-800 dark:text-slate-200 font-mono leading-relaxed line-clamp-3">
          {prompt.prompt_text}
        </div>

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {prompt.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
            {authorPhotoUrl ? (
              <img src={authorPhotoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                {(prompt.author_username || "A")[0]}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[120px]">
            {prompt.author_username || "Community"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PublicPromptCard;