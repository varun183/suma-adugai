import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = ({ order, status }) => {
  return (
    <Card className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src={
            "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
          }
          alt=""
        />
        <div>
          <p>burger</p>
          <p className="text-gray-400">₹500</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed" variant="contained">
          status
        </Button>
      </div>
    </Card>
  );
};

export default OrderCard;
