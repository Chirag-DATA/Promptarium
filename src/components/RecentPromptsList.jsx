const RecentPromptsList = ({ prompts }) => {
  if (prompts.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No prompts yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
      {prompts.map((prompt) => (
        <li key={prompt.id} className="py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {prompt.title}
            </p>
            <p className="text-xs text-gray-400">{prompt.category}</p>
          </div>
          {prompt.isFavorite && <span className="text-yellow-500 shrink-0">⭐</span>}
        </li>
      ))}
    </ul>
  );
};

export default RecentPromptsList;