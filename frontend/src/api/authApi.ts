import axiosInstance from "./axiosInstance";

export const loginUser = (email: string, password: string) =>
  axiosInstance.post("/auth/login", { email, password });

export const registerUser = (email: string, password: string) =>
  axiosInstance.post("/auth/register", { email, password });
