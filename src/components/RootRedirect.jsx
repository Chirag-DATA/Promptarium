import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/signup"} replace />;
};

export default RootRedirect;