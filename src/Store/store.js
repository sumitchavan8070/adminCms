// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../Slice/categoriesSlice";
import questionPaperReducer from "../Slice/questionPaperSlice";
import subCategoriesReducer from "../Slice/subCategoriesSlice";
import yearsReducer from "../Slice/yearsSlice";
import pdfReducer from "../Slice/pdfSlice";
import bannerReducer from "../Slice/bannerSlice";
import plansReducer from "../Slice/plansSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questionPapers: questionPaperReducer,
    subCategories: subCategoriesReducer,
    years: yearsReducer,
    pdf: pdfReducer,
    banners: bannerReducer,
    plans: plansReducer,
  },
});

export default store;
