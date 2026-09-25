const RecentPromptsList = ({ prompts }) => {
  if (prompts.length === 0) {
    return (
      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 py-6 text-center">
        No prompts created yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/60">
      {prompts.map((prompt) => (
        <li key={prompt.id} className="py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {prompt.title}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              {prompt.category}
            </p>
          </div>
          {prompt.isFavorite && <span className="text-amber-500 text-xs shrink-0">★</span>}
        </li>
      ))}
    </ul>
  );
};

export default RecentPromptsList;