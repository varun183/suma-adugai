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
    { categoryName, vegetarian, isNonveg, jwt },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      // If a category is provided, add it
      if (categoryName && categoryName !== "all") {
        params.append("categoryName", categoryName);
      }

      // Only include boolean filters if at least one is true
      if (vegetarian || isNonveg ) {
        params.append("isVegetarian", vegetarian);
        params.append("isNonveg", isNonveg);
      }

      console.log("JWT Token Being Sent:", jwt);

      const { data } = await axios.get(
        `${API_URL}/api/food/category?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      console.log("Fetch foods", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMenuItem = createAsyncThunk(
  "customerMenu/createMenuItem",
  async ({ menu, jwt }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/admin/food`, menu, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Menu Item Availability
export const updateMenuItemAvailability = createAsyncThunk(
  "customerMenu/updateMenuItemAvailability",
  async ({ foodId, jwt }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/admin/food/${foodId}`,
        {},
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

// Delete Menu Item
export const deleteMenuItem = createAsyncThunk(
  "customerMenu/deleteMenuItem",
  async ({ foodId, jwt }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/food/${foodId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return foodId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
