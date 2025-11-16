import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTalents = createAsyncThunk(
  "talents/fetchTalents",
  async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/talents`);
    console.log(res.data.data);
    return res.data.data;
  }
);

// Add Talent
export const addTalent = createAsyncThunk(
  "talents/addTalent",
  async (talentData) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/talents`, talentData);
    return res.data;
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

      // Fetch talents
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

      // Add talent
      .addCase(addTalent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default talentSlice.reducer;
