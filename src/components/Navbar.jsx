import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import {
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

// Fixed: Point all links to the nested /dashboard/ routes
const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/", label: "Explore" },
  { to: "/dashboard/prompts", label: "My Prompts" },
  { to: "/dashboard/favorites", label: "Favorites" },
  { to: "/dashboard/categories", label: "Categories" },
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Safely resolve avatar URL whether Cloudinary, malformed, or local file
  const getAvatarUrl = (url) => {
    if (!url) return null;

    let cleanUrl = url.trim();

    // Fix missing colon if present ("https//res.cloudinary.com" -> "https://res.cloudinary.com")
    if (cleanUrl.startsWith("https//")) {
      cleanUrl = cleanUrl.replace("https//", "https://");
    } else if (cleanUrl.startsWith("http//")) {
      cleanUrl = cleanUrl.replace("http//", "http://");
    }

    // If it's a Cloudinary or external web URL, return it directly
    if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://") || cleanUrl.includes("cloudinary.com")) {
      if (!cleanUrl.startsWith("http")) {
        return `https://${cleanUrl.replace(/^\/+/, "")}`;
      }
      return cleanUrl;
    }

    // Otherwise, prepend the backend host for local disk uploads
    const backendBase = import.meta.env.VITE_API_BASE_URL || "https://promptarium-backend.onrender.com";
    return `${backendBase.replace(/\/$/, "")}/${cleanUrl.replace(/^\//, "")}`;
  };

  const avatarUrl = getAvatarUrl(user?.profile_image_url);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles size={18} />
          </div>
          <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
            Promptarium
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-1">
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-800/80 p-1 pr-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="h-7 w-7 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user?.username || user?.email}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300">
                      {user?.username?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                  {user?.username || user?.email?.split("@")[0]}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] px-4 pt-2 pb-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 text-xs font-bold ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            {isAuthenticated ? (
              <div className="flex items-center justify-between pt-1">
                <Link
                  to="/dashboard/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold uppercase">
                        {user?.username?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {user?.username || "Account"}
                    </p>
                    <p className="text-[10px] text-slate-500">{user?.email}</p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="p-2 rounded-xl text-rose-600 dark:text-rose-400"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
