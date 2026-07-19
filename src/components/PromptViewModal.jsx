import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Modal from "./Modal";

const PromptViewModal = ({ prompt, onClose, onEdit }) => {
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Modal isOpen={!!prompt} onClose={onClose} title={prompt.title}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1 font-medium">
            {prompt.category}
          </span>
          <span className="text-gray-400">{prompt.aiModel}</span>
        </div>

        {prompt.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {prompt.description}
          </p>
        )}

        <div className="relative">
          <pre className="whitespace-pre-wrap break-words rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm text-gray-800 dark:text-gray-200 font-sans max-h-80 overflow-y-auto">
            {prompt.prompt}
          </pre>
        </div>

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

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={() => onEdit(prompt)}
            className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Prompt"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PromptViewModal;