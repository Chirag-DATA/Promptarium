import { Pin, Star, Globe, Lock, Trash2, Edit3, ArchiveRestore, Archive } from "lucide-react";

const PromptCard = ({
  prompt,
  onToggleFavorite,
  onTogglePin,
  onToggleArchive,
  onTogglePublic,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <div
      onClick={() => onView(prompt)}
      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-6 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
    >
      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
              {prompt.aiModel}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {prompt.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(prompt.id);
              }}
              aria-label={prompt.isPinned ? "Unpin prompt" : "Pin prompt"}
              className={`p-1.5 rounded-lg transition-colors ${
                prompt.isPinned
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <Pin size={14} fill={prompt.isPinned ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(prompt.id);
              }}
              aria-label={prompt.isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`p-1.5 rounded-lg transition-colors ${
                prompt.isFavorite
                  ? "text-amber-500 bg-amber-50 dark:bg-amber-950/40"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <Star size={14} fill={prompt.isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight line-clamp-1 mb-2.5">
          {prompt.title}
        </h3>

        {/* Snippet */}
        <div className="rounded-2xl bg-slate-50 dark:bg-[#0B0F19]/90 border border-slate-200/70 dark:border-slate-800/90 p-3.5 mb-3.5 font-mono text-xs text-slate-800 dark:text-slate-200 line-clamp-3 leading-relaxed">
          {prompt.prompt}
        </div>

        {/* Tags */}
        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {prompt.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {prompt.isArchived && (
          <span className="inline-block mb-3 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 px-2.5 py-0.5 text-xs font-semibold">
            Archived
          </span>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between gap-2 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePublic(prompt.id);
          }}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
            prompt.isPublic
              ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
          title={prompt.isPublic ? "Public on Explore" : "Private Vault Only"}
        >
          {prompt.isPublic ? <Globe size={13} /> : <Lock size={13} />}
          <span>{prompt.isPublic ? "Public" : "Private"}</span>
        </button>

        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(prompt);
            }}
            className="p-1.5 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit3 size={14} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleArchive(prompt.id);
            }}
            className="p-1.5 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={prompt.isArchived ? "Restore" : "Archive"}
          >
            {prompt.isArchived ? <ArchiveRestore size={14} /> : <Archive size={14} />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(prompt.id);
            }}
            className="p-1.5 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;