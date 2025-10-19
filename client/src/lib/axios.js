import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Response interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired, clear local storage and redirect to login
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || "";
      if (message.includes("expired") || message.includes("Session expired")) {
        localStorage.removeItem("user");
        // Only redirect if not already on login/signup page
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/signup")
        ) {
          window.location.href = "/login?expired=true";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
