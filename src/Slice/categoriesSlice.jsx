import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../GlobalStrings/globalStrings";

axios.defaults.baseURL = SERVER_URL; // Update with your API base URL

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("/getall-cat"); // Update with your API endpoint
    // console.log("cat" + JSON.stringify(response));

    return response.data;
  }
);
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category) => {
    const response = await axios.put(`/update-cat/${category._id}`, category); // Update with your API endpoint
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId) => {
    ///delete-cat
    await axios.delete(`/delete-cat/${categoryId}`); // Update with your API endpoint
    // console.log("recived delete entry" + categoryId);
    return categoryId;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category) => {
    const response = await axios.post("/create-cat", category); // Update with your API endpoint
    return response.data;
  }
);

export const fetchCategoriesWithSubcategoriesAndYears = createAsyncThunk(
  "categories/fetchCategoriesWithSubcategoriesAndYears",
  async () => {
    const response = await axios.get(
      "/categories-with-subcategories-and-years"
    );
    return response.data;
  }
);

export const addSubcategory = createAsyncThunk(
  "categories/addSubcategory",
  async ({ categoryId, subCatName }) => {
    const response = await axios.post(`/add-subcategory/${categoryId}`, {
      subCatName,
    });
    window.location.reload(); // Reload the page after a successful edit
    return response.data;
  }
);

// Add year
export const addYear = createAsyncThunk(
  "categories/addYear",
  async ({ categoryId, subcategoryId, QPYear }) => {
    console.log(categoryId, subcategoryId, QPYear);

    const response = await axios.post(
      `/add-year/${categoryId}/${subcategoryId}`,
      { QPYear }
    );
    window.location.reload(); // Reload the page after a successful edit

    return response.data;
  }
);

export const editSubcategory = createAsyncThunk(
  "categories/editSubcategory",
  async ({ categoryId, subCatName, subCategoryId }) => {
    console.log(categoryId, subCatName, subCategoryId);

    const response = await axios.put(
      `/update-subcategory/${categoryId}/${subCategoryId}`,
      { subCatName }
    );
    window.location.reload(); // Reload the page after a successful edit

    return response.data;
  }
);

export const editYear = createAsyncThunk(
  "categories/editYear",
  async ({ yearId, QPYear }) => {
    console.log(yearId, QPYear);

    const response = await axios.put(`/update-year/${yearId}`, { QPYear });
    window.location.reload(); // Reload the page after a successful edit
    return response.data;
  }
);

export const createExamEntry = createAsyncThunk(
  "examEntries/createExamEntry",
  async ({ categoryId, subCatName, year }) => {
    const response = await axios.post("/create-exam-entry", {
      categoryId,
      subCatName,
      year,
    });
    window.location.reload(); // Reload the page after a successful edit
    // console.log("------------->" + JSON.stringify(response));

    return response.data;
  }
);

// Async thunk for deleting a year
export const deleteYear = createAsyncThunk(
  "categories/deleteYear",
  async (yearId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/delete-year-with-paper/${yearId}`);
      // const response = await axios.delete(`/delete-year/${yearId}`);
      // window.location.reload(); // Reload the page after a successful edit
      console.log("delete year " + JSON.stringify(response));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a subcategory
export const deleteSubcategory = createAsyncThunk(
  "categories/deleteSubcategory",
  async ({ categoryId, subCategoryId, yearId }) => {
    console.log("cat : " + categoryId, subCategoryId);
    // const response = await axios.delete(
    //   `/remove-subcategory/${categoryId}/${subCategoryId}`
    // );
    // const response = await axios.delete(
    //   `//delete-subcategory-with-paper/${subCategoryId}`
    // );
    const response = await axios.delete("/delete-subcategory-with-paper", {
      data: { subCategoryId, yearId },
    });
    window.location.reload(); // Reload the page after a successful edit
    console.log("delete sub " + JSON.stringify(response));
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(fetchCategories.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.categories = action.payload;
      // })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(updateCategory.fulfilled, (state, action) => {
      //   const updatedCategory = action.payload;
      //   const existingCategory = state.categories.find(
      //     (category) => category._id === updatedCategory._id
      //   );
      //   if (existingCategory) {
      //     Object.assign(existingCategory, updatedCategory);
      //   }
      // })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.map((category, index) => ({
          ...category,
          index, // Assign index based on position in array
        }));
        state.status = "succeeded";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const existingCategory = state.categories.find(
          (category) => category._id === updatedCategory._id
        );
        if (existingCategory) {
          Object.assign(existingCategory, updatedCategory);
          existingCategory.index = updatedCategory.index;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(fetchCategoriesWithSubcategoriesAndYears.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoriesWithSubcategoriesAndYears.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.categories = action.payload;
        }
      )
      .addCase(
        fetchCategoriesWithSubcategoriesAndYears.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addCase(addSubcategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newSubcategory = action.payload;
        const category = state.categories.find(
          (cat) => cat._id === newSubcategory.catId
        );
        if (category) {
          category.subcategories.push(newSubcategory);
        }
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newYear = action.payload.year;
        const category = state.categories.find(
          (cat) => cat._id === newYear.catId
        );
        if (category) {
          const subCategory = category.subcategories.find(
            (subCat) => subCat._id === newYear.subCatId
          );
          if (subCategory) {
            subCategory.years.push(newYear);
          }
        }
      })
      .addCase(addYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editSubcategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSubcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedSubcategory = action.payload;
        const category = state.categories.find(
          (cat) => cat._id === updatedSubcategory._id
        );
        if (category) {
          const subCategoryIndex = category.subcategories.findIndex(
            (subCat) => subCat._id === updatedSubcategory._id
          );
          if (subCategoryIndex !== -1) {
            category.subcategories[subCategoryIndex] = updatedSubcategory;
          }
        }
      })
      .addCase(editSubcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedYear = action.payload;
        const category = state.categories.find(
          (cat) => cat._id === updatedYear.catId
        );
        if (category) {
          const subCategory = category.subcategories.find(
            (subCat) => subCat._id === updatedYear.year._id
          );
          if (subCategory) {
            const yearIndex = subCategory.years.findIndex(
              (year) => year._id === updatedYear.year._id
            );
            if (yearIndex !== -1) {
              subCategory.years[yearIndex] = updatedYear;
            }
          }
        }
      })
      .addCase(editYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createExamEntry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createExamEntry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(createExamEntry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteYear.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) => ({
          ...category,
          subcategories: category.subcategories.map((subcategory) => ({
            ...subcategory,
            years: subcategory.years.filter(
              (year) => year._id !== action.meta.arg
            ),
          })),
        }));
        state.status = "succeeded";
      })
      .addCase(deleteYear.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle delete subcategory
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) => ({
          ...category,
          subcategories: category.subcategories.filter(
            (subcategory) => subcategory._id !== action.meta.arg
          ),
        }));
        state.status = "succeeded";
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.status = "failed";
        console.log("payload" + JSON.stringify(action));

        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
