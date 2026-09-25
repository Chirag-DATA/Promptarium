import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { apiClient, ApiError, registerRefreshHandler } from "../services/apiClient";

export const AuthContext = createContext(null);

const TOKEN_KEY = "promptarium_auth_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggingOut = useRef(false);

  const refreshAccessToken = useCallback(async () => {
    if (isLoggingOut.current) return false;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        return false;
      }

      const data = await response.json();
      localStorage.setItem(TOKEN_KEY, data.access_token);
      setToken(data.access_token);
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    registerRefreshHandler(refreshAccessToken);
  }, [refreshAccessToken]);

  useEffect(() => {
    const verifyToken = async () => {
      if (isLoggingOut.current) {
        setIsLoading(false);
        return;
      }

      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        try {
          const currentUser = await apiClient.get("/auth/me");
          setUser(currentUser);
          setIsLoading(false);
          return;
        } catch {
          // Token expired, fall through to refresh
        }
      }

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        try {
          const currentUser = await apiClient.get("/auth/me");
          setUser(currentUser);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    verifyToken();
  }, [refreshAccessToken]);

  const login = useCallback(async (email, password) => {
    isLoggingOut.current = false;

    const formBody = new URLSearchParams();
    formBody.append("username", email);
    formBody.append("password", password);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.detail || "Login failed.", response.status, data);
    }

    localStorage.setItem(TOKEN_KEY, data.access_token);
    setToken(data.access_token);

    try {
      const currentUser = await apiClient.get("/auth/me");
      setUser(currentUser);
    } catch (err) {
      console.error("Failed to load user profile during login:", err);
    }
  }, []);

  const signup = useCallback(async (email, password) => {
    isLoggingOut.current = false;
    await apiClient.post("/auth/signup", { email, password });
  }, []);

  const logout = useCallback(async () => {
    isLoggingOut.current = true;

    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    }
  }, []);

  const requestDeleteOtp = useCallback(async () => {
    return await apiClient.post("/auth/delete-account/request-otp", {});
  }, []);

  const confirmDeleteAccount = useCallback(async (otp) => {
    isLoggingOut.current = true;
    try {
      await apiClient.post("/auth/delete-account/confirm", { otp });
      // Only clear storage and user state when the deletion successfully commits
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    } catch (err) {
      isLoggingOut.current = false;
      throw err;
    }
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
        requestDeleteOtp,
        confirmDeleteAccount,
        updateProfile,
        uploadPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};