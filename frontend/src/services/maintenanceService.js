import api from "./api";

export const getMaintenanceRecords = () => api.get("/maintenance").then(res => res.data);
export const addMaintenanceRecord = (data) => api.post("/maintenance", data);
export const updateMaintenanceRecord = (id, data) => api.put(`/maintenance/${id}`, data);
export const deleteMaintenanceRecord = (id) => api.delete(`/maintenance/${id}`);
