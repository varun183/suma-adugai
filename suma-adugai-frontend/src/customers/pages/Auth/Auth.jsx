import { Alert, Box, Button, Modal, Snackbar } from "@mui/material";
import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClose = () => {
    navigate("/");
  };

  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        }
        onClose={handleOnClose}
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? (
            <RegistrationForm />
          ) : (
            <LoginForm />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
