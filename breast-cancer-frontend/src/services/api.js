import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const healthCheck = () => api.get("/health");
export const getFeatures = () => api.get("/v1/features");
export const getSampleInput = () => api.get("/v1/sample");
export const predict = (features) => api.post("/v1/predict", { features });

export default api;