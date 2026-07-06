import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-500">This page doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 text-sm font-medium text-blue-600 hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;