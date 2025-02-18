import React from "react";
import { Button, Card, IconButton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeCartItem,
  updateCartItem,
} from "../../../State/Customers/Cart/cartThunks";

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state); // entire cart state from Redux

  // 1. Find if this item is already in the cart
  const cartItem = cart?.cartItems?.find((ci) => ci.food.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0; // 0 if not in the cart

  // 2. Add to cart if not present
  const handleAdd = () => {
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(data));
  };

  // 3. Increment the quantity
  const handleIncrement = () => {
    if (quantity === 0) {
      handleAdd();
    } else {
      const data = {
        data: {
          cartItemId: cartItem.id,
          quantity: quantity + 1,
        },
        jwt: localStorage.getItem("jwt"),
      };
      dispatch(updateCartItem(data));
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(
        updateCartItem({
          data: { cartItemId: cartItem.id, quantity: quantity - 1 },
          jwt: localStorage.getItem("jwt"),
        })
      );
    } else if (quantity === 1 && cartItem) {
      // Check if the item still exists in Redux state before removing
      if (cart.cartItems.some((item) => item.id === cartItem.id)) {
        dispatch(
          removeCartItem({
            cartItemId: cartItem.id,
            jwt: localStorage.getItem("jwt"),
          })
        );
      }
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        p: 2,
      }}
    >
      {/* Left Section: Image + Info */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <img
          src={item.images[0]}
          alt={item.name}
          style={{ width: "7rem", height: "7rem", objectFit: "cover" }}
        />
        <div>
          <p className="font-semibold text-xl">{item.name}</p>
          <p>₹{item.price}</p>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>

      {/* Right Section: Add or Increment/Decrement */}
      <div>
        {!item.available ? (
          <Button variant="contained" disabled>
            Out of stock
          </Button>
        ) : quantity === 0 ? (
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconButton onClick={handleDecrement} color="primary">
              <RemoveCircleOutline />
            </IconButton>
            <span>{quantity}</span>
            <IconButton onClick={handleIncrement} color="primary">
              <AddCircleOutline />
            </IconButton>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FoodCard;
