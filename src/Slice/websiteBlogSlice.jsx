// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// // export const fetchWebsiteBlogs = createAsyncThunk(
// //   "websiteBlog/fetchAll",
// //   async () => {
// //     const response = await axios.get("/website-blogs");
// //     return response.data;
// //   }
// // );

// // export const createWebsiteBlog = createAsyncThunk(
// //   "websiteBlog/create",
// //   async (blogData) => {
// //     const response = await axios.post("/website-blogs", blogData);
// //     return response.data;
// //   }
// // );

// // export const updateWebsiteBlog = createAsyncThunk(
// //   "websiteBlog/update",
// //   async ({ id, blogData }) => {
// //     const response = await axios.put(`/website-blogs/${id}`, blogData);
// //     return response.data;
// //   }
// // );

// // export const deleteWebsiteBlog = createAsyncThunk(
// //   "websiteBlog/delete",
// //   async (id) => {
// //     await axios.delete(`/website-blogs/${id}`);
// //     return id;
// //   }
// // );

// // const websiteBlogSlice = createSlice({
// //   name: "websiteBlog",
// //   initialState: {
// //     items: [],
// //     currentItem: null,
// //     status: "idle",
// //     error: null,
// //   },
// //   reducers: {
// //     setCurrentWebsiteBlog: (state, action) => {
// //       state.currentItem = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchWebsiteBlogs.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(fetchWebsiteBlogs.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.items = action.payload;
// //       })
// //       .addCase(createWebsiteBlog.fulfilled, (state, action) => {
// //         state.items.push(action.payload);
// //       })
// //       .addCase(updateWebsiteBlog.fulfilled, (state, action) => {
// //         const index = state.items.findIndex(
// //           (item) => item._id === action.payload._id
// //         );
// //         if (index !== -1) state.items[index] = action.payload;
// //       })
// //       .addCase(deleteWebsiteBlog.fulfilled, (state, action) => {
// //         state.items = state.items.filter((item) => item._id !== action.payload);
// //       });
// //   },
// // });

// // export const { setCurrentWebsiteBlog } = websiteBlogSlice.actions;
// // export default websiteBlogSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchWebsiteBlogs = createAsyncThunk(
//   "websiteBlog/fetchAll",
//   async () => {
//     const response = await axios.get("/website-blogs");
//     return response.data;
//   }
// );

// export const fetchWebsiteBlogTags = createAsyncThunk(
//   "websiteBlog/fetchTags",
//   async () => {
//     const response = await axios.get("/website-blogs/tags");
//     return response.data;
//   }
// );

// export const createWebsiteBlog = createAsyncThunk(
//   "websiteBlog/create",
//   async (blogData) => {
//     const response = await axios.post("/website-blogs", blogData);
//     return response.data;
//   }
// );

// export const updateWebsiteBlog = createAsyncThunk(
//   "websiteBlog/update",
//   async ({ id, blogData }) => {
//     const response = await axios.put(`/website-blogs/${id}`, blogData);
//     return response.data;
//   }
// );

// export const deleteWebsiteBlog = createAsyncThunk(
//   "websiteBlog/delete",
//   async (id) => {
//     await axios.delete(`/website-blogs/${id}`);
//     return id;
//   }
// );

// const websiteBlogSlice = createSlice({
//   name: "websiteBlog",
//   initialState: {
//     items: [],
//     tags: [],
//     currentItem: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     setCurrentWebsiteBlog: (state, action) => {
//       state.currentItem = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWebsiteBlogs.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchWebsiteBlogs.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchWebsiteBlogTags.fulfilled, (state, action) => {
//         state.tags = action.payload;
//       })
//       .addCase(createWebsiteBlog.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//         state.tags = Array.from(
//           new Set([...state.tags, ...action.payload.tags])
//         );
//       })
//       .addCase(updateWebsiteBlog.fulfilled, (state, action) => {
//         const index = state.items.findIndex(
//           (item) => item._id === action.payload._id
//         );
//         if (index !== -1) {
//           state.items[index] = action.payload;
//           state.tags = Array.from(
//             new Set([...state.tags, ...action.payload.tags])
//           );
//         }
//       })
//       .addCase(deleteWebsiteBlog.fulfilled, (state, action) => {
//         state.items = state.items.filter((item) => item._id !== action.payload);
//       })
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.status = "failed";
//           state.error = action.error.message;
//         }
//       );
//   },
// });

// export const { setCurrentWebsiteBlog } = websiteBlogSlice.actions;
// export default websiteBlogSlice.reducer;

// features/website/websiteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createBlog = createAsyncThunk(
  "website/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post("/blogs/blogs", blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "website/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/blogs/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "website/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post("/blogs/categories", categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTags = createAsyncThunk(
  "website/getTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/blogs/tags");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTag = createAsyncThunk(
  "website/createTag",
  async (tagName, { rejectWithValue }) => {
    try {
      const response = await api.post("/blogs/tags", { name: tagName });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const websiteBlogSlice = createSlice({
  name: "website",
  initialState: {
    blogs: [],
    categories: [],
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      });
  },
});

export default websiteBlogSlice.reducer;
