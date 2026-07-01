import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh if the refresh request itself fails
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh/"
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/refresh/");

        sessionStorage.setItem("access", response.data.access);

        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return api(originalRequest);
      } catch (err) {
        sessionStorage.removeItem("access");
        localStorage.removeItem("auth");

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
