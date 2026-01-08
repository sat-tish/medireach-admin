import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlogAPI,
  getAllBlogsAPI,
  getBlogBySlugAPI,
  updateBlogAPI,
  deleteBlogAPI,
} from "./blogAPI";

/* ======================= THUNKS ======================= */

// Create Blog
export const createBlog = createAsyncThunk(
  "blog/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createBlogAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get All Blogs
export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllBlogsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Blog By Slug
export const fetchBlogBySlug = createAsyncThunk(
  "blog/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await getBlogBySlugAPI(slug);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Blog
export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateBlogAPI({ id, formData });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Blog
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBlogAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ======================= SLICE ======================= */

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBlogState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- CREATE ---------- */
      .addCase(createBlog.pending, (state) => {
        state.blogsLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.success = true;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.blogsLoading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAllBlogs.pending, (state) => {
        state.blogsLoading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH BY SLUG ---------- */
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.blogsLoading = true;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.blogsLoading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateBlog.pending, (state) => {
        state.blogsLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.success = true;
        state.blogs = state.blogs.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.blogsLoading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteBlog.pending, (state) => {
        state.blogsLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.success = true;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.blogsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBlogState } = blogSlice.actions;
export default blogSlice.reducer;
