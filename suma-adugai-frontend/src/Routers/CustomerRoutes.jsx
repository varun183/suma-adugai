import React from "react";
import Home from "../customers/pages/Home/Home";
import Cart from "../customers/pages/Cart/Cart";
import Profile from "../customers/pages/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import Auth from "../customers/pages/Auth/Auth";
import Navbar from "../customers/components/Navbar/Navbar";
import Menu from "../customers/pages/Menu/Menu";
import SearchPage from "../customers/pages/SearchPage/SearchPage";
import PaymentSuccess from "../customers/pages/PaymentSuccess/PaymentSuccess";

const CustomerRoutes = () => {
  return (
    <div className="relative">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRoutes;
