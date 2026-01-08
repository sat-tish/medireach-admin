import axiosInstance from "../../utils/axiosInstance";

// Create diagnostic (multipart/form-data)
export const createDiagnosticAPI = async (formData) => {
  const { data } = await axiosInstance.post("/diagnostics", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Get all diagnostics
export const getAllDiagnosticsAPI = async () => {
  const { data } = await axiosInstance.get("/diagnostics");
  return data;
};

// Get diagnostic by ID
export const getDiagnosticByIdAPI = async (id) => {
  const { data } = await axiosInstance.get(`/diagnostics/id/${id}`);
  return data;
};

// Update diagnostic (multipart/form-data)
export const updateDiagnosticAPI = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(`/diagnostics/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete diagnostic
export const deleteDiagnosticAPI = async (id) => {
  const { data } = await axiosInstance.delete(`/diagnostics/${id}`);
  return data;
};
