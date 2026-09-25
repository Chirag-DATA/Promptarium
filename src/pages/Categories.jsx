import { useState, useMemo } from "react";
import { usePrompts } from "../hooks/usePrompts";
import { usePromptEditor } from "../hooks/usePromptEditor";
import { usePromptViewer } from "../hooks/usePromptViewer";
import { PROMPT_CATEGORIES } from "../constants/promptCategories";
import Modal from "../components/Modal";
import PromptForm from "../components/PromptForm";
import PromptCard from "../components/PromptCard";
import PromptViewModal from "../components/PromptViewModal";

const Categories = () => {
  const {
    prompts,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    togglePin,
    toggleArchive,
    togglePublic,
  } = usePrompts();

  const {
    isModalOpen,
    editingPrompt,
    error,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  } = usePromptEditor({ updatePrompt, deletePrompt });

  const { viewingPrompt, openViewer, closeViewer } = usePromptViewer();

  const [activeCategory, setActiveCategory] = useState(null);

  const activePrompts = useMemo(() => {
    return prompts.filter((prompt) => !prompt.isArchived);
  }, [prompts]);

  const categoriesWithCounts = useMemo(() => {
    return PROMPT_CATEGORIES.map((category) => ({
      name: category,
      count: activePrompts.filter((prompt) => prompt.category === category).length,
    })).filter((category) => category.count > 0);
  }, [activePrompts]);

  const visiblePrompts = useMemo(() => {
    if (!activeCategory) return activePrompts;
    return activePrompts.filter((prompt) => prompt.category === activeCategory);
  }, [activePrompts, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Categories</h1>
        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Filter and browse prompts by topic.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === null
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          All ({activePrompts.length})
        </button>
        {categoriesWithCounts.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setActiveCategory(category.name)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === category.name
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {visiblePrompts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
            No prompts found under this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onToggleFavorite={toggleFavorite}
              onTogglePin={togglePin}
              onToggleArchive={toggleArchive}
              onTogglePublic={togglePublic}
              onDelete={handleDelete}
              onEdit={openEditModal}
              onView={openViewer}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Prompt">
        {error && (
          <p className="mb-3 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-2xl px-3.5 py-2 border border-rose-200 dark:border-rose-900/50">
            {error}
          </p>
        )}
        <PromptForm
          initialValues={editingPrompt}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel="Save Changes"
        />
      </Modal>

      <PromptViewModal
        prompt={viewingPrompt}
        onClose={closeViewer}
        onEdit={(prompt) => {
          closeViewer();
          openEditModal(prompt);
        }}
      />
    </div>
  );
};

export default Categories;