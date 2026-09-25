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
        className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        Export ▾
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xl z-20 overflow-hidden py-1">
          <button
            type="button"
            onClick={() => handleExport(exportAsJSON)}
            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Export as JSON
          </button>
          <button
            type="button"
            onClick={() => handleExport(exportAsTXT)}
            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Export as TXT
          </button>
          <button
            type="button"
            onClick={() => handleExport(exportAsPDF)}
            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Export as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;