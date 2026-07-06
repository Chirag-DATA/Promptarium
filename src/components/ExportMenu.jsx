import { useState, useRef, useEffect } from "react";
import { exportAsJSON, exportAsTXT, exportAsPDF } from "../services/exportService";

const ExportMenu = ({ prompts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExport = (exportFn) => {
    exportFn(prompts);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        Export ▾
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg z-10">
          <button
            type="button"
            onClick={() => handleExport(exportAsJSON)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Export as JSON
          </button>
          <button
            type="button"
            onClick={() => handleExport(exportAsTXT)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Export as TXT
          </button>
          <button
            type="button"
            onClick={() => handleExport(exportAsPDF)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Export as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;