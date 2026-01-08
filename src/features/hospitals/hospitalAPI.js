import axiosInstance from "../../utils/axiosInstance";

// Create hospital (multipart/form-data)
export const createHospitalAPI = async (formData) => {
  const { data } = await axiosInstance.post("/hospitals", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Get all hospitals
export const getAllHospitalsAPI = async () => {
  const { data } = await axiosInstance.get("/hospitals");
  return data;
};

// Get hospital by ID
export const getHospitalByIdAPI = async (id) => {
  const { data } = await axiosInstance.get(`/hospitals/id/${id}`);
  return data;
};

// Update hospital (multipart/form-data)
export const updateHospitalAPI = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(`/hospitals/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete hospital
export const deleteHospitalAPI = async (id) => {
  const { data } = await axiosInstance.delete(`/hospitals/${id}`);
  return data;
};
