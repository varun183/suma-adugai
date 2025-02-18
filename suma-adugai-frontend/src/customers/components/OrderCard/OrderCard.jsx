import { Card, Typography } from "@mui/material";
import React from "react";

const OrderCard = ({ order }) => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex flex-col">
        {/* Row of small images */}
        <div className="flex space-x-2">
          {order.items.map((item, index) => (
            <img
              key={index}
              src={item.food.images[0]}
              alt={item.food.name}
              className="h-10 w-10 object-cover rounded"
            />
          ))}
        </div>
        {/* Order status */}
        <div className="mt-2">
          <Typography variant="body2" className="text-white">
            Status: {order.orderStatus}
          </Typography>
        </div>
      </div>
      {/* Total amount on the right */}
      <div>
        <Typography variant="h6" className="text-white">
          ₹{order.totalAmount}
        </Typography>
      </div>
    </Card>
  );
};

export default OrderCard;
