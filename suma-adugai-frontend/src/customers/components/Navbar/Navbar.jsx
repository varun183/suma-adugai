import { Avatar, IconButton, Badge } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToProfile = (e) => {
    auth.user?.role === "ROLE_ADMIN" ||
    auth.user?.role === "ROLE_RESTAURANT_OWNER"
      ? navigate("/admin/restaurant")
      : navigate("/my-profile");
  };

  return (
    <div className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#0f321c]  lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div
          onClick={navigateToHome}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <li className="logo font-semibold text-gray-300 text-2xl">
            suma adugai
          </li>
        </div>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div>
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        <div className="flex items-center space-x-2">
          {auth.user?.fullName ? (
            <span
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={
                auth.user?.role === "ROLE_ADMIN"
                  ? handleOpenMenu
                  : navigateToProfile
              }
              className=" font-semibold cursor-pointer"
            >
              <Avatar
                sx={{ bgcolor: "white", color: pink.A400 }}
                className="bg-white"
              >
                {auth.user.fullName[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
        </div>

        <IconButton onClick={navigateToCart}>
          <Badge color="black" badgeContent={cart.cartItems.length}>
            <ShoppingCartIcon className="text-4xl" sx={{ fontSize: "2rem" }} />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
