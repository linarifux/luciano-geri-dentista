import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchPatients = createAsyncThunk(
  'patients/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get('/admin/patients');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => { state.loading = true; })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientSlice.reducer;