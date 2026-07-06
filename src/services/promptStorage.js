const STORAGE_KEY = "promptvault_prompts";

export const getStoredPrompts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read prompts from storage:", error);
    return [];
  }
};

export const setStoredPrompts = (prompts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  } catch (error) {
    console.error("Failed to save prompts to storage:", error);
  }
};