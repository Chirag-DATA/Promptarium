import { useState } from "react";
import { PROMPT_CATEGORIES, AI_MODELS } from "../constants/promptCategories";
import TagInput from "./TagInput";
import EnhancePromptPanel from "./EnhancePromptPanel";

const getInitialFormState = (initialValues) => ({
  title: initialValues?.title || "",
  prompt: initialValues?.prompt || "",
  category: initialValues?.category || PROMPT_CATEGORIES[0],
  tags: initialValues?.tags || [],
  description: initialValues?.description || "",
  aiModel: initialValues?.aiModel || AI_MODELS[0],
});

const PromptForm = ({ initialValues, onSubmit, onCancel, submitLabel = "Save Prompt" }) => {
  const [formData, setFormData] = useState(() => getInitialFormState(initialValues));
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.prompt.trim()) {
      newErrors.prompt = "Prompt content is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. SQL Query Optimizer"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Prompt
        </label>
        <textarea
          value={formData.prompt}
          onChange={(e) => handleChange("prompt", e.target.value)}
          rows={5}
          placeholder="Write the actual prompt content here..."
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prompt
          </label>
          <textarea 
            value={formData.prompt}
            onChange={(e) => handleChange("prompt", e.target.value)}
            rows={5}
            placeholder="Write the actual prompt content here..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {errors.prompt && (
            <p className="mt-1 text-xs text-red-500">{errors.prompt}</p>
          )}
        </div>

        <EnhancePromptPanel
          promptText={formData.prompt}
          onApply={(enhancedText) => handleChange("prompt", enhancedText)}
        />


        {errors.prompt && (
          <p className="mt-1 text-xs text-red-500">{errors.prompt}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PROMPT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            AI Model
          </label>
          <select
            value={formData.aiModel}
            onChange={(e) => handleChange("aiModel", e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            {AI_MODELS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tags
        </label>
        <TagInput
          tags={formData.tags}
          onChange={(newTags) => handleChange("tags", newTags)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={2}
          placeholder="Short note about when/why to use this prompt"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;