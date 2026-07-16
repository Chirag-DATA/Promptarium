import { useMemo } from "react";
import { usePrompts } from "../hooks/usePrompts";
import { usePromptEditor } from "../hooks/usePromptEditor";
import Modal from "../components/Modal";
import PromptForm from "../components/PromptForm";
import PromptCard from "../components/PromptCard";

const Favorites = () => {
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
    error,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  } = usePromptEditor({ updatePrompt, deletePrompt });

  const favoritePrompts = useMemo(() => {
    return prompts.filter((prompt) => prompt.isFavorite && !prompt.isArchived);
  }, [prompts]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Favorites</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {favoritePrompts.length} favorite prompt{favoritePrompts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {favoritePrompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No favorites yet. Star a prompt from the Prompts page to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritePrompts.map((prompt) => (
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
        {error && (
          <p className="mb-3 text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-md px-3 py-2">
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
    </div>
  );
};

export default Favorites;