import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createClinicAPI,
  getAllClinicsAPI,
  getClinicByIdAPI,
  updateClinicAPI,
  deleteClinicAPI,
} from "./clinicAPI";

/* ======================= THUNKS ======================= */

// Create Clinic
export const createClinic = createAsyncThunk(
  "clinic/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createClinicAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get All Clinics
export const fetchAllClinics = createAsyncThunk(
  "clinic/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllClinicsAPI();
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Clinic By ID
export const fetchClinicById = createAsyncThunk(
  "clinic/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getClinicByIdAPI(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Clinic
export const updateClinic = createAsyncThunk(
  "clinic/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateClinicAPI({ id, formData });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Clinic
export const deleteClinic = createAsyncThunk(
  "clinic/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteClinicAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ======================= SLICE ======================= */

const clinicSlice = createSlice({
  name: "clinic",
  initialState: {
    clinics: [],
    clinic: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearClinicState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- CREATE ---------- */
      .addCase(createClinic.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClinic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clinics.unshift(action.payload);
      })
      .addCase(createClinic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAllClinics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllClinics.fulfilled, (state, action) => {
        state.loading = false;
        state.clinics = action.payload;
      })
      .addCase(fetchAllClinics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH BY ID ---------- */
      .addCase(fetchClinicById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClinicById.fulfilled, (state, action) => {
        state.loading = false;
        state.clinic = action.payload;
      })
      .addCase(fetchClinicById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateClinic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClinic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clinics = state.clinics.map((cln) =>
          cln._id === action.payload._id ? action.payload : cln
        );
      })
      .addCase(updateClinic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteClinic.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClinic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clinics = state.clinics.filter(
          (cln) => cln._id !== action.payload
        );
      })
      .addCase(deleteClinic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearClinicState } = clinicSlice.actions;
export default clinicSlice.reducer;
