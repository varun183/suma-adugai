import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config/api";

// 🔹 Create Order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (reqData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/order`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });

      // If there is a payment URL, redirect the user
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }

      console.log("Created order data:", data);
      dispatch(createOrderSuccess(data));
    } catch (error) {
      console.error("Error creating order:", error);
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Get User Orders
export const getUsersOrders = createAsyncThunk(
  "orders/getUsersOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/order/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("User orders:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Get User Notifications
export const getUsersNotifications = createAsyncThunk(
  "orders/getUsersNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/notifications`);

      console.log("User notifications:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
