import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchServices = createAsyncThunk('services/fetchAll', async (_, thunkAPI) => {
  try {
    const { data } = await API.get('/admin/services');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addService = createAsyncThunk('services/add', async (serviceData, thunkAPI) => {
  try {
    const { data } = await API.post('/admin/services', serviceData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const serviceSlice = createSlice({
  name: 'services',
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default serviceSlice.reducer;