import React from "react";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import { AddLocationAlt, RemoveShoppingCart } from "@mui/icons-material";
import AddressCard from "../../components/AddressCard/AddressCard";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { cartTotal } from "../../util/totalPay";
import { useState } from "react";
import { useEffect } from "react";
import { findCart } from "../../../State/Customers/Cart/cartThunks";
import { isValid } from "../../util/validToOrder";
import { createOrder } from "../../../State/Customers/Orders/orderThunks";

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
const initialValues = {
  streetAddress: "",
  state: "",
  postalCode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  city: Yup.string().required("City is required"),
});

const Cart = () => {
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState();
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const { cart, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, []);

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
  };

  const handleCloseSnackBar = () => setOpenSnackbar(false);

  const handleOpenAddressModal = () => setOpenAddressModal(true);

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: "India",
        },
      },
    };
    console.log("data", data);
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else setOpenSnackbar(true);
  };

  const createOrderUsingSelectedAddress = (deliveryAddress) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        deliveryAddress: {
          fullName: auth.user?.fullName, // ✅ Use the logged-in user's name
          streetAddress: deliveryAddress.streetAddress, // ✅ Use the selected address details
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          postalCode: deliveryAddress.postalCode,
          country: deliveryAddress.country, // ✅ Ensure this is fetched correctly
        },
      },
    };

    console.log("data", data);
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      {cart.cartItems.length > 0 ? (
        <main className="lg:flex justify-between">
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item, i) => (
              <CartItemCard item={item} />
            ))}
            <Divider />
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  <p>₹{cartTotal(cart.cartItems)}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Deliver Fee</p>
                  <p>₹21</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Plateform Fee</p>
                  <p>₹5</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>GST and Restaurant Charges</p>
                  <p>₹33</p>
                </div>
                <Divider />
                <div className="flex justify-between text-gray-400">
                  <p>Total Pay</p>
                  <p>₹{cartTotal(cart.cartItems) + 33 + 5 + 21}</p>
                </div>
              </div>
            </div>
          </section>
          <Divider orientation="vertical" flexItem />

          <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
            <div className="">
              <h1 className="text-center font-semibold text-2xl py-10">
                Choose Delivery Address
              </h1>
              <div className="flex gap-5 flex-wrap justify-center">
                {auth.user?.addresses.map((item, index) => (
                  <AddressCard
                    handleSelectAddress={createOrderUsingSelectedAddress}
                    item={item}
                    showButton={true}
                  />
                ))}

                <Card className="flex flex-col justify-center items-center p-5  w-64 ">
                  <div className="flex space-x-5">
                    <AddLocationAlt />
                    <div className="space-y-5">
                      <p>Add New Address</p>
                      <Button
                        sx={{ padding: ".75rem" }}
                        fullWidth
                        variant="contained"
                        onClick={handleOpenAddressModal}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCart sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid2 container spacing={2}>
                <Grid2 item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("streetAddress")}
                    helperText={
                      <ErrorMessage name="streetAddress">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("state")}
                    helperText={
                      <ErrorMessage name="state">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <Field
                    name="postalCode"
                    as={TextField}
                    label="postalCode"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("postalCode")}
                    helperText={
                      <ErrorMessage name="postalCode">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid2>
                <Grid2 item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("city")}
                    helperText={
                      <ErrorMessage name="city">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid2>
                <Grid2 item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Deliver Here
                  </Button>
                </Grid2>
              </Grid2>
            </Form>
          </Formik>
        </Box>
      </Modal>
      <Snackbar
        severity="success"
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Please Add Items Only From One Restaurants At time"
      />
    </>
  );
};

export default Cart;
