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
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400"
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
        className="flex-1 min-w-[120px] bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400"
      />
    </div>
  );
};

export default TagInput;