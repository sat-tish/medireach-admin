import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("api=", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
