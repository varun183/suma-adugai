import React from "react";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  Modal,
  TextField,
} from "@mui/material";
import { AddLocationAlt } from "@mui/icons-material";
import AddressCard from "../../components/AddressCard/AddressCard";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const items = [1, 1];

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
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  city: Yup.string().required("City is required"),
});

const Cart = () => {
  const createOrderUsingSelectedAddress = () => {};

  const [open, setOpen] = React.useState(false);

  const handleOpenAddressModal = () => setOpen(true);
  const handleCloseAddressModal = () => setOpen(false);
  const handleSubmit = (value) => {
    console.log("Form vlaue", value);
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {items.map(() => (
            <CartItemCard />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>₹500</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>₹20</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Plateform Fee</p>
                <p>₹5</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>₹35</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Pay</p>
                <p>₹560</p>
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
              {[1, 1, 1].map((item) => (
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

      <Modal open={open} onClose={handleCloseAddressModal}>
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
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("pincode")}
                    helperText={
                      <ErrorMessage name="pincode">
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
    </>
  );
};

export default Cart;
