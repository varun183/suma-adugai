import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config/api";

//  Search for Menu Items
export const searchMenuItems = createAsyncThunk(
  "customerMenu/searchMenuItems",
  async (keyword, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/food/search?name=${keyword}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFoodByCategory = createAsyncThunk(
  "customerMenu/fetchFoodByCategory",
  async (
    { categoryName, vegetarian, seasonal, isNonveg, jwt },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      // If a category is provided, add it
      if (categoryName && categoryName !== "all") {
        params.append("categoryName", categoryName);
      }

      // Only include boolean filters if at least one is true
      if (vegetarian || isNonveg || seasonal) {
        params.append("isVegetarian", vegetarian);
        params.append("isNonveg", isNonveg);
        params.append("isSeasonal", seasonal);
      }

      console.log("JWT Token Being Sent:", jwt);

      const { data } = await axios.get(
        `${API_URL}/api/food/category?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllFoodsByCategory = createAsyncThunk(
  "customerMenu/fetchAllFoodsByCategory",
  async ({ token, categoryName }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/food/category/all?categoryName=${categoryName}`
      );
      console.log("All foods by category", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
