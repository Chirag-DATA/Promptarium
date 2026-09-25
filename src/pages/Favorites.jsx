import { useMemo } from "react";
import { usePrompts } from "../hooks/usePrompts";
import { usePromptEditor } from "../hooks/usePromptEditor";
import { usePromptViewer } from "../hooks/usePromptViewer";
import Modal from "../components/Modal";
import PromptForm from "../components/PromptForm";
import PromptCard from "../components/PromptCard";
import PromptViewModal from "../components/PromptViewModal";

const Favorites = () => {
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

  const favoritePrompts = useMemo(() => {
    return prompts.filter((prompt) => prompt.isFavorite && !prompt.isArchived);
  }, [prompts]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Favorites</h1>
        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {favoritePrompts.length} starred prompt{favoritePrompts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {favoritePrompts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
            No favorite prompts yet. Star any prompt from your Prompts page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePrompts.map((prompt) => (
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

export default Favorites;