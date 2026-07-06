import { usePrompts } from "../hooks/usePrompts";
import { usePromptFilters } from "../hooks/usePromptFilters";
import { usePromptEditor } from "../hooks/usePromptEditor";
import Modal from "../components/Modal";
import PromptForm from "../components/PromptForm";
import PromptCard from "../components/PromptCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ExportMenu from "../components/ExportMenu";
import ImportButton from "../components/ImportButton";

const Prompts = () => {
  const {
    prompts,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    togglePin,
    toggleArchive,
    importPrompts,
  } = usePrompts();

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    visiblePrompts,
    STATUS_FILTERS,
    SORT_OPTIONS,
  } = usePromptFilters(prompts);

  const {
    isModalOpen,
    editingPrompt,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  } = usePromptEditor({ addPrompt, updatePrompt, deletePrompt });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prompts</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {visiblePrompts.length} of {prompts.length} prompts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ImportButton onImport={importPrompts} />
          <ExportMenu prompts={prompts} />
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + New Prompt
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterPanel
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          statusOptions={STATUS_FILTERS}
          sortOptions={SORT_OPTIONS}
        />
      </div>

      {visiblePrompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {prompts.length === 0
              ? "No prompts yet. Create your first one to get started."
              : "No prompts match your current search/filters."}
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPrompt ? "Edit Prompt" : "New Prompt"}
      >
        <PromptForm
          initialValues={editingPrompt}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={editingPrompt ? "Save Changes" : "Create Prompt"}
        />
      </Modal>
    </div>
  );
};

export default Prompts;