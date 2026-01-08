import axiosInstance from "../../utils/axiosInstance";

// Create doctor (multipart/form-data)
export const createDoctorAPI = async (formData) => {
  const { data } = await axiosInstance.post("/doctors", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Get all doctors

export const getAllDoctorsAPI = async () => {
  const { data } = await axiosInstance.get("/doctors");
  return data;
};

// Get doctor by ID
export const getDoctorByIdAPI = async (id) => {
  const { data } = await axiosInstance.get(`/doctors/id/${id}`);
  return data;
};

// Update doctor (multipart/form-data)
export const updateDoctorAPI = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(`/doctors/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete doctor
export const deleteDoctorAPI = async (id) => {
  const { data } = await axiosInstance.delete(`/doctors/${id}`);
  return data;
};
