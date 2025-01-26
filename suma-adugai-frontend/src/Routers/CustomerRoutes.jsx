import React from "react";
import Home from "../customers/pages/Home/Home";
import Cart from "../customers/pages/Cart/Cart";
import Profile from "../customers/pages/Profile/Profile";
import { Route, Routes } from "react-router-dom";

const CustomerRoutes = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default CustomerRoutes;
