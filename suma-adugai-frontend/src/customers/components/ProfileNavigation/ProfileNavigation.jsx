import {
  AccountBalanceWallet,
  Favorite,
  Home,
  Logout,
  Notifications,
  ShoppingBag,
} from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../State/Auth/authSlice";
import { useDispatch } from "react-redux";

const menu = [
  { title: "Orders", icon: <ShoppingBag /> },
  { title: "Favorites", icon: <Favorite /> },
  { title: "Address", icon: <Home /> },
  { title: "Payments", icon: <AccountBalanceWallet /> },
  { title: "Logout", icon: <Logout /> },
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigate = (item) => {
    navigate(`/my-profile/${item.title.toLowerCase()}`);
    if (item.title === "Logout") {
      handleLogout();
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <Drawer
        sx={{ zIndex: 1 }}
        anchor={"left"}
        open={open}
        onClose={handleClose}
        variant={isSmallScreen ? "temporary" : "permanent"}
        // variant="persistent"
      >
        <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl space-y-8 pt-16">
          {menu.map((item, i) => (
            <>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default ProfileNavigation;
