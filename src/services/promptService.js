import { apiClient } from "./apiClient";

const mapFromApi = (apiPrompt) => ({
  id: apiPrompt.id,
  title: apiPrompt.title,
  prompt: apiPrompt.prompt_text,
  category: apiPrompt.category,
  tags: apiPrompt.tags || [],
  description: apiPrompt.description || "",
  aiModel: apiPrompt.ai_model,
  isFavorite: apiPrompt.is_favorite,
  isPinned: apiPrompt.is_pinned,
  isArchived: apiPrompt.is_archived,
  createdAt: apiPrompt.created_at,
  updatedAt: apiPrompt.updated_at,
});

const mapToApiCreate = (formData) => ({
  title: formData.title,
  prompt_text: formData.prompt,
  category: formData.category,
  tags: formData.tags || [],
  description: formData.description || "",
  ai_model: formData.aiModel || "Other",
});

const UPDATE_FIELD_MAP = {
  title: "title",
  prompt: "prompt_text",
  category: "category",
  tags: "tags",
  description: "description",
  aiModel: "ai_model",
  isFavorite: "is_favorite",
  isPinned: "is_pinned",
  isArchived: "is_archived",
};

const mapToApiUpdate = (updates) => {
  const payload = {};
  Object.entries(updates).forEach(([key, value]) => {
    const apiKey = UPDATE_FIELD_MAP[key];
    if (apiKey && value !== undefined) {
      payload[apiKey] = value;
    }
  });
  return payload;
};

export const fetchPrompts = async () => {
  const data = await apiClient.get("/prompts/");
  return data.map(mapFromApi);
};

export const createPrompt = async (formData) => {
  const created = await apiClient.post("/prompts/", mapToApiCreate(formData));
  return mapFromApi(created);
};

export const updatePromptApi = async (id, updates) => {
  const updated = await apiClient.patch(`/prompts/${id}`, mapToApiUpdate(updates));
  return mapFromApi(updated);
};

export const deletePromptApi = async (id) => {
  await apiClient.delete(`/prompts/${id}`);
};