import axiosInstance from "../../utils/axiosInstance";

/* -------------------- CREATE SUCCESS STORY -------------------- */
export const createSuccessStoryAPI = (formData) =>
  axiosInstance.post("/success-stories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* -------------------- GET ALL SUCCESS STORIES -------------------- */
export const getAllSuccessStoriesAPI = () =>
  axiosInstance.get("/success-stories");

/* -------------------- GET SUCCESS STORY BY SLUG -------------------- */
export const getSuccessStoryBySlugAPI = (slug) =>
  axiosInstance.get(`/success-stories/${slug}`);

/* -------------------- UPDATE SUCCESS STORY -------------------- */
export const updateSuccessStoryAPI = (id, formData) =>
  axiosInstance.put(`/success-stories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* -------------------- DELETE SUCCESS STORY -------------------- */
export const deleteSuccessStoryAPI = (id) =>
  axiosInstance.delete(`/success-stories/${id}`);
