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
    <div className="flex flex-wrap gap-3">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={statusOptions.ALL}>All</option>
        <option value={statusOptions.FAVORITES}>Favorites</option>
        <option value={statusOptions.PINNED}>Pinned</option>
        <option value={statusOptions.ARCHIVED}>Archived</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
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
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={sortOptions.NEWEST}>Newest</option>
        <option value={sortOptions.OLDEST}>Oldest</option>
        <option value={sortOptions.ALPHABETICAL}>Alphabetical</option>
        <option value={sortOptions.RECENTLY_UPDATED}>Recently Updated</option>
      </select>
    </div>
  );
};

export default FilterPanel;