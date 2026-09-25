const CategoryBreakdown = ({ categoryCounts }) => {
  const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return (
      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 py-6 text-center">
        No active prompts to categorize.
      </p>
    );
  }

  const maxCount = entries[0][1];

  return (
    <ul className="flex flex-col gap-3.5">
      {entries.map(([category, count]) => (
        <li key={category}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-800 dark:text-slate-200">{category}</span>
            <span className="text-slate-400 dark:text-slate-500 font-mono">{count}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
              style={{ width: `${(count / maxCount) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryBreakdown;