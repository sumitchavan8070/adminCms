// Slice/feedbacksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  feedbacks: [],
  loading: false,
  error: null,
};

// Fetch feedbacks
export const fetchFeedbacks = createAsyncThunk(
  "feedbacks/fetchFeedbacks",
  async () => {
    const response = await axios.get("/feedback");
    console.log("Responce " + JSON.stringify(response.data));

    return response.data;
  }
);

// Delete feedback
export const deleteFeedback = createAsyncThunk(
  "feedbacks/deleteFeedback",
  async (id) => {
    await axios.delete(`/feedback/${id}`);
    return id;
  }
);

// Reply to feedback
export const replyToFeedback = createAsyncThunk(
  "feedbacks/replyToFeedback",
  async ({ id, reply }) => {
    const response = await axios.patch(`/feedback/${id}/reply`, { reply });
    return response.data;
  }
);

export const updateFeedbackInterest = createAsyncThunk(
  "feedback/updateInterest",
  async ({ feedbackId, isInterested }, { rejectWithValue }) => {
    console.log(feedbackId);

    try {
      const response = await axios.put(`/feedback/${feedbackId}/interest`, {
        isInterested,
      });
      return response.data.feedback;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload
        );
      })
      .addCase(replyToFeedback.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex(
          (feedback) => feedback._id === action.payload._id
        );
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })

      .addCase(updateFeedbackInterest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFeedbackInterest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.feedbacks.findIndex(
          (feedback) => feedback._id === action.payload._id
        );
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })
      .addCase(updateFeedbackInterest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbacksSlice.reducer;
