import { useState } from "react";
import { Heart, Copy, Check } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const PublicPromptCard = ({ prompt, onToggleLike }) => {
  const { isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const authorPhotoUrl = prompt.author_photo
    ? `${import.meta.env.VITE_API_BASE_URL}${prompt.author_photo}`
    : null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      onToggleLike(prompt.id, true); // signal "needs login"
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
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{prompt.title}</h3>
        <span className="text-xs text-gray-400">{prompt.category}</span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {prompt.prompt_text}
      </p>

      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center shrink-0">
            {authorPhotoUrl ? (
              <img src={authorPhotoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[10px] font-semibold text-gray-400">
                {(prompt.author_username || "?")[0].toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {prompt.author_username || "Anonymous"}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleLike}
            disabled={isLiking}
            title={isAuthenticated ? undefined : "Log in to like this prompt"}
            className={`flex items-center gap-1 text-xs font-medium transition-colors ${
              prompt.is_liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
          >
            <Heart size={15} fill={prompt.is_liked ? "currentColor" : "none"} />
            {prompt.like_count}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-blue-600"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicPromptCard;