import React, { useState } from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import UsersAddresses from "../UsersAddresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import Orders from "../Orders/Orders";

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(true);

  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation open={openSideBar} />
      </div>
      {/* <Divider orientation="vertical" flexItem /> */}
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<UsersAddresses />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
