import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  removeCartItem,
  updateCartItem,
} from "../../../State/Customers/Cart/cartThunks";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt") || auth.jwt;

  const handleUpdateCartItem = (change) => {
    // If user is decrementing from 1 => remove the item
    if (change === -1 && item.quantity === 1) {
      handleRemove();
      return;
    }
    // Otherwise, just update the quantity
    const data = {
      cartItemId: item.id,
      quantity: item.quantity + change,
    };
    dispatch(updateCartItem({ data, jwt }));
  };

  const handleRemove = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt }));
  };

  return (
    <div className="px-5 mb-3">
      <div className="lg:flex items-center lg:space-x-5">
        {/* Item image */}
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.images[0]}
            alt={item.food.name}
          />
        </div>

        {/* Item name + quantity controls */}
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.food.name}</p>

            <div className="flex items-center space-x-2">
              <IconButton
                onClick={() => handleUpdateCartItem(-1)}
                color="primary"
              >
                <RemoveCircleOutline />
              </IconButton>
              <div className="w-5 h-5 text-sm flex items-center justify-center">
                {item.quantity}
              </div>
              <IconButton
                onClick={() => handleUpdateCartItem(1)}
                color="primary"
              >
                <AddCircleOutline />
              </IconButton>
            </div>
          </div>
          <p>₹{item.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
