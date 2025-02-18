import React, { useState, useEffect } from "react";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid as Grid2,
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
import { findCart } from "../../../State/Customers/Cart/cartThunks";
import { createOrder } from "../../../State/Customers/Orders/orderThunks";
import { isValid } from "../../util/validToOrder";

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
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { cart, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleCloseAddressModal = () => setOpenAddressModal(false);
  const handleOpenAddressModal = () => setOpenAddressModal(true);
  const handleCloseSnackBar = () => setOpenSnackbar(false);

  const handleSubmit = (values) => {
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
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else {
      setOpenSnackbar(true);
    }
  };

  const createOrderUsingSelectedAddress = (deliveryAddress) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        deliveryAddress: {
          id: deliveryAddress.id,
          fullName: auth.user?.fullName,
          streetAddress: deliveryAddress.streetAddress,
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          postalCode: deliveryAddress.postalCode,
          country: deliveryAddress.country,
        },
      },
    };
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
          {/* Left side: Cart items + Bill details */}
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
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
                  <p>Delivery Fee</p>
                  <p>₹21</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Platform Fee</p>
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

          {/* Right side: Address selection */}
          <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
            <div>
              <h1 className="text-center font-semibold text-2xl py-10">
                Choose Delivery Address
              </h1>
              <div className="flex gap-5 flex-wrap justify-center">
                {auth.user?.addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    item={addr}
                    showButton={true}
                    handleSelectAddress={createOrderUsingSelectedAddress}
                  />
                ))}
                {/* Add new address UI */}
                <Card className="flex flex-col justify-center items-center p-5 w-64">
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
        // If cart is empty
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCart sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      {/* Modal to add new address */}
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
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    helperText={
                      <ErrorMessage name="streetAddress">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    helperText={
                      <ErrorMessage name="state">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <Field
                    as={TextField}
                    name="postalCode"
                    label="Postal Code"
                    fullWidth
                    variant="outlined"
                    helperText={
                      <ErrorMessage name="postalCode">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid2>
                <Grid2 item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
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
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Please Add Items Only From One Restaurant At A Time"
      />
    </>
  );
};

export default Cart;
