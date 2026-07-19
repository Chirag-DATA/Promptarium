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
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[1px_0_3px_rgba(0,0,0,0.03)] h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex flex-col gap-1 p-4">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;