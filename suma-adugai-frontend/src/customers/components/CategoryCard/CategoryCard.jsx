import { Card } from "@mui/material";
import React from "react";

const CategoryCard = () => {
  return (
    <div>
      <Card className="m-5 w-[18rem] productCard ">
        <div className="cursor-pointer relative">
          <img
            className="w-full h-[10rem] rounded-t-md object-cover "
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1b59f8e96eb6acea83a5b855e2223eb5"
            alt=""
          />
        </div>
      </Card>
    </div>
  );
};

export default CategoryCard;
