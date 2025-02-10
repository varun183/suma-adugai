import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

export const fetchIngredients = createAsyncThunk(
  "adminIngredients/fetchIngredients",
  async (jwt, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/admin/ingredients", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createIngredient = createAsyncThunk(
  "adminIngredients/createIngredient",
  async ({ ingredientData, jwt }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/api/admin/ingredients",
        ingredientData,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateIngredientStock = createAsyncThunk(
  "adminIngredients/updateStock",
  async ({ ingredientId, jwt }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredients/${ingredientId}/stock`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
