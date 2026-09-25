import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Search, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import * as promptService from "../services/promptService";
import PublicPromptCard from "../components/PublicPromptCard";
import PromptViewModal from "../components/PromptViewModal";
import { PROMPT_CATEGORIES, AI_MODELS } from "../constants/promptCategories";

const Explore = () => {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loginAlert, setLoginAlert] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");
  const [sortBy, setSortBy] = useState("most_liked");
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const loadFeed = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await promptService.fetchPublicPrompts(0, 100);
      setPrompts(data);
    } catch (err) {
      setError(err.message || "Failed to load public prompts.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleToggleLike = async (promptId, needsLogin) => {
    if (needsLogin) {
      setLoginAlert(true);
      setTimeout(() => setLoginAlert(false), 3500);
      return;
    }

    try {
      const result = await promptService.toggleLike(promptId);
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === promptId
            ? { ...p, is_liked: result.is_liked, like_count: result.like_count }
            : p
        )
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter((prompt) => {
        const matchesCategory =
          selectedCategory === "all" || prompt.category === selectedCategory;
        const matchesModel =
          selectedModel === "all" || prompt.ai_model === selectedModel;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          prompt.title.toLowerCase().includes(q) ||
          prompt.prompt_text.toLowerCase().includes(q) ||
          (prompt.tags && prompt.tags.some((t) => t.toLowerCase().includes(q)));

        return matchesCategory && matchesModel && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "most_liked") return b.like_count - a.like_count;
        return new Date(b.created_at) - new Date(a.created_at);
      });
  }, [prompts, selectedCategory, selectedModel, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Floating Pill Nav */}
      <header className="sticky top-4 z-30 max-w-6xl mx-auto px-4">
        <div className="rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md px-6 h-14 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
              P
            </div>
            <span className="font-bold tracking-tight text-base text-slate-900 dark:text-slate-100">
              Promptarium
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Go to Workspace
              </Link>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero & Feed */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
            <Sparkles size={13} />
            Nordic Community Repository
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Explore Prompts
          </h1>
          <p className="mt-2.5 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Curated system prompts, workflows, and templates shared by developers and creators.
          </p>
        </div>

        {/* Login Banner */}
        {loginAlert && (
          <div className="mb-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 px-4 py-3 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center justify-between">
            <span>Please log in to like community prompts.</span>
            <Link to="/login" className="underline hover:text-rose-900 dark:hover:text-rose-200">
              Log in now &rarr;
            </Link>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3.5 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, prompt instruction, or #tag..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">All Models</option>
                {AI_MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="most_liked">Most Loved</option>
                <option value="newest">Latest First</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              All Prompts
            </button>
            {PROMPT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-60 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 animate-pulse p-6"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center rounded-3xl border border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 text-sm">
            {error}
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
              No prompts match your selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <PublicPromptCard
                key={prompt.id}
                prompt={prompt}
                onToggleLike={handleToggleLike}
                onSelectPrompt={(p) =>
                  setSelectedPrompt({
                    title: p.title,
                    prompt: p.prompt_text,
                    category: p.category,
                    aiModel: p.ai_model,
                    tags: p.tags,
                  })
                }
              />
            ))}
          </div>
        )}
      </main>

      {selectedPrompt && (
        <PromptViewModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
          onEdit={null}
        />
      )}
    </div>
  );
};

export default Explore;