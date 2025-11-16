// talentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTalents = createAsyncThunk(
  "talents/fetchTalents",
  async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/talents`);
    return res.data.data;
  }
);

export const addTalent = createAsyncThunk(
  "talents/addTalent",
  async (talentData) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/talents`, talentData);
    return res.data.data;
  }
);

const talentSlice = createSlice({
  name: "talents",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTalents.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load talents";
      })
      .addCase(addTalent.fulfilled, (state, action) => {
        state.list.push(action.payload); // ✅ this triggers UI update
      });
  },
});

export default talentSlice.reducer;
