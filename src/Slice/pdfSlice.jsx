// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const uploadPdf = createAsyncThunk("pdf/uploadPdf", async (pdf) => {
//   const formData = new FormData();
//   formData.append("pdf", pdf);

//   const response = await axios.post("/upload-pdf", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   console.log("------------" + JSON.stringify(response));

//   return response.data;
// });

// const pdfSlice = createSlice({
//   name: "pdf",
//   initialState: {
//     status: "idle",
//     error: null,
//     extractedTextPath: null,
//     generatedExcelPath: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadPdf.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(uploadPdf.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.extractedTextPath = action.payload.extractedTextPath;
//         state.generatedExcelPath = action.payload.generatedExcelPath;
//       })
//       .addCase(uploadPdf.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default pdfSlice.reducer;

// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadPdf = createAsyncThunk("pdf/uploadPdf", async (pdf) => {
  const formData = new FormData();
  formData.append("pdf", pdf);

  const response = await axios.post("/upload-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("------------" + JSON.stringify(response));

  // Returning response data which includes `extractedText` and `questionsJson`
  return response.data;
});

const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    status: "idle",
    extractedText: "",
    questionsJson: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.extractedText = action.payload.extractedText;
        state.questionsJson = action.payload.questionsJson;
      })
      .addCase(uploadPdf.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default pdfSlice.reducer;
