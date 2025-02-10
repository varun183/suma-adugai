import { createSlice } from "@reduxjs/toolkit";
import {
  createIngredient,
  fetchIngredients,
  updateIngredientStock,
} from "./ingredientThunks";

const adminIngredientsSlice = createSlice({
  name: "adminIngredients",
  initialState: {
    ingredients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        state.ingredients.push(action.payload);
      })
      .addCase(updateIngredientStock.fulfilled, (state, action) => {
        state.ingredients = state.ingredients.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export default adminIngredientsSlice.reducer;
