import { useState, useMemo } from "react";
import { usePrompts } from "../hooks/usePrompts";
import { usePromptEditor } from "../hooks/usePromptEditor";
import { PROMPT_CATEGORIES } from "../constants/promptCategories";
import Modal from "../components/Modal";
import PromptForm from "../components/PromptForm";
import PromptCard from "../components/PromptCard";

const Categories = () => {
  const {
    prompts,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    togglePin,
    toggleArchive,
  } = usePrompts();

  const {
    isModalOpen,
    editingPrompt,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  } = usePromptEditor({ updatePrompt, deletePrompt });

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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Browse prompts organized by category.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All ({activePrompts.length})
        </button>
        {categoriesWithCounts.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setActiveCategory(category.name)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === category.name
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {visiblePrompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No prompts in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visiblePrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onToggleFavorite={toggleFavorite}
              onTogglePin={togglePin}
              onToggleArchive={toggleArchive}
              onDelete={handleDelete}
              onEdit={openEditModal}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Prompt">
        <PromptForm
          initialValues={editingPrompt}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel="Save Changes"
        />
      </Modal>
    </div>
  );
};

export default Categories;