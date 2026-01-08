import axiosInstance from "../../utils/axiosInstance";

export const searchAutocompleteAPI = (params) => {
  return axiosInstance.get("/search/autocomplete", { params });
};
