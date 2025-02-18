import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart, findCart } from "../../../State/Customers/Cart/cartThunks";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TaskAlt } from "@mui/icons-material";
import { green } from "@mui/material/colors";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the cart and then refresh it from the backend
    dispatch(clearCart()).then(() => {
      dispatch(findCart(localStorage.getItem("jwt")));
    });
  }, [dispatch]);

  const navigateToHome = () => navigate("/");

  return (
    <div className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">
          <TaskAlt sx={{ fontSize: "5rem", color: green[600] }} />
          <h1 className="py-5 text-2xl font-semibold">Order Success!</h1>
          <p className="py-3 text-center text-gray-400">
            Thank you for choosing our restaurant! We appreciate your order.
          </p>
          <p className="py-2 text-center text-gray-200 text-lg">
            Have a Great Day!
          </p>
          <Button
            variant="contained"
            className="my-5"
            sx={{ margin: "1rem 0rem" }}
            onClick={navigateToHome}
          >
            Go To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
