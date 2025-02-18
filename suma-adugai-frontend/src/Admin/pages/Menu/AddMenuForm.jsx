import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { createMenuItem } from "../../../State/Customers/Menu/customerMenuThunks";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be >= 0"),
  images: Yup.array()
    .of(Yup.string().url("Invalid URL format"))
    .min(1, "At least one image is required"),
  foodType: Yup.string()
    .oneOf(["vegetarian", "nonveg"], "Select one food type")
    .required("Food type is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity must be >= 0"),
});

// ✅ Initial Form Values
const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  images: [],
  foodType: "vegetarian", // new single field
  quantity: 0,
};

const AddMenuForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category, auth, customerMenu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [uploadImage, setUploadingImage] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // ✅ Formik for Form Handling
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Create a new object where foodType is mapped to the three booleans:
      const mappedValues = {
        ...values,
        vegetarian: values.foodType === "vegetarian",
        nonveg: values.foodType === "nonveg",
      };

      // Dispatch the action with the mapped values
      console.log("Submitting values: ", mappedValues);
      dispatch(createMenuItem({ menu: mappedValues, jwt: auth.jwt || jwt }));
    },
  });

  useEffect(() => {
    if (customerMenu.message || customerMenu.error) setOpenSnackBar(true);
  }, [customerMenu.message, customerMenu.error]);

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  // ✅ Handle Image Upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  // ✅ Remove Uploaded Image
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          mt: 5,
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add New Menu Item
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* ✅ Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Images
              </Typography>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="fileInput">
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton color="primary" component="span">
                    <AddPhotoAlternate />
                  </IconButton>
                  {uploadImage && <CircularProgress size={24} />}
                </Box>
              </label>
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: 2 }}>
                {formik.values.images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{ position: "relative", width: 100, height: 100 }}
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* ✅ Name & Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                variant="outlined"
                {...formik.getFieldProps("description")}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>

            {/* ✅ Price & Category */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                variant="outlined"
                {...formik.getFieldProps("price")}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select name="category" {...formik.getFieldProps("category")}>
                  {category.categories.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* ✅ Vegetarian  */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  Select Food Type
                </Typography>
                <RadioGroup
                  row
                  name="foodType"
                  value={formik.values.foodType}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="vegetarian"
                    control={<Radio />}
                    label="Vegetarian"
                  />
                  <FormControlLabel
                    value="nonveg"
                    control={<Radio />}
                    label="Non-Veg"
                  />
     
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* ✅ Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Create Menu Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        sx={{ zIndex: 50 }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        // handleClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={customerMenu.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {customerMenu.message || auth.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddMenuForm;
