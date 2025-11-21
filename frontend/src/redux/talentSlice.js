import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Backend URL
const BASE_URL = import.meta.env.VITE_SERVER_URL;

// Fetch talents with stats
export const fetchTalents = createAsyncThunk(
  "talents/fetchTalents",
  async () => {
    const res = await axios.get(`${BASE_URL}/talents`);
    return res.data.data; // { talentList, stats }
  }
);

// Add a new talent
export const addTalent = createAsyncThunk(
  "talents/addTalent",
  async (talentData) => {
    const res = await axios.post(`${BASE_URL}/talents`, talentData);
       toast.success("Talent added successfully");
    return res.data.data; // new talent object
  }
);

// Update a talent
export const updateTalent = createAsyncThunk(
  "talents/updateTalent",
  async ({ id, ...updateData }) => {
    const res = await axios.put(`${BASE_URL}/talents/${id}`, updateData);
    toast.success("Talent updated successfully");
    return res.data.data; // updated talent object
  }
);

// Delete a talent
export const deleteTalent = createAsyncThunk(
  "talents/deleteTalent",
  async (id) => {
    await axios.delete(`${BASE_URL}/talents/${id}`);
     toast.success("Talent deleted successfully");
    return id; // return deleted talent ID to remove from state
  }
);

const talentSlice = createSlice({
  name: "talents",
  initialState: {
    talentList: [],
    stats: {
      totalTalent: 0,
      avgExperience: 0,
      uniqueSkills: 0,
    },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // fetchTalents
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.talentList = action.payload.talentList;
        state.stats = action.payload.stats;
      })
      .addCase(fetchTalents.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load talents";
      })

      // addTalent
      .addCase(addTalent.fulfilled, (state, action) => {
        state.talentList.push(action.payload);
      })

      // updateTalent
      .addCase(updateTalent.fulfilled, (state, action) => {
        const index = state.talentList.findIndex(
          (talent) => talent._id === action.payload._id
        );
        if (index !== -1) {
          state.talentList[index] = action.payload;
        }
      })

      // deleteTalent
      .addCase(deleteTalent.fulfilled, (state, action) => {
        state.talentList = state.talentList.filter(
          (talent) => talent._id !== action.payload
        );
      });
  },
});

export default talentSlice.reducer;
