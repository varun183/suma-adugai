import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// Async Thunks for Admin Orders
export const fetchOrders = createAsyncThunk(
  "adminOrders/fetchOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/admin/order", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ orderId, orderStatus, jwt }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
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
