import { PROMPT_CATEGORIES } from "../constants/promptCategories";

const FilterPanel = ({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  statusOptions,
  sortOptions,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
      >
        <option value={statusOptions.ALL}>All Status</option>
        <option value={statusOptions.FAVORITES}>Favorites</option>
        <option value={statusOptions.PINNED}>Pinned</option>
        <option value={statusOptions.ARCHIVED}>Archived</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
      >
        <option value="all">All Categories</option>
        {PROMPT_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
      >
        <option value={sortOptions.NEWEST}>Newest First</option>
        <option value={sortOptions.OLDEST}>Oldest First</option>
        <option value={sortOptions.ALPHABETICAL}>A to Z</option>
        <option value={sortOptions.RECENTLY_UPDATED}>Recently Updated</option>
      </select>
    </div>
  );
};

export default FilterPanel;