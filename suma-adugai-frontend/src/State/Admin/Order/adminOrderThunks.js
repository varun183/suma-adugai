import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// Async Thunks for Admin Orders
export const fetchOrders = createAsyncThunk(
  "adminOrders/fetchOrders",
  async ({ orderStatus, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/admin/order", {
        params: { order_status: orderStatus },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch Orders", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ orderId, orderStatus, jwt }, { rejectWithValue }) => {
    try {
      // Correct URL now includes both orderId and orderStatus as path variables.
      const response = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {}, // Empty body (if the endpoint doesn't require a request body)
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/admin/order/${orderId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
