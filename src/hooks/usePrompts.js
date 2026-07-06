import { useState, useEffect, useCallback } from "react";
import { getStoredPrompts, setStoredPrompts } from "../services/promptStorage";

export const usePrompts = () => {
  const [prompts, setPrompts] = useState(getStoredPrompts);

  useEffect(() => {
    setStoredPrompts(prompts);
  }, [prompts]);

  const addPrompt = useCallback((promptData) => {
    const now = new Date().toISOString();

    const newPrompt = {
      id: crypto.randomUUID(),
      title: promptData.title,
      prompt: promptData.prompt,
      category: promptData.category,
      tags: promptData.tags || [],
      description: promptData.description || "",
      aiModel: promptData.aiModel || "Other",
      isFavorite: false,
      isPinned: false,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    };

    setPrompts((prev) => [newPrompt, ...prev]);
    return newPrompt;
  }, []);

  const updatePrompt = useCallback((id, updates) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? { ...prompt, ...updates, updatedAt: new Date().toISOString() }
          : prompt
      )
    );
  }, []);

  const deletePrompt = useCallback((id) => {
    setPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
  }, []);

  const duplicatePrompt = useCallback((id) => {
    setPrompts((prev) => {
      const original = prev.find((prompt) => prompt.id === id);
      if (!original) return prev;

      const now = new Date().toISOString();
      const duplicate = {
        ...original,
        id: crypto.randomUUID(),
        title: `${original.title} (Copy)`,
        isPinned: false,
        createdAt: now,
        updatedAt: now,
      };

      return [duplicate, ...prev];
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? { ...prompt, isFavorite: !prompt.isFavorite, updatedAt: new Date().toISOString() }
          : prompt
      )
    );
  }, []);

  const togglePin = useCallback((id) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? { ...prompt, isPinned: !prompt.isPinned, updatedAt: new Date().toISOString() }
          : prompt
      )
    );
  }, []);

  const toggleArchive = useCallback((id) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? { ...prompt, isArchived: !prompt.isArchived, updatedAt: new Date().toISOString() }
          : prompt
      )
    );
  }, []);

  const importPrompts = useCallback((newPrompts) => {
  setPrompts((prev) => [...newPrompts, ...prev]);
}, []);

  return {
  prompts,
  addPrompt,
  updatePrompt,
  deletePrompt,
  duplicatePrompt,
  toggleFavorite,
  togglePin,
  toggleArchive,
  importPrompts,
};
};