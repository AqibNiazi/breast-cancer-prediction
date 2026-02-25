import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const healthCheck = () => api.get("/health");

export const getFeatures = () => api.get("/v1/features");

export const getSampleInput = () => api.get("/v1/sample");

export const predict = (features) => api.post("/v1/predict", { features });

export default api;
