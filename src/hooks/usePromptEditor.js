import { useState } from "react";

export const usePromptEditor = ({ addPrompt, updatePrompt, deletePrompt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [error, setError] = useState("");

  const openCreateModal = () => {
    setEditingPrompt(null);
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (prompt) => {
    setEditingPrompt(prompt);
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPrompt(null);
    setError("");
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingPrompt) {
        await updatePrompt(editingPrompt.id, formData);
      } else if (addPrompt) {
        await addPrompt(formData);
      }
      closeModal();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this prompt? This cannot be undone.");
    if (!confirmed) return;

    try {
      await deletePrompt(id);
    } catch (err) {
      alert(err.message || "Failed to delete prompt.");
    }
  };

  return {
    isModalOpen,
    editingPrompt,
    error,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  };
};