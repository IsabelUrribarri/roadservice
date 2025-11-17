import api from "./api";

export const getUnits = () => api.get("/vehicles").then(res => res.data);
export const addUnit = (data) => api.post("/vehicles", data);
export const updateUnit = (id, data) => api.put(`/vehicles/${id}`, data);
export const deleteUnit = (id) => api.delete(`/vehicles/${id}`);
export const getUnit = (id) => api.get(`/vehicles/${id}`).then(res => res.data);

