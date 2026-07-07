import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const NAV_LINKS = [
  { label: "Dashboard", to: "/" },
  { label: "Prompts", to: "/prompts" },
  { label: "Favorites", to: "/favorites" },
  { label: "Categories", to: "/categories" },
  { label: "Settings", to: "/settings" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between h-16">
        <NavLink to="/" className="flex flex-col justify-center">
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
              end={link.to === "/"}
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
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-md border border-gray-300 dark:border-gray-700 px-2.5 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 pb-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
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
          <button
            type="button"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white text-left w-fit"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;