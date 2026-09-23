import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Compass } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import * as promptService from "../services/promptService";
import PublicPromptCard from "../components/PublicPromptCard";

const Explore = () => {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loginPrompt, setLoginPrompt] = useState(false);

  const loadFeed = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await promptService.fetchPublicPrompts();
      setPrompts(data);
    } catch (err) {
      setError(err.message || "Failed to load the public feed.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleToggleLike = async (promptId, needsLogin) => {
    if (needsLogin) {
      setLoginPrompt(true);
      setTimeout(() => setLoginPrompt(false), 3000);
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

  return (
    <div className="min-h-screen bg-[#F5F5F3] dark:bg-gray-950">
      <nav className="sticky top-0 z-20 backdrop-blur-md bg-[#F5F5F3]/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">Promptarium</span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md border border-gray-300 dark:border-gray-700 p-2 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Log In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-2">
          <Compass size={22} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Prompts</h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Public prompts shared by the Promptarium community.
        </p>

        {loginPrompt && (
          <div className="mb-6 rounded-md bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
            <Link to="/login" className="underline font-medium">Log in</Link> to like prompts.
          </div>
        )}

        {isLoading ? (
          <p className="text-sm text-gray-400">Loading public prompts...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : prompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No public prompts yet. {isAuthenticated ? "Be the first to share one!" : "Check back soon."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <PublicPromptCard
                key={prompt.id}
                prompt={prompt}
                onToggleLike={handleToggleLike}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;