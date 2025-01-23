import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import React from "react";

const CartItemCard = () => {
  return (
    <div>
      <div className="px-5">
        <div className="lg:flex items-center lg:space-x-5">
          <div>
            <img
              className="w-[5rem] h-[5rem] object-cover"
              src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
              alt=""
            />
          </div>

          <div className="flex items-center justify-between lg:w-[70%]">
            <div className="space-y-1 lg:space-y-3 w-full ">
              <p className="">burger</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <IconButton color="primary">
                    <RemoveCircleOutline />
                  </IconButton>
                  <div className="w-5 h-5 text-xs flex items-center justify-center ">
                    {5}
                  </div>

                  <IconButton color="primary">
                    <AddCircleOutline />
                  </IconButton>
                </div>
              </div>
            </div>
            <p>₹400</p>
          </div>
        </div>
        <div className="pt-3 space-x-2">
          {[1, 1, 1].map((item) => (
            <Chip label={"item"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
