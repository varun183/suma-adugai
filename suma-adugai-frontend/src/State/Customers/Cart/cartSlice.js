import { createSlice } from "@reduxjs/toolkit";
import {
  findCart,
  getAllCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cartThunks";

const initialState = {
  cart: null,
  cartItems: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("jwt");
      state.cart = null;
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Find Cart
      .addCase(findCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.cartItems = action.payload.items;
      })
      .addCase(findCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Get All Cart Items
      .addCase(getAllCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getAllCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = [action.payload, ...state.cartItems];
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Remove Cart Item
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cart = null;
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = cartSlice.actions;
export default cartSlice.reducer;
