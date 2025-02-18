import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// Fetch all categories
export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/category", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Fetched all categories:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

// Fetch a single category by ID
export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async ({ id, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/category/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Fetched category:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching category:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch category"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ categoryData, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/admin/category", categoryData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Created category:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      return rejectWithValue(
        error.response?.data || "Failed to create category"
      );
    }
  }
);
