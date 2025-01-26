import React from "react";
import { Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const UserProfile = () => {
  const handleLogout = () => {};
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircle sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">Suma adugai</h1>
        <p>Email : varun@gmail.com</p>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
