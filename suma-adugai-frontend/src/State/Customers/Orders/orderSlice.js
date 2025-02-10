import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getUsersOrders,
  getUsersNotifications,
} from "./orderThunks";

const initialState = {
  orders: [],
  notifications: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = [action.payload, ...state.orders];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Get User Orders
      .addCase(getUsersOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUsersOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Get User Notifications
      .addCase(getUsersNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(getUsersNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
