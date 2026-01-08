import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDoctorAPI,
  getAllDoctorsAPI,
  getDoctorByIdAPI,
  updateDoctorAPI,
  deleteDoctorAPI,
} from "./doctorAPI";

/* ======================= THUNKS ======================= */

// Create Doctor
export const createDoctor = createAsyncThunk(
  "doctor/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createDoctorAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get All Doctors
export const fetchAllDoctors = createAsyncThunk(
  "doctor/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllDoctorsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Doctor By ID
export const fetchDoctorById = createAsyncThunk(
  "doctor/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getDoctorByIdAPI(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Doctor
export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateDoctorAPI({ id, formData });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Doctor
export const deleteDoctor = createAsyncThunk(
  "doctor/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoctorAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ======================= SLICE ======================= */

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    doctor: null,
    loading: false,     // ✅ standardized name
    error: null,
    success: false,
  },
  reducers: {
    clearDoctorState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- CREATE ---------- */
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors.unshift(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH BY ID ---------- */
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors = state.doctors.map((doc) =>
          doc._id === action.payload._id ? action.payload : doc
        );
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors = state.doctors.filter(
          (doc) => doc._id !== action.payload
        );
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorState } = doctorSlice.actions;
export default doctorSlice.reducer;
