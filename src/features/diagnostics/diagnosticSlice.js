import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDiagnosticAPI,
  getAllDiagnosticsAPI,
  getDiagnosticByIdAPI,
  updateDiagnosticAPI,
  deleteDiagnosticAPI,
} from "./diagnosticAPI";

/* ======================= THUNKS ======================= */

// Create Diagnostic
export const createDiagnostic = createAsyncThunk(
  "diagnostic/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createDiagnosticAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get All Diagnostics
export const fetchAllDiagnostics = createAsyncThunk(
  "diagnostic/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllDiagnosticsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Diagnostic By ID
export const fetchDiagnosticById = createAsyncThunk(
  "diagnostic/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getDiagnosticByIdAPI(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Diagnostic
export const updateDiagnostic = createAsyncThunk(
  "diagnostic/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateDiagnosticAPI({ id, formData });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Diagnostic
export const deleteDiagnostic = createAsyncThunk(
  "diagnostic/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDiagnosticAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ======================= SLICE ======================= */

const diagnosticSlice = createSlice({
  name: "diagnostic",
  initialState: {
    diagnostics: [],
    diagnostic: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearDiagnosticState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- CREATE ---------- */
      .addCase(createDiagnostic.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDiagnostic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.diagnostics.unshift(action.payload);
      })
      .addCase(createDiagnostic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAllDiagnostics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDiagnostics.fulfilled, (state, action) => {
        state.loading = false;
        state.diagnostics = action.payload;
      })
      .addCase(fetchAllDiagnostics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH BY ID ---------- */
      .addCase(fetchDiagnosticById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiagnosticById.fulfilled, (state, action) => {
        state.loading = false;
        state.diagnostic = action.payload;
      })
      .addCase(fetchDiagnosticById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateDiagnostic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDiagnostic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.diagnostics = state.diagnostics.map((diag) =>
          diag._id === action.payload._id ? action.payload : diag
        );
      })
      .addCase(updateDiagnostic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteDiagnostic.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDiagnostic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.diagnostics = state.diagnostics.filter(
          (diag) => diag._id !== action.payload
        );
      })
      .addCase(deleteDiagnostic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDiagnosticState } = diagnosticSlice.actions;
export default diagnosticSlice.reducer;
