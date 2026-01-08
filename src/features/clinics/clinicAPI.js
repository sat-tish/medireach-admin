import axiosInstance from "../../utils/axiosInstance";

// Create clinic (multipart/form-data)
export const createClinicAPI = async (formData) => {
  const { data } = await axiosInstance.post("/clinics", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Get all clinics
export const getAllClinicsAPI = async () => {
  const { data } = await axiosInstance.get("/clinics");
  console.log(data);
  return data;
};

// Get clinic by ID
export const getClinicByIdAPI = async (id) => {
  const { data } = await axiosInstance.get(`/clinics/id/${id}`);
  return data;
};

// Update clinic (multipart/form-data)
export const updateClinicAPI = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(`/clinics/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete clinic
export const deleteClinicAPI = async (id) => {
  const { data } = await axiosInstance.delete(`/clinics/${id}`);
  return data;
};
