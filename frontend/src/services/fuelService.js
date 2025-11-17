import api from "./api";

// Obtener todos los registros de combustible
export const getFuelRecords = () => api.get("/fuel").then(res => res.data);

// Crear un nuevo registro de combustible
export const addFuelRecord = (data) => api.post("/fuel", data);

// Actualizar un registro de combustible existente
export const updateFuelRecord = (id, data) => api.put(`/fuel/${id}`, data);

// Eliminar un registro de combustible
export const deleteFuelRecord = (id) => api.delete(`/fuel/${id}`);
