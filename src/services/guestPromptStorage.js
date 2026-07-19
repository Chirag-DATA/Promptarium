const STORAGE_KEY = "promptarium_guest_prompts";

export const getGuestPrompts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read guest prompts:", error);
    return [];
  }
};

export const setGuestPrompts = (prompts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  } catch (error) {
    console.error("Failed to save guest prompts:", error);
  }
};

export const buildGuestPrompt = (formData) => {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: formData.title,
    prompt: formData.prompt,
    category: formData.category,
    tags: formData.tags || [],
    description: formData.description || "",
    aiModel: formData.aiModel || "Other",
    isFavorite: false,
    isPinned: false,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };
};