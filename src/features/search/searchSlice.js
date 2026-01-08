import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

/* -------------------- THUNK: AUTOCOMPLETE SEARCH -------------------- */
export const fetchSearchSuggestions = createAsyncThunk(
  "search/fetchSuggestions",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/search/autocomplete", {
        params, // { q, addressCity, suburbArea }
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Search failed");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    suggestions: [],
    loading: false,
    error: null,
    showDropdown: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.showDropdown = false;
    },
    toggleDropdown: (state, action) => {
      state.showDropdown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload || [];
        state.showDropdown = true;
      })
      .addCase(fetchSearchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, clearSuggestions, toggleDropdown } =
  searchSlice.actions;

export default searchSlice.reducer;
