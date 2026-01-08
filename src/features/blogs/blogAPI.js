import axiosInstance from "../../utils/axiosInstance";

// Create Blog (multipart/form-data)
export const createBlogAPI = async (formData) => {
  const { data } = await axiosInstance.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Get all blogs
export const getAllBlogsAPI = async () => {
  const { data } = await axiosInstance.get("/blogs");
  return data;
};

// Get blog by slug
export const getBlogBySlugAPI = async (slug) => {
  const { data } = await axiosInstance.get(`/blogs/${slug}`);
  return data;
};

// Update blog (multipart/form-data)
export const updateBlogAPI = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete blog
export const deleteBlogAPI = async (id) => {
  const { data } = await axiosInstance.delete(`/blogs/${id}`);
  return data;
};
