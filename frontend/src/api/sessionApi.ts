import axiosInstance from "./axiosInstance";

export const getPublishedSessions = () => axiosInstance.get("/sessions");
export const getMySessions = () => axiosInstance.get("/my-sessions");
export const getMySessionById = (id: string) => axiosInstance.get(`/my-sessions/${id}`);
export const saveDraft = (data: any) => axiosInstance.post("/my-sessions/save-draft", data);
export const publishSession = (data: any) => axiosInstance.post("/my-sessions/publish", data);
