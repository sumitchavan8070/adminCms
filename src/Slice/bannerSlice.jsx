import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { SERVER_URL } from "../GlobalStrings/globalStrings";

axios.defaults.baseURL = SERVER_URL; // Update with your API base URL
// API base URL
const API_BASE_URL = SERVER_URL; // Update with your actual base URL

// Async Thunks for API calls
export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/banner/`);
    return response.data;
  }
);

export const uploadBanner = createAsyncThunk(
  "banners/uploadBanner",
  async (bannerData) => {
    const formData = new FormData();
    formData.append("coverImage", bannerData.coverImage);
    if (bannerData.cornerLabelText) {
      formData.append("cornerLabelText", bannerData.cornerLabelText);
    }
    if (bannerData.cornerLabelColor) {
      formData.append("cornerLabelColor", bannerData.cornerLabelColor);
    }
    const response = await axios.post(
      `${API_BASE_URL}/banner/upload-banner`,
      formData
    );
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (id) => {
    await axios.delete(`${API_BASE_URL}/banner/${id}`);
    return id;
  }
);

// Slice
const bannerSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadBanner.fulfilled, (state, action) => {
        state.banners.push(action.payload);
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter(
          (banner) => banner._id !== action.payload
        );
      });
  },
});

export default bannerSlice.reducer;
