import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import * as promptService from "../services/promptService";

export const PromptsContext = createContext(null);

export const PromptsProvider = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPrompts = useCallback(async () => {
    if (!isAuthenticated) {
      setPrompts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await promptService.fetchPrompts();
      setPrompts(data);
    } catch (err) {
      console.error("Failed to load prompts:", err);
      setPrompts([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      loadPrompts();
    }
  }, [authLoading, isAuthenticated, loadPrompts]);

  const addPrompt = useCallback(async (formData) => {
    const newPrompt = await promptService.createPrompt(formData);
    setPrompts((prev) => [newPrompt, ...prev]);
    return newPrompt;
  }, []);

  const updatePrompt = useCallback(async (id, updates) => {
    const updated = await promptService.updatePromptApi(id, updates);
    setPrompts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const deletePrompt = useCallback(async (id) => {
    await promptService.deletePromptApi(id);
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    (id) => {
      const prompt = prompts.find((p) => p.id === id);
      if (!prompt) return;
      return updatePrompt(id, { isFavorite: !prompt.isFavorite });
    },
    [prompts, updatePrompt]
  );

  const togglePin = useCallback(
    (id) => {
      const prompt = prompts.find((p) => p.id === id);
      if (!prompt) return;
      return updatePrompt(id, { isPinned: !prompt.isPinned });
    },
    [prompts, updatePrompt]
  );

  const toggleArchive = useCallback(
    (id) => {
      const prompt = prompts.find((p) => p.id === id);
      if (!prompt) return;
      return updatePrompt(id, { isArchived: !prompt.isArchived });
    },
    [prompts, updatePrompt]
  );

  const togglePublic = useCallback(
    (id) => {
      const prompt = prompts.find((p) => p.id === id);
      if (!prompt) return;
      return updatePrompt(id, { isPublic: !prompt.isPublic });
    },
    [prompts, updatePrompt]
  );

  const importPrompts = useCallback(async (newPrompts) => {
    const results = await Promise.allSettled(
      newPrompts.map((p) => promptService.createPrompt(p))
    );
    const succeeded = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value);
    const failedCount = results.filter((r) => r.status === "rejected").length;

    if (succeeded.length > 0) {
      setPrompts((prev) => [...succeeded, ...prev]);
    }
    return { importedCount: succeeded.length, failedCount };
  }, []);

  return (
    <PromptsContext.Provider
      value={{
        prompts,
        isLoading,
        addPrompt,
        updatePrompt,
        deletePrompt,
        toggleFavorite,
        togglePin,
        toggleArchive,
        togglePublic,
        importPrompts,
        refetch: loadPrompts,
      }}
    >
      {children}
    </PromptsContext.Provider>
  );
};