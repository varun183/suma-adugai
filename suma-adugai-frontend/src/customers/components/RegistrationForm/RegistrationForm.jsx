import {
  Button,
  Container,
  CssBaseline,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../State/Auth/authThunks";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5">
          Register
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Full Name"
              name="fullName"
              id="fullName"
              autoComplete="fullName"
            />
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
            />
            <Field
              className="mt-3"
              as={Select}
              variant="outlined"
              margin="normal"
              fullWidth
              name="role"
              id="role"
            >
              <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
              <MenuItem value="ROLE_RESTAURANT_OWNER">
                Restaurant Owner
              </MenuItem>
            </Field>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Register
            </Button>
          </Form>
        </Formik>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account ?{" "}
          <Button onClick={() => navigate("/account/login")}>Login</Button>
        </Typography>
      </div>
    </Container>
  );
};

export default RegistrationForm;
