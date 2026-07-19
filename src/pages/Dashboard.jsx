import { useMemo } from "react";
import { usePrompts } from "../hooks/usePrompts";
import StatCard from "../components/StatCard";
import RecentPromptsList from "../components/RecentPromptsList";
import CategoryBreakdown from "../components/CategoryBreakdown";
import { FileText, Star, Pin, Archive } from "lucide-react";


const Dashboard = () => {
  const { prompts } = usePrompts();

  const stats = useMemo(() => {
    const activePrompts = prompts.filter((prompt) => !prompt.isArchived);

    return {
      total: activePrompts.length,
      favorites: prompts.filter((prompt) => prompt.isFavorite).length,
      pinned: prompts.filter((prompt) => prompt.isPinned).length,
      archived: prompts.filter((prompt) => prompt.isArchived).length,
    };
  }, [prompts]);

  const recentPrompts = useMemo(() => {
    return [...prompts]
      .filter((prompt) => !prompt.isArchived)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [prompts]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    prompts
      .filter((prompt) => !prompt.isArchived)
      .forEach((prompt) => {
        counts[prompt.category] = (counts[prompt.category] || 0) + 1;
      });
    return counts;
  }, [prompts]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Every prompt, ready when you are.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Prompts" value={stats.total} icon={<FileText size={20} />} />
        <StatCard label="Favorites" value={stats.favorites} icon={<Star size={20} />} />
        <StatCard label="Pinned" value={stats.pinned} icon={<Pin size={20} />} />
        <StatCard label="Archived" value={stats.archived} icon={<Archive size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Recent Prompts
          </h2>
          <RecentPromptsList prompts={recentPrompts} />
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Prompts by Category
          </h2>
          <CategoryBreakdown categoryCounts={categoryCounts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;