import React from "react";
import Home from "../customers/pages/Home/Home";
import Cart from "../customers/pages/Cart/Cart";
import Profile from "../customers/pages/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import Auth from "../customers/pages/Auth/Auth";
import Navbar from "../customers/components/Navbar/Navbar";

const CustomerRoutes = () => {
  return (
    <div className="relative">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRoutes;
