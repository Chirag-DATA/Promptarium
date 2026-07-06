const isValidPromptShape = (item) => {
  return (
    item &&
    typeof item.title === "string" &&
    item.title.trim() !== "" &&
    typeof item.prompt === "string" &&
    item.prompt.trim() !== ""
  );
};

export const parseImportedPrompts = (fileContent) => {
  let parsed;

  try {
    parsed = JSON.parse(fileContent);
  } catch {
    return { success: false, error: "File is not valid JSON.", prompts: [] };
  }

  if (!Array.isArray(parsed)) {
    return { success: false, error: "JSON file must contain an array of prompts.", prompts: [] };
  }

  const validPrompts = parsed.filter(isValidPromptShape);
  const skippedCount = parsed.length - validPrompts.length;

  if (validPrompts.length === 0) {
    return { success: false, error: "No valid prompts found in the file.", prompts: [] };
  }

  const now = new Date().toISOString();
  const sanitizedPrompts = validPrompts.map((item) => ({
    id: crypto.randomUUID(),
    title: item.title,
    prompt: item.prompt,
    category: item.category || "Programming",
    tags: Array.isArray(item.tags) ? item.tags : [],
    description: item.description || "",
    aiModel: item.aiModel || "Other",
    isFavorite: false,
    isPinned: false,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  }));

  return { success: true, prompts: sanitizedPrompts, skippedCount };
};