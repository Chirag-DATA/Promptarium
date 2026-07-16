import { createContext, useState, useEffect, useCallback } from "react";
import { apiClient, ApiError } from "../services/apiClient";

export const AuthContext = createContext(null);

const TOKEN_KEY = "promptarium_auth_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await apiClient.get("/auth/me");
        setUser(currentUser);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = useCallback(async (email, password) => {
    const formBody = new URLSearchParams();
    formBody.append("username", email);
    formBody.append("password", password);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.detail || "Login failed.", response.status, data);
    }

    localStorage.setItem(TOKEN_KEY, data.access_token);
    setToken(data.access_token);
  }, []);

  const signup = useCallback(async (email, password) => {
    await apiClient.post("/auth/signup", { email, password });
    await login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const updatedUser = await apiClient.patch("/auth/me", updates);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const uploadPhoto = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const updatedUser = await apiClient.postFile("/auth/me/photo", formData);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        uploadPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};