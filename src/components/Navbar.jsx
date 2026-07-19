import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
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
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const photoUrl = user?.profile_image_url
    ? `${import.meta.env.VITE_API_BASE_URL}${user.profile_image_url}`
    : null;

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between h-16">
        <NavLink to="/dashboard" className="flex flex-col justify-center">
          <span className="text-xl font-bold text-blue-600 leading-tight">
            Promptarium
          </span>
          <span className="hidden sm:block text-[11px] text-gray-400 dark:text-gray-500 leading-tight -mt-0.5">
            Every prompt, ready when you are.
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center shrink-0">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-gray-400">
                    {user?.email?.[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user?.username || user?.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Log Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Log In / Sign Up
            </NavLink>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-md border border-gray-300 dark:border-gray-700 px-2.5 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 pb-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/dashboard"}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center shrink-0">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-semibold text-gray-400">
                      {user?.email?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {user?.username || user?.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 text-left w-fit"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMobileMenu}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white w-fit"
            >
              Log In / Sign Up
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;