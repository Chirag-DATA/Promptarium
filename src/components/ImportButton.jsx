import { useRef } from "react";
import { parseImportedPrompts } from "../services/importService";

const ImportButton = ({ onImport }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = parseImportedPrompts(event.target.result);

      if (!result.success) {
        alert(result.error);
      } else {
        onImport(result.prompts);
        const skippedMessage = result.skippedCount
          ? ` (${result.skippedCount} invalid entries skipped)`
          : "";
        alert(`Imported ${result.prompts.length} prompts.${skippedMessage}`);
      }
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        Import
      </button>
    </>
  );
};

export default ImportButton;