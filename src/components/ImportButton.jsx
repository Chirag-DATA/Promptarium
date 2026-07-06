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
        className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        Import
      </button>
    </>
  );
};

export default ImportButton;