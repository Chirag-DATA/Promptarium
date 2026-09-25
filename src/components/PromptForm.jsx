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
  isPublic: initialValues?.isPublic || false,
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
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.prompt.trim()) newErrors.prompt = "Prompt content is required.";
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
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Clean Architecture Reviewer"
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
        {errors.title && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Prompt Content
        </label>
        <textarea
          value={formData.prompt}
          onChange={(e) => handleChange("prompt", e.target.value)}
          rows={5}
          placeholder="Write the full instructions or system prompt..."
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-4 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
        />
        {errors.prompt && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.prompt}</p>}
      </div>

      <EnhancePromptPanel
        promptText={formData.prompt}
        onApply={(enhancedText) => handleChange("prompt", enhancedText)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none"
          >
            {PROMPT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Target AI Model
          </label>
          <select
            value={formData.aiModel}
            onChange={(e) => handleChange("aiModel", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none"
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
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Tags
        </label>
        <TagInput
          tags={formData.tags}
          onChange={(newTags) => handleChange("tags", newTags)}
        />
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] p-3.5">
        <div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Publish to Community Feed
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Allows other users to view and copy this prompt on Explore.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleChange("isPublic", !formData.isPublic)}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
            formData.isPublic ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
          }`}
          aria-pressed={formData.isPublic}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.isPublic ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Description <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={2}
          placeholder="Brief note about when to use this prompt..."
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] px-4 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
        />
      </div>

      <div className="flex justify-end gap-2.5 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;