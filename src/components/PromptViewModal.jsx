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
          <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 px-3 py-1 font-semibold">
            {prompt.category}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Model: {prompt.aiModel}
          </span>
        </div>

        {prompt.description && (
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
            {prompt.description}
          </p>
        )}

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] p-4">
          <pre className="whitespace-pre-wrap break-words font-mono text-xs text-slate-800 dark:text-slate-200 max-h-80 overflow-y-auto leading-relaxed">
            {prompt.prompt}
          </pre>
        </div>

        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(prompt)}
              className="rounded-full border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white transition-colors shadow-xs"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy Prompt"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PromptViewModal;