// src/slices/categoriesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("/getall-cat"); // Update with your API endpoint
    console.log("---" + JSON.stringify(response));
    return response.data;
  }
);

export const addSubcategory = createAsyncThunk(
  "categories/addSubcategory",
  async ({ categoryId, subcategory }) => {
    const response = await axios.post(`/add-subcategory/${categoryId}`, {
      subCatName: subcategory,
    });
    return response.data;
  }
);

export const updateSubcategory = createAsyncThunk(
  "categories/updateSubcategory",
  async ({ categoryId, subcategoryId, subcategory }) => {
    const response = await axios.put(
      `/api/categories/${categoryId}/subcategories/${subcategoryId}`,
      { subcategory }
    );
    return response.data;
  }
);

export const deleteSubcategory = createAsyncThunk(
  "categories/deleteSubcategory",
  async ({ categoryId, subcategoryId }) => {
    await axios.delete(
      `/api/categories/${categoryId}/subcategories/${subcategoryId}`
    );
    return { categoryId, subcategoryId };
  }
);

export const addYear = createAsyncThunk(
  "categories/addYear",
  async ({ categoryId, subcategoryId, year }) => {
    const response = await axios.post(
      `/api/categories/${categoryId}/subcategories/${subcategoryId}/years`,
      { year }
    );
    return response.data;
  }
);

export const updateYear = createAsyncThunk(
  "categories/updateYear",
  async ({ yearId, year }) => {
    const response = await axios.put(`/api/years/${yearId}`, { year });
    return response.data;
  }
);

export const deleteYear = createAsyncThunk(
  "categories/deleteYear",
  async ({ yearId }) => {
    await axios.delete(`/api/years/${yearId}`);
    return { yearId };
  }
);

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat._id === action.payload.categoryId
        );
        if (category) {
          category.subcategories.push(action.payload);
        }
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat._id === action.payload.categoryId
        );
        if (category) {
          const subcategoryIndex = category.subcategories.findIndex(
            (sub) => sub._id === action.payload._id
          );
          if (subcategoryIndex !== -1) {
            category.subcategories[subcategoryIndex] = action.payload;
          }
        }
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat._id === action.payload.categoryId
        );
        if (category) {
          category.subcategories = category.subcategories.filter(
            (sub) => sub._id !== action.payload.subcategoryId
          );
        }
      })
      .addCase(addYear.fulfilled, (state, action) => {
        const category = state.categories.find(
          (cat) => cat._id === action.payload.categoryId
        );
        if (category) {
          const subcategory = category.subcategories.find(
            (sub) => sub._id === action.payload.subcategoryId
          );
          if (subcategory) {
            subcategory.years.push(action.payload);
          }
        }
      })
      .addCase(updateYear.fulfilled, (state, action) => {
        state.categories.forEach((category) => {
          category.subcategories.forEach((subcategory) => {
            const yearIndex = subcategory.years.findIndex(
              (year) => year._id === action.payload._id
            );
            if (yearIndex !== -1) {
              subcategory.years[yearIndex] = action.payload;
            }
          });
        });
      })
      .addCase(deleteYear.fulfilled, (state, action) => {
        state.categories.forEach((category) => {
          category.subcategories.forEach((subcategory) => {
            subcategory.years = subcategory.years.filter(
              (year) => year._id !== action.payload.yearId
            );
          });
        });
      });
  },
});

export default subCategoriesSlice.reducer;
