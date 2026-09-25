import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, Compass, LogOut } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Prompts", to: "/dashboard/prompts" },
  { label: "Favorites", to: "/dashboard/favorites" },
  { label: "Categories", to: "/dashboard/categories" },
  { label: "Settings", to: "/dashboard/settings" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const photoUrl = user?.profile_image_url
    ? `${import.meta.env.VITE_API_BASE_URL}${user.profile_image_url}`
    : null;

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none">
              Promptarium
            </span>
            <span className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              Every prompt, ready when you are
            </span>
          </div>
        </NavLink>

        {/* Center Pill Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200/70 dark:border-slate-800">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`
            }
          >
            <Compass size={14} /> Explore
          </NavLink>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="h-8 w-8 rounded-full ring-1 ring-slate-200 dark:ring-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                {photoUrl ? (
                  <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                    {(user?.username || user?.email || "U")[0]}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
                {user?.username || user?.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-2 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19]">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Compass size={16} /> Explore
          </NavLink>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/dashboard"}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl text-left mt-2 border-t border-slate-200 dark:border-slate-800 pt-3"
            >
              <LogOut size={16} /> Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;