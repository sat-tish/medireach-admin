import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createHospitalAPI,
  getAllHospitalsAPI,
  getHospitalByIdAPI,
  updateHospitalAPI,
  deleteHospitalAPI,
} from "./hospitalAPI";

/* ======================= THUNKS ======================= */

// Create Hospital
export const createHospital = createAsyncThunk(
  "hospital/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createHospitalAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get All Hospitals
export const fetchAllHospitals = createAsyncThunk(
  "hospital/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllHospitalsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Hospital By ID
export const fetchHospitalById = createAsyncThunk(
  "hospital/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getHospitalByIdAPI(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Hospital
export const updateHospital = createAsyncThunk(
  "hospital/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateHospitalAPI({ id, formData });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Hospital
export const deleteHospital = createAsyncThunk(
  "hospital/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteHospitalAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ======================= SLICE ======================= */

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    hospitals: [],
    hospital: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearHospitalState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- CREATE ---------- */
      .addCase(createHospital.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hospitals.unshift(action.payload);
      })
      .addCase(createHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAllHospitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(fetchAllHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH BY ID ---------- */
      .addCase(fetchHospitalById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHospitalById.fulfilled, (state, action) => {
        state.loading = false;
        state.hospital = action.payload;
      })
      .addCase(fetchHospitalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateHospital.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hospitals = state.hospitals.map((hosp) =>
          hosp._id === action.payload._id ? action.payload : hosp
        );
      })
      .addCase(updateHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteHospital.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hospitals = state.hospitals.filter(
          (hosp) => hosp._id !== action.payload
        );
      })
      .addCase(deleteHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHospitalState } = hospitalSlice.actions;
export default hospitalSlice.reducer;
