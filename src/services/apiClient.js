const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const TOKEN_KEY = "promptarium_auth_token";

let onTokenRefreshHandler = null;

export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const registerRefreshHandler = (handler) => {
  onTokenRefreshHandler = handler;
};

const request = async (endpoint, options = {}, isRetry = false) => {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // Required for cross-origin refresh cookie transmission
  });

  if (response.status === 401 && !isRetry && onTokenRefreshHandler) {
    const refreshed = await onTokenRefreshHandler();
    if (refreshed) {
      return request(endpoint, options, true);
    }
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data;
};

export const apiClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  patch: (endpoint, body, options) =>
    request(endpoint, { ...options, method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" }),

  postFile: async (endpoint, formData) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
      credentials: "include",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = data?.detail || `Upload failed with status ${response.status}`;
      throw new ApiError(message, response.status, data);
    }

    return data;
  },
};