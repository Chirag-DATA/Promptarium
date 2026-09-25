import { usePrompts } from "../hooks/usePrompts";
import { usePromptFilters } from "../hooks/usePromptFilters";
import { usePromptEditor } from "../hooks/usePromptEditor";
import { usePromptViewer } from "../hooks/usePromptViewer";
import Modal from "../components/Modal";
import PromptForm from "../components/PromptForm";
import PromptCard from "../components/PromptCard";
import PromptViewModal from "../components/PromptViewModal";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ExportMenu from "../components/ExportMenu";
import ImportButton from "../components/ImportButton";
import { Plus } from "lucide-react";

const Prompts = () => {
  const {
    prompts,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    togglePin,
    toggleArchive,
    togglePublic,
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
    error,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  } = usePromptEditor({ addPrompt, updatePrompt, deletePrompt });

  const { viewingPrompt, openViewer, closeViewer } = usePromptViewer();

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Prompts
          </h1>
          <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {visiblePrompts.length} of {prompts.length} prompts in your vault
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <ImportButton onImport={importPrompts} />
          <ExportMenu prompts={prompts} />
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold shadow-xs transition-colors"
          >
            <Plus size={15} /> New Prompt
          </button>
        </div>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row gap-3">
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

      {/* Cards list */}
      {visiblePrompts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
            {prompts.length === 0
              ? "Your vault is empty. Click '+ New Prompt' to save your first prompt."
              : "No prompts match your current filters."}
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

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPrompt ? "Edit Prompt" : "Create New Prompt"}
      >
        {error && (
          <p className="mb-3 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-2xl px-3.5 py-2 border border-rose-200 dark:border-rose-900/50">
            {error}
          </p>
        )}
        <PromptForm
          initialValues={editingPrompt}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={editingPrompt ? "Save Changes" : "Create Prompt"}
        />
      </Modal>

      {/* View Modal */}
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

export default Prompts;