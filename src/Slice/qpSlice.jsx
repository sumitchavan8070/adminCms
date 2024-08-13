import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const qpSlice = createSlice({
  name: "qp",
  initialState: {
    questionPaperData: [],
  },
});
