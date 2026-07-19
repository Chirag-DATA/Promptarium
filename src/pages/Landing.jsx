import { useNavigate, Link } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F3] dark:bg-gray-950 flex flex-col">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <span className="text-xl font-bold text-blue-600">Promptarium</span>
        <Link
          to="/login"
          className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Log In / Sign Up
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center flex flex-col items-center gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Every prompt, ready when you are.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
            Organize, search, and enhance your AI prompts in one clean workspace.
            Try it instantly, no account needed — or sign up to keep your
            prompts saved across devices.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started Free
            </button>
            <Link
              to="/login"
              className="rounded-md border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Log In / Sign Up
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Trying it free? Your prompts stay on this device until you create an account.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Landing;