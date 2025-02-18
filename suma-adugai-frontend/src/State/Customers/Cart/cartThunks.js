import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config/api";

// 🔹 Find Cart
export const findCart = createAsyncThunk(
  "cart/findCart",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cart data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Get All Cart Items
export const getAllCartItems = createAsyncThunk(
  "cart/getAllCartItems",
  async ({ cartId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/carts/${cartId}/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Add Item to Cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ cartItem, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/cart/add`, cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cart data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Update Cart Item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ data, jwt }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/cart-item/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Remove Cart Item
// 🔹 Remove Cart Item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ cartItemId, jwt }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/cart-item/${cartItemId}/remove`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      // ✅ Fetch updated cart to prevent UI sync issues
      dispatch(findCart(jwt));

      return response.data; // Updated cart from the backend
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();

    if (!state.cart.cartItems.length)
      return rejectWithValue("Cart is already empty.");

    try {
      const { data } = await axios.put(
        `${API_URL}/api/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
