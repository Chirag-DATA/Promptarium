import { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Loader2, Compass, Sun, Moon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

const Login = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header Bar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-6 lg:px-12 h-16 flex items-center justify-between z-20">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl font-black tracking-tight text-blue-500 uppercase">
              PROMPT<span className="text-white">ARIUM</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <NavLink to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Compass size={14} /> Explore Feed
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link
            to="/signup"
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Split Body Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Hero Pane */}
        <div className="relative lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 bg-slate-950 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-lg">
            <span className="text-4xl sm:text-5xl font-black text-blue-500 tracking-tight uppercase">
              PROMPT<span className="text-white">ARIUM</span>
            </span>

            <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Welcome back to your ultimate prompt workspace.
            </h2>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Pick up right where you left off. Organize, refine, and deploy production-ready prompts across all your favorite AI models.
            </p>

            <div className="mt-10 flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span>FastAPI + PostgreSQL</span>
              <span>•</span>
              <span>Gemini AI Ready</span>
              <span>•</span>
              <span>Cloud Synced</span>
            </div>
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white dark:bg-[#0B0F19] transition-colors">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Sign In
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
                Access your account to start managing and running prompts.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 p-3.5 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] px-4 pr-11 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm py-3.5 px-4 shadow-sm shadow-blue-500/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                New to the platform?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;