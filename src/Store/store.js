// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../Slice/categoriesSlice";
import questionPaperReducer from "../Slice/questionPaperSlice";
import subCategoriesReducer from "../Slice/subCategoriesSlice";
import yearsReducer from "../Slice/yearsSlice";
import pdfReducer from "../Slice/pdfSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questionPapers: questionPaperReducer,
    subCategories: subCategoriesReducer,
    years: yearsReducer,
    pdf: pdfReducer,
  },
});

export default store;
