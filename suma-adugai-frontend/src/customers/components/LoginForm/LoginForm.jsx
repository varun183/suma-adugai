import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../State/Auth/authThunks";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log("Login form values:", values);
    dispatch(loginUser({ data: values, navigate }));
  };

  return (
    <>
      <Typography className="text-center" variant="h5">
        Login
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            id="email"
            autoComplete="email"
          />
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, padding: " 1rem" }}
          >
            Login
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don't have an account?{" "}
        <Button onClick={() => navigate("/account/register")}>Register</Button>
      </Typography>
    </>
  );
};

export default LoginForm;
