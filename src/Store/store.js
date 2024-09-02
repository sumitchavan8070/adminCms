// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../Slice/categoriesSlice";
import questionPaperReducer from "../Slice/questionPaperSlice";
import subCategoriesReducer from "../Slice/subCategoriesSlice";
import yearsReducer from "../Slice/yearsSlice";
import pdfReducer from "../Slice/pdfSlice";
import bannerReducer from "../Slice/bannerSlice";
import plansReducer from "../Slice/plansSlice";
import pollsReducer from "../Slice/pollsSlice";
import postsReducer from "../Slice/postsSlice"; // Adjust the path if needed
import feedbacksReducer from "../Slice/feedbacksSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questionPapers: questionPaperReducer,
    subCategories: subCategoriesReducer,
    years: yearsReducer,
    pdf: pdfReducer,
    banners: bannerReducer,
    plans: plansReducer,
    polls: pollsReducer,
    posts: postsReducer,
    feedbacks: feedbacksReducer,
  },
});

export default store;
