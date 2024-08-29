import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for API calls
export const fetchPlans = createAsyncThunk("plans/fetchPlans", async () => {
  const response = await axios.get("/plans");
  return response.data;
});

export const createPlan = createAsyncThunk(
  "plans/createPlan",
  async (newPlan) => {
    console.log("new entry:" + JSON.stringify(newPlan));

    const response = await axios.post("/plans", newPlan);
    console.log("response entry:" + JSON.stringify(response));

    return response.data;
  }
);

export const updatePlan = createAsyncThunk("plans/updatePlan", async (plan) => {
  const response = await axios.put(`/plans/${plan.plan}`, plan);
  return response.data;
});

export const deletePlan = createAsyncThunk(
  "plans/deletePlan",
  async (planId) => {
    await axios.delete(`/plans/${planId}`);
    return planId;
  }
);

// Create slice
const plansSlice = createSlice({
  name: "plans",
  initialState: {
    plans: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(
          (plan) => plan.plan === action.payload.plan
        );
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(
          (plan) => plan.plan !== action.payload
        );
      });
  },
});

export default plansSlice.reducer;
