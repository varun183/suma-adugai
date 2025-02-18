import { createSlice } from "@reduxjs/toolkit";
import {
  searchMenuItems,
  fetchFoodByCategory,
  deleteMenuItem,
  createMenuItem,
  updateMenuItemAvailability,
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
      .addCase(createMenuItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foodsByCategory.push(action.payload); // Add new item
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateMenuItemAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMenuItemAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedFood = action.payload;
        state.foodsByCategory = state.foodsByCategory.map((food) =>
          food.id === updatedFood.id ? updatedFood : food
        );
      })

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
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foodsByCategory = state.foodsByCategory.filter(
          (food) => food.id !== action.payload
        );
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default customerMenuSlice.reducer;
