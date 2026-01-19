import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// --- Thunks ---

export const fetchServices = createAsyncThunk('services/fetchAll', async (_, thunkAPI) => {
  try {
    const { data } = await API.get('/admin/services');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const addService = createAsyncThunk('services/add', async (serviceData, thunkAPI) => {
  try {
    const { data } = await API.post('/admin/services', serviceData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteService = createAsyncThunk('services/delete', async (id, thunkAPI) => {
  try {
    await API.delete(`/admin/services/${id}`);
    return id; // Return the ID so we can filter it out of the state
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// --- Slice ---

const serviceSlice = createSlice({
  name: 'services',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Service
      .addCase(addService.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete Service
      .addCase(deleteService.fulfilled, (state, action) => {
        // Remove the item with the matching ID from the state
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  }
});

export default serviceSlice.reducer;