import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for CRUD operations

// Fetch all coupons
export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`coupons/all`);

      return response.data; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch coupons");
    }
  }
);

// Create a new coupon
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`coupons/create`, couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
  }
);

// Update an existing coupon
export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async ({ id, couponData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`coupons/update/${id}`, couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update coupon");
    }
  }
);

// Delete a coupon
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`coupons/delete/${id}`);
      return id; // Return the ID to remove it from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete coupon");
    }
  }
);

// Initial state
const initialState = {
  coupons: [],
  loading: false,
  error: null,
};

// Create the slice
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    // Handle fetchCoupons
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createCoupon
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateCoupon
    builder
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coupons.findIndex(
          (coupon) => coupon._id === action.payload._id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle deleteCoupon
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default couponSlice.reducer;
