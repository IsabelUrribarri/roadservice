import api from "./api";

export const getInventoryItems = () => api.get("/inventory").then(res => res.data);
export const addInventoryItem = (data) => api.post("/inventory", data);
export const updateInventoryItem = (id, data) => api.put(`/inventory/${id}`, data);
export const deleteInventoryItem = (id) => api.delete(`/inventory/${id}`);
