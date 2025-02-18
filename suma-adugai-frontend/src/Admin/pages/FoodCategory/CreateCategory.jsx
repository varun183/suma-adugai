import React, { useState } from "react";
import { createCategory } from "../../../State/Customers/Category/categoryThunks";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

const CreateCategory = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    categoryName: "",
    imageUrl: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Create an object with both the category name and image URL
    const data = {
      name: formData.categoryName,
      image: formData.imageUrl,
    };
    // Dispatch with correct key "categoryData" as expected by the thunk
    dispatch(createCategory({ categoryData: data, jwt: auth.jwt || jwt }));
    // Reset form and close modal
    setFormData({
      categoryName: "",
      imageUrl: "",
    });
    handleClose();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">
        Create Category
      </h1>
      <form className="space-y-5" onSubmit={handleFormSubmit}>
        <TextField
          label="Category Name"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
