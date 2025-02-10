import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Auth/authSlice";
import customerMenuReducer from "../Customers/Menu/customerMenuSlice";
import cartReducer from "../Customers/Cart/cartSlice";
import orderReducer from "../Customers/Orders/orderSlice";
import adminOrderReducer from "../Admin/Order/adminOrderSlice";
import ingredientReducer from "../Admin/Ingredients/ingredientSlice";
import categoryReducer from "../Customers/Category/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customerMenu: customerMenuReducer,
    cart: cartReducer,
    orders: orderReducer,
    category: categoryReducer,

    adminOrders: adminOrderReducer,
    ingredients: ingredientReducer,
  },
});

export default store;
