// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchWebsiteBlogCategories = createAsyncThunk(
//   "websiteBlogCategory/fetchAll",
//   async () => {
//     const response = await axios.get("/api/website-blog-categories");
//     return response.data;
//   }
// );

// export const createWebsiteBlogCategory = createAsyncThunk(
//   "websiteBlogCategory/create",
//   async (categoryData) => {
//     const response = await axios.post(
//       "/api/website-blog-categories",
//       categoryData
//     );
//     return response.data;
//   }
// );

// const websiteBlogCategorySlice = createSlice({
//   name: "websiteBlogCategory",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWebsiteBlogCategories.fulfilled, (state, action) => {
//         state.items = action.payload;
//       })
//       .addCase(createWebsiteBlogCategory.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       });
//   },
// });

// export default websiteBlogCategorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWebsiteBlogCategories = createAsyncThunk(
  "websiteBlogCategory/fetchAll",
  async () => {
    const response = await axios.get("/website-blog-categories");
    return response.data;
  }
);

export const createWebsiteBlogCategory = createAsyncThunk(
  "websiteBlogCategory/create",
  async (categoryData) => {
    const response = await axios.post("/website-blog-categories", categoryData);
    return response.data;
  }
);

export const updateWebsiteBlogCategory = createAsyncThunk(
  "websiteBlogCategory/update",
  async ({ id, categoryData }) => {
    const response = await axios.put(
      `/website-blog-categories/${id}`,
      categoryData
    );
    return response.data;
  }
);

export const deleteWebsiteBlogCategory = createAsyncThunk(
  "websiteBlogCategory/delete",
  async (id) => {
    await axios.delete(`/website-blog-categories/${id}`);
    return id;
  }
);

const websiteBlogCategorySlice = createSlice({
  name: "websiteBlogCategory",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsiteBlogCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWebsiteBlogCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(createWebsiteBlogCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateWebsiteBlogCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteWebsiteBlogCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default websiteBlogCategorySlice.reducer;
