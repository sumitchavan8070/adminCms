import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for fetching, approving, rejecting, undoing approval, and undoing rejection of polls
export const fetchPolls = createAsyncThunk("polls/fetchPolls", async () => {
  const response = await axios.get("/polls");
  // console.log(JSON.stringify(response));
  return response.data.polls;
});

export const approvePoll = createAsyncThunk(
  "polls/approvePoll",
  async (pollId) => {
    const response = await axios.put(`/polls/${pollId.postId}`, {
      approved: true,
    });
    return response.data.poll;
  }
);

export const rejectPoll = createAsyncThunk(
  "polls/rejectPoll",
  async (pollId) => {
    const response = await axios.put(`/polls/${pollId.postId}`, {
      approved: false,
      rejected: true,
    });
    return response.data.poll;
  }
);

export const undoApproval = createAsyncThunk(
  "polls/undoApproval",
  async (pollId) => {
    const response = await axios.put(`/polls/${pollId.postId}`, {
      approved: false,
    });
    return response.data.poll;
  }
);

export const undoReject = createAsyncThunk(
  "polls/undoReject",
  async (pollId) => {
    const response = await axios.put(`/polls/${pollId.postId}`, {
      rejected: false,
    });
    return response.data.poll;
  }
);

export const deletePoll = createAsyncThunk(
  "polls/deletePoll",
  async (pollId) => {
    await axios.delete(`/polls/${pollId}`);
    return pollId;
  }
);

// Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    console.log("userid" + userId);

    const response = await axios.get(`/getUser/${userId}`);
    return response.data.user;
  }
);

const pollsSlice = createSlice({
  name: "polls",
  initialState: {
    polls: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Polls
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = action.payload;
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Approve Poll
      .addCase(approvePoll.pending, (state) => {
        state.loading = true;
      })
      .addCase(approvePoll.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = state.polls.map((poll) =>
          poll._id === action.payload._id ? action.payload : poll
        );
      })
      .addCase(approvePoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Reject Poll
      .addCase(rejectPoll.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectPoll.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = state.polls.map((poll) =>
          poll._id === action.payload._id ? action.payload : poll
        );
      })
      .addCase(rejectPoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Undo Approval
      .addCase(undoApproval.pending, (state) => {
        state.loading = true;
      })
      .addCase(undoApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = state.polls.map((poll) =>
          poll._id === action.payload._id ? action.payload : poll
        );
      })
      .addCase(undoApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Undo Rejection
      .addCase(undoReject.pending, (state) => {
        state.loading = true;
      })
      .addCase(undoReject.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = state.polls.map((poll) =>
          poll._id === action.payload._id ? action.payload : poll
        );
      })
      .addCase(undoReject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) // Delete Poll
      .addCase(deletePoll.fulfilled, (state, action) => {
        state.polls = state.polls.filter((poll) => poll._id !== action.payload);
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.users[action.payload._id] = action.payload;
      });
  },
});

export default pollsSlice.reducer;
