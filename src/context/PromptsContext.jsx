import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import * as promptService from "../services/promptService";
import { getGuestPrompts, setGuestPrompts, buildGuestPrompt } from "../services/guestPromptStorage";

export const PromptsContext = createContext(null);

export const PromptsProvider = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPrompts = useCallback(async () => {
    setIsLoading(true);

    if (isAuthenticated) {
      try {
        const data = await promptService.fetchPrompts();
        setPrompts(data);
      } catch (err) {
        console.error("Failed to load prompts:", err);
        setPrompts([]);
      }
    } else {
      setPrompts(getGuestPrompts());
    }

    setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      loadPrompts();
    }
  }, [authLoading, isAuthenticated, loadPrompts]);

  const addPrompt = useCallback(
    async (formData) => {
      if (isAuthenticated) {
        const newPrompt = await promptService.createPrompt(formData);
        setPrompts((prev) => [newPrompt, ...prev]);
        return newPrompt;
      }

      const newPrompt = buildGuestPrompt(formData);
      setPrompts((prev) => {
        const updated = [newPrompt, ...prev];
        setGuestPrompts(updated);
        return updated;
      });
      return newPrompt;
    },
    [isAuthenticated]
  );

  const updatePrompt = useCallback(
    async (id, updates) => {
      if (isAuthenticated) {
        const updated = await promptService.updatePromptApi(id, updates);
        setPrompts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      }

      let updatedPrompt;
      setPrompts((prev) => {
        const updatedList = prev.map((p) => {
          if (p.id !== id) return p;
          updatedPrompt = { ...p, ...updates, updatedAt: new Date().toISOString() };
          return updatedPrompt;
        });
        setGuestPrompts(updatedList);
        return updatedList;
      });
      return updatedPrompt;
    },
    [isAuthenticated]
  );

  const deletePrompt = useCallback(
    async (id) => {
      if (isAuthenticated) {
        await promptService.deletePromptApi(id);
        setPrompts((prev) => prev.filter((p) => p.id !== id));
        return;
      }

      setPrompts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        setGuestPrompts(updated);
        return updated;
      });
    },
    [isAuthenticated]
  );

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

  const importPrompts = useCallback(
    async (newPrompts) => {
      if (isAuthenticated) {
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
      }

      const built = newPrompts.map((p) => buildGuestPrompt(p));
      setPrompts((prev) => {
        const updated = [...built, ...prev];
        setGuestPrompts(updated);
        return updated;
      });
      return { importedCount: built.length, failedCount: 0 };
    },
    [isAuthenticated]
  );

  return (
    <PromptsContext.Provider
      value={{
        prompts,
        isLoading,
        isAuthenticated,
        addPrompt,
        updatePrompt,
        deletePrompt,
        toggleFavorite,
        togglePin,
        toggleArchive,
        importPrompts,
        refetch: loadPrompts,
      }}
    >
      {children}
    </PromptsContext.Provider>
  );
};