const PromptCard = ({
  prompt,
  onToggleFavorite,
  onTogglePin,
  onToggleArchive,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <div
      onClick={() => onView(prompt)}
      className="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {prompt.title}
          </h3>
          <span className="text-xs text-gray-400">{prompt.category}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(prompt.id);
            }}
            aria-label={prompt.isPinned ? "Unpin prompt" : "Pin prompt"}
            className={prompt.isPinned ? "text-blue-600" : "text-gray-300 hover:text-gray-500"}
          >
            📌
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(prompt.id);
            }}
            aria-label={prompt.isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={prompt.isFavorite ? "text-yellow-500" : "text-gray-300 hover:text-gray-500"}
          >
            ⭐
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {prompt.prompt}
      </p>

      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {prompt.isArchived && (
        <span className="w-fit rounded-full bg-orange-50 dark:bg-orange-950 px-2 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
          Archived
        </span>
      )}

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs font-medium">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(prompt);
          }}
          className="text-gray-500 hover:text-blue-600"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleArchive(prompt.id);
          }}
          className="text-gray-500 hover:text-orange-600"
        >
          {prompt.isArchived ? "Restore" : "Archive"}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(prompt.id);
          }}
          className="text-gray-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PromptCard;