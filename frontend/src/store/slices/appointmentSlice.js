import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from '../../services/adminService';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await adminService.getAppointments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;