import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSuccessStoryAPI,
  getAllSuccessStoriesAPI,
  getSuccessStoryBySlugAPI,
  updateSuccessStoryAPI,
  deleteSuccessStoryAPI,
} from "./successStoriesAPI";

/* -------------------- THUNKS -------------------- */

// Create
export const createSuccessStory = createAsyncThunk(
  "successStory/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await createSuccessStoryAPI(formData, token);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create success story"
      );
    }
  }
);

// Get All
export const fetchAllSuccessStories = createAsyncThunk(
  "successStory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllSuccessStoriesAPI();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch success stories"
      );
    }
  }
);

// Get by Slug
export const fetchSuccessStoryBySlug = createAsyncThunk(
  "successStory/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await getSuccessStoryBySlugAPI(slug);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch success story"
      );
    }
  }
);

// Update
export const updateSuccessStory = createAsyncThunk(
  "successStory/update",
  async ({ id, formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await updateSuccessStoryAPI(id, formData, token);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update success story"
      );
    }
  }
);

// Delete
export const deleteSuccessStory = createAsyncThunk(
  "successStory/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await deleteSuccessStoryAPI(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete success story"
      );
    }
  }
);

/* -------------------- SLICE -------------------- */

const successStorySlice = createSlice({
  name: "successStory",
  initialState: {
    stories: [],
    story: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearSuccessStoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* -------- CREATE -------- */
      .addCase(createSuccessStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSuccessStory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stories.unshift(action.payload);
      })
      .addCase(createSuccessStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- GET ALL -------- */
      .addCase(fetchAllSuccessStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSuccessStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload.data;
      })
      .addCase(fetchAllSuccessStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- GET BY SLUG -------- */
      .addCase(fetchSuccessStoryBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuccessStoryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload;
      })
      .addCase(fetchSuccessStoryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- UPDATE -------- */
      .addCase(updateSuccessStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSuccessStory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stories = state.stories.map((story) =>
          story._id === action.payload._id ? action.payload : story
        );
      })
      .addCase(updateSuccessStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- DELETE -------- */
      .addCase(deleteSuccessStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSuccessStory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stories = state.stories.filter(
          (story) => story._id !== action.payload
        );
      })
      .addCase(deleteSuccessStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessStoryState } = successStorySlice.actions;

export default successStorySlice.reducer;
