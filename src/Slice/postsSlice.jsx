// Slice/postsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Thunks for async operations
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("/posts/get-all-posts");
  return response.data;
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  const response = await axios.post("/posts/create-post", post);
  return response.data;
});

export const approvePost = createAsyncThunk(
  "posts/approvePost",
  async (postId) => {
    const response = await axios.put(`/posts/${postId}/approve`);
    return response.data;
  }
);

export const rejectPost = createAsyncThunk(
  "posts/rejectPost",
  async (postId) => {
    const response = await axios.put(`/posts/${postId}/reject`);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await axios.delete(`/posts/${postId}`);
    return postId;
  }
);

// New Thunks for Undo Actions
export const undoApprovePost = createAsyncThunk(
  "posts/undoApprovePost",
  async (postId) => {
    const response = await axios.put(`/posts/${postId}/undo-approve`);
    return response.data;
  }
);

export const undoRejectPost = createAsyncThunk(
  "posts/undoRejectPost",
  async (postId) => {
    const response = await axios.put(`/posts/${postId}/undo-reject`);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData) => {
    console.log("Post data" + JSON.stringify(postData));

    const { _id, ...rest } = postData;
    const response = await axios.put(`/posts/${_id}`, rest);
    return response.data;
  }
);

// Create slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      // Approve Post
      .addCase(approvePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // Reject Post
      .addCase(rejectPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })

      // Undo Approve Post
      .addCase(undoApprovePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // Undo Reject Post
      .addCase(undoRejectPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      });
  },
});

export default postsSlice.reducer;
