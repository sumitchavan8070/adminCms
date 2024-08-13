import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchYears = createAsyncThunk("years/fetchYears", async () => {
  const response = await axios.get("/getall-subcat-year");
  return response.data;
});

const yearsSlice = createSlice({
  name: "years",
  initialState: {
    years: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYears.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.years = action.payload;
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default yearsSlice.reducer;
