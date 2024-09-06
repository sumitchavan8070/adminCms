// slices/donationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API base URL

// Thunks for CRUD operations
export const fetchDonations = createAsyncThunk(
  "donations/fetchDonations",
  async () => {
    const response = await axios.get(`donation/donations`);
    return response.data.donations;
  }
);

export const fetchDonationsByUserEmail = createAsyncThunk(
  "donations/fetchDonationsByUserEmail",
  async (email) => {
    const response = await axios.get(`donation/donations/user/${email}`);
    return response.data.donations;
  }
);

export const createDonation = createAsyncThunk(
  "donations/createDonation",
  async (donation) => {
    const response = await axios.post(`donation/donate`, donation);
    return response.data;
  }
);

export const updateDonation = createAsyncThunk(
  "donations/updateDonation",
  async ({ id, donation }) => {
    const response = await axios.put(`donation/donations/${id}`, donation);
    return response.data.donation;
  }
);

export const deleteDonation = createAsyncThunk(
  "donations/deleteDonation",
  async (id) => {
    const response = await axios.delete(`donation/donations/${id}`);
    return id;
  }
);

// Initial state
const initialState = {
  donations: [],
  loading: false,
  error: null,
};

// Create slice
const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDonationsByUserEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonationsByUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonationsByUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donations.push(action.payload);
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDonation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.donations.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) {
          state.donations[index] = action.payload;
        }
      })
      .addCase(updateDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = state.donations.filter(
          (d) => d._id !== action.payload
        );
      })
      .addCase(deleteDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default donationSlice.reducer;
