import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import Menu from "./pages/Menu/Menu";

import FoodCategory from "./pages/FoodCategory/FoodCategory";
import Details from "./pages/Details/Details";
import AddMenuForm from "./pages/Menu/AddMenuForm";
import { fetchAllCategories } from "../State/Customers/Category/categoryThunks";

import { fetchOrders } from "../State/Admin/Order/adminOrderThunks";
import { useDispatch } from "react-redux";

const Admin = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(fetchAllCategories({ jwt }));
      dispatch(fetchOrders({ jwt }));
    }
  }, [dispatch, jwt]);

  return (
    <div>
      <div className="lg:flex justify-between">
        <div className="">
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>
        <div className="lg:w-[80vw]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/add-menu" element={<AddMenuForm />} />

            <Route path="/category" element={<FoodCategory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
