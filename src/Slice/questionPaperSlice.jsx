import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../GlobalStrings/globalStrings";

axios.defaults.baseURL = SERVER_URL;

// Fetch question papers with additional data
export const fetchQuestionPaperData = createAsyncThunk(
  "fetchQuestionPaperData",
  async (categoryId) => {
    const response = await axios.get(`/papers/${categoryId}`);
    // console.log("response" + JSON.stringify(response));

    return response.data;
  }
);

// Async thunk to fetch question paper data
export const fetchQuestionPaperDataWithCatIDSubCatIDYearID = createAsyncThunk(
  "questionPaper/fetchQuestionPaperData",
  async ({ catID, subCatID, QPYearID }) => {
    // console.log("catID" + catID);
    // console.log("catID" + subCatID);
    // console.log("catID" + subCatID);

    const response = await axios.get(
      `/question-papers/get-paper-by-cat-subcat-year`,
      {
        params: { catID, subCatID, QPYearID },
      }
    );

    // console.log("Got responce " + JSON.stringify(response.data));

    return response.data;
  }
);

export const createQuestionPaper = createAsyncThunk(
  "createQuestionPaper",
  async (newPaperData) => {
    const response = await axios.post(
      "/api/questionPapers/create-question",
      newPaperData
    );
    return response.data;
  }
);

export const fetchQuestionPapersByFilter = createAsyncThunk(
  "questionPapers/fetchQuestionPapersByFilter",
  async ({ catID, subCatID, QPYearID }) => {
    const response = await axios.post(
      "/api/questionPapers/getQuestionPapersByFilter",
      { catID, subCatID, QPYearID }
    );

    return response.data;
  }
);

// Delete question paper
export const deleteQuestionPaper = createAsyncThunk(
  "questionPapers/deleteQuestionPaper",
  async (paperId) => {
    const response = await axios.delete(`/api/questionPapers/${paperId}`);
    return { paperId, data: response.data };
  }
);

export const updateQuestion = createAsyncThunk(
  "updateQuestion",
  async ({ questionId, updatedData }) => {
    // console.log("updated data =>" + JSON.stringify(updatedData));

    const response = await axios.put(
      `/question-papers/update-question/${questionId}`,
      updatedData
    );

    // console.log("updated data server =>" + JSON.stringify(updatedData));

    return response.data;
  }
);

// Delete a question from a question paper
export const deleteQuestion = createAsyncThunk(
  "questionPapers/deleteQuestion",
  async ({ questionId }) => {
    console.log("questionId" + JSON.stringify(questionId));

    const response = await axios.delete(
      `/question-papers/delete-question/${questionId}`
    );
    console.log("Delete Question Res " + JSON.stringify(response));

    return { questionId };
  }
);

// Async thunk for creating a question
export const createQuestion = createAsyncThunk(
  "questionPaper/createQuestion",
  async (questionData, { rejectWithValue }) => {
    // console.log("posted data " + JSON.stringify(questionData));

    try {
      const response = await axios.post(
        "/question-papers/create-question",
        questionData
      );
      // console.log("response" + JSON.stringify(response));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching subjects
export const fetchSubjects = createAsyncThunk(
  "questionPaper/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("Im in Subject");

      const response = await axios.get("/get-all-subjects");
      // console.log("subjects " + JSON.stringify(response));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching topics
export const fetchTopics = createAsyncThunk(
  "questionPaper/fetchTopics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/get-all-topics");
      // console.log("Topics " + JSON.stringify(response));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadExcel = createAsyncThunk(
  "questionPaper/uploadExcel",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/uploadExcel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const questionPaperSlice = createSlice({
  name: "questionPapers",
  initialState: {
    questionPapers: [],
    filteredQuestionPapers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionPaperData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionPaperData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionPapers = action.payload;
      })
      .addCase(fetchQuestionPaperData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createQuestionPaper.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createQuestionPaper.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionPapers.push(action.payload);
      })
      .addCase(createQuestionPaper.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(updateQuestion.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   const updatedQuestion = action.payload.updatedQuestion;
      //   const paper = state.questionPapers.find((paper) =>
      //     paper.questions.some((q) => q._id === updatedQuestion._id)
      //   );
      //   if (paper) {
      //     const questionIndex = paper.questions.findIndex(
      //       (q) => q._id === updatedQuestion._id
      //     );
      //     if (questionIndex !== -1) {
      //       paper.questions[questionIndex] = updatedQuestion;
      //     }
      //   }
      // })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedQuestion = action.payload;
        const paper = state.questionPapers.find((paper) =>
          paper.questions.some((q) => q._id === updatedQuestion._id)
        );
        if (paper) {
          const questionIndex = paper.questions.findIndex(
            (q) => q._id === updatedQuestion._id
          );
          if (questionIndex !== -1) {
            paper.questions[questionIndex] = updatedQuestion;
          }
        }
      })
      // .addCase(updateQuestion.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const index = state.questionPapers.findIndex(
      //     (question) => question._id === action.payload._id
      //   );
      //   if (index !== -1) {
      //     state.questionPapers[index] = action.payload;
      //   }
      // })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { paperId, questionId } = action.payload;
        const paper = state.questionPapers.find((p) => p._id === paperId);
        if (paper) {
          paper.questions = paper.questions.filter((q) => q._id !== questionId);
        }
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchQuestionPapersByFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionPapersByFilter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredQuestionPapers = action.payload;
      })
      .addCase(fetchQuestionPapersByFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteQuestionPaper.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteQuestionPaper.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionPapers = state.questionPapers.filter(
          (paper) => paper._id !== action.payload.paperId
        );
      })
      .addCase(deleteQuestionPaper.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(
        fetchQuestionPaperDataWithCatIDSubCatIDYearID.pending,
        (state) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchQuestionPaperDataWithCatIDSubCatIDYearID.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.questionPapers = action.payload; // Update questions
        }
      )
      .addCase(
        fetchQuestionPaperDataWithCatIDSubCatIDYearID.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questionPapers.push(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadExcel.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadExcel.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.questions = action.payload;
      })
      .addCase(uploadExcel.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
      });
  },
});

export default questionPaperSlice.reducer;
