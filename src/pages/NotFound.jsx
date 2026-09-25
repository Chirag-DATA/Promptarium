import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4">
      <h1 className="text-6xl font-extrabold text-blue-600 tracking-tight">404</h1>
      <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">Page not found</h2>
      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        The prompt or route you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;