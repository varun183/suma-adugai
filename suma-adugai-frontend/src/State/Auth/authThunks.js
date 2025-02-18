import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (reqData, { rejectWithValue }) => {
    console.log("registerUser thunk triggered with", reqData);
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/signup`,
        reqData.userData
      );

      console.log("Response from server:", data);

      localStorage.setItem("jwt", data.jwt);

      console.log(
        "Navigating to:",
        reqData.userData.role === "ROLE_RESTAURANT_OWNER"
          ? "/admin/restaurant"
          : "/"
      );

      reqData.navigate(
        reqData.userData.role === "ROLE_RESTAURANT_OWNER"
          ? "/admin/restaurant"
          : "/"
      );

      return data.jwt;
    } catch (error) {
      console.error(
        "❌ Registration failed:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (reqData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.data);
      localStorage.setItem("jwt", data.jwt);
      reqData.navigate(
        data.role === "ROLE_RESTAURANT_OWNER" ? "/admin/restaurant" : "/"
      );
      return data.jwt;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token, { rejectWithValue }) => {
    try {
      console.log("User jwt", token);
      const response = await axios.get(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User profile", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
