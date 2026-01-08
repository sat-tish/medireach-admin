import axiosInstance from "../../utils/axiosInstance";

/**
 * Login API call
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} response.data
 */
export const loginAPI = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};
