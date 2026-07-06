const CategoryBreakdown = ({ categoryCounts }) => {
  const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No categories yet.
      </p>
    );
  }

  const maxCount = entries[0][1];

  return (
    <ul className="flex flex-col gap-3">
      {entries.map(([category, count]) => (
        <li key={category}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-700 dark:text-gray-300">{category}</span>
            <span className="text-gray-400">{count}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${(count / maxCount) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryBreakdown;