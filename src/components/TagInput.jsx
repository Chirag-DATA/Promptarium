import { useState } from "react";
import { X } from "lucide-react";

const TagInput = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (rawValue) => {
    const cleaned = rawValue.trim();
    if (!cleaned) return;
    if (tags.includes(cleaned)) return;

    onChange([...tags, cleaned]);
    setInputValue("");
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-3.5 py-2 focus-within:ring-2 focus-within:ring-blue-500/30">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-blue-400 hover:text-blue-700 dark:hover:text-blue-200"
            aria-label={`Remove ${tag} tag`}
          >
            <X size={12} />
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Add tags (Enter or comma)" : ""}
        className="flex-1 min-w-[120px] bg-transparent text-xs font-medium text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />
    </div>
  );
};

export default TagInput;