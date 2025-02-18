import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import CustomerRoutes from "./CustomerRoutes";
import { useSelector } from "react-redux";

const Routers = () => {
  const { auth } = useSelector((store) => store);

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </>
  );
};

export default Routers;
