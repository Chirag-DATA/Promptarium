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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Dashboard
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Overview of your prompt vault, statistics, and category distribution.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Prompts" value={stats.total} icon={<FileText size={18} />} />
        <StatCard label="Favorites" value={stats.favorites} icon={<Star size={18} />} />
        <StatCard label="Pinned" value={stats.pinned} icon={<Pin size={18} />} />
        <StatCard label="Archived" value={stats.archived} icon={<Archive size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-6 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Recent Prompts
          </h2>
          <RecentPromptsList prompts={recentPrompts} />
        </div>

        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] p-6 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Prompts by Category
          </h2>
          <CategoryBreakdown categoryCounts={categoryCounts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;