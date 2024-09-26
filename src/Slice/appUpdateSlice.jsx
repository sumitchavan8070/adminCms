import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  updates: [],
  status: "idle",
  error: null,
};

// Thunks
export const fetchUpdates = createAsyncThunk(
  "appUpdate/fetchUpdates",
  async () => {
    const response = await axios.get("/app-updates/get");
    return response.data;
  }
);

export const createUpdate = createAsyncThunk(
  "appUpdate/createUpdate",
  async (update) => {
    const response = await axios.post("/app-update/create", update);
    return response.data;
  }
);

export const updateUpdate = createAsyncThunk(
  "appUpdate/updateUpdate",
  async ({ id, update }) => {
    const response = await axios.put(`/app-update/${id}`, update);
    return response.data;
  }
);

export const deleteUpdate = createAsyncThunk(
  "appUpdate/deleteUpdate",
  async (id) => {
    await axios.delete(`/app-update/${id}`);
    return id;
  }
);

// Slice
const appUpdateSlice = createSlice({
  name: "appUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updates = action.payload;
      })
      .addCase(fetchUpdates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createUpdate.fulfilled, (state, action) => {
        state.updates.push(action.payload);
      })
      .addCase(updateUpdate.fulfilled, (state, action) => {
        const index = state.updates.findIndex(
          (update) => update._id === action.payload._id
        );
        if (index !== -1) {
          state.updates[index] = action.payload;
        }
      })
      .addCase(deleteUpdate.fulfilled, (state, action) => {
        state.updates = state.updates.filter(
          (update) => update._id !== action.payload
        );
      });
  },
});

export default appUpdateSlice.reducer;
