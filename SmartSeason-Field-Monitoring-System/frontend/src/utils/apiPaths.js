import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios instance with base URL and auth header injection
const api = axios.create({ baseURL: BASE_URL });

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  FIELDS: {
    ADD_FIELD: "/fields",
    GET_ALL_FIELDS: "/fields",
    GET_FIELD: (id) => `/fields/${id}`,
    UPDATE_FIELD: (id) => `/fields/${id}`,
    DELETE_FIELD: (id) => `/fields/${id}`,
    META_AGENTS: "/fields/meta/agents",
    META_CROPS: "/fields/meta/crops",
  },
  CROPS: {
    ADD_CROP: "/crops",
    GET_ALL_CROPS: "/crops",
    GET_CROP: (id) => `/crops/${id}`,
    UPDATE_CROP: (id) => `/crops/${id}`,
    DELETE_CROP: (id) => `/crops/${id}`,
  },
  USERS: {
    GET_ALL_AGENTS: "/users/agents",
    CREATE_USER: "/users",
  }
};

export default api;
