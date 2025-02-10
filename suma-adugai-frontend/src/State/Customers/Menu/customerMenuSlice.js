import { createSlice } from "@reduxjs/toolkit";
import {
  searchMenuItems,
  fetchFoodByCategory,
  fetchAllFoodsByCategory,
} from "./customerMenuThunks";

const initialState = {
  foodsByCategory: [],
  categoryName: "",
  searchedFoods: [],
  isLoading: false,
  error: null,
};

const customerMenuSlice = createSlice({
  name: "customerMenu",
  initialState,
  reducers: {}, // No synchronous reducers needed for now
  extraReducers: (builder) => {
    builder
      // Search Menu Items
      .addCase(searchMenuItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedFoods = action.payload;
      })
      .addCase(searchMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Food by Category
      .addCase(fetchFoodByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFoodByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foodsByCategory = action.payload;
        state.categoryName = action.meta.arg.categoryName;
      })
      .addCase(fetchFoodByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default customerMenuSlice.reducer;
