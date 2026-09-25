import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search title, content, tags, or category..."
        className="w-full rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] pl-10 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      />
    </div>
  );
};

export default SearchBar;