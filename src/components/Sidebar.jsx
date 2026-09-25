import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Star, FolderOpen, Settings } from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Prompts", icon: FileText, to: "/dashboard/prompts" },
  { label: "Favorites", icon: Star, to: "/dashboard/favorites" },
  { label: "Categories", icon: FolderOpen, to: "/dashboard/categories" },
  { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-[#F8FAFC]/60 dark:bg-[#0B0F19]/60 backdrop-blur-xs h-[calc(100vh-4rem)] sticky top-16 transition-colors">
      <nav className="flex flex-col gap-1.5 p-4">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700/80"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`
              }
            >
              <Icon size={16} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;