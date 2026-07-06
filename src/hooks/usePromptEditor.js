import { useState } from "react";

export const usePromptEditor = ({ addPrompt, updatePrompt, deletePrompt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);

  const openCreateModal = () => {
    setEditingPrompt(null);
    setIsModalOpen(true);
  };

  const openEditModal = (prompt) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPrompt(null);
  };

  const handleSubmit = (formData) => {
    if (editingPrompt) {
      updatePrompt(editingPrompt.id, formData);
    } else if (addPrompt) {
      addPrompt(formData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this prompt? This cannot be undone.");
    if (confirmed) {
      deletePrompt(id);
    }
  };

  return {
    isModalOpen,
    editingPrompt,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  };
};