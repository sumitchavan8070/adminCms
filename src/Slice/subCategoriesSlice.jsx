import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubCategories = createAsyncThunk(
  "subCategories/fetchSubCategories",
  async () => {
    const response = await axios.get("/getall-subcat-year");

    return response.data;
  }
);

export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async () => {
    const response = await axios.get("/subcategories");
    return response.data;
  }
);

export const addSubcategory = createAsyncThunk(
  "subcategories/addSubcategory",
  async (newSubcategory) => {
    const response = await axios.post("/subcategories/create", {
      subcategory: newSubcategory,
    });
    return response.data;
  }
);

export const updateSubcategory = createAsyncThunk(
  "subcategories/updateSubcategory",
  async (updatedSubcategory) => {
    const { id, subcategory } = updatedSubcategory;
    const response = await axios.put(`/subcategories/${id}`, {
      subcategory,
    });
    return response.data;
  }
);

export const deleteSubcategory = createAsyncThunk(
  "subcategories/deleteSubcategory",
  async (subcategoryId) => {
    const response = await axios.delete(`/subcategories/${subcategoryId}`);
    return response.data;
  }
);

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState: {
    subCategories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.subCategories.push(action.payload);
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const index = state.subCategories.findIndex(
          (subCat) => subCat._id === action.payload._id
        );
        if (index !== -1) {
          state.subCategories[index] = action.payload;
        }
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.subCategories = state.subCategories.filter(
          (subCat) => subCat._id !== action.payload._id
        );
      });
  },
});

export default subCategoriesSlice.reducer;
