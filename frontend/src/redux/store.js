import { configureStore } from "@reduxjs/toolkit";
import talentReducer from "./talentSlice.js";
import themeReducer from "./themeSlice.js";

export const store = configureStore({
  reducer: {
    talents: talentReducer,
    theme:themeReducer
  },
});
