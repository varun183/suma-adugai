import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFoodsByCategory,
  fetchFoodByCategory,
} from "../../../State/Customers/Menu/customerMenuThunks";
import { useEffect } from "react";
import { fetchAllCategories } from "../../../State/Customers/Category/categoryThunks";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarion only", value: "vegetarian" },
  { label: "Non-Vegetarion only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Added location hook
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");

  const { foodsByCategory } = useSelector((state) => state.customerMenu);
  const { categories } = useSelector((state) => state.category);

  // Simplified filter handler
  const handleFilter = (e) => {
    const newSearchParams = new URLSearchParams(location.search);
    const { name, value } = e.target;

    if (value === "all") {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, value);
    }

    const query = newSearchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };

  React.useEffect(() => {
    const filters = {
      categoryName: foodCategory && foodCategory !== "all" ? foodCategory : "",
      vegetarian: foodType === "vegetarian",
      isNonveg: foodType === "non_vegetarian",
      seasonal: foodType === "seasonal",
      jwt,
    };

    dispatch(fetchFoodByCategory(filters));
    dispatch(fetchAllCategories({ jwt }));
  }, [foodCategory, foodType, dispatch, jwt]); // Added missing dependencies

  return (
    <div className="px-5 lg:px-20">
      <section>
        <div className="pt-10 pb-5">
          <h1 className="text-4xl font-semibold">Our Menu</h1>
          <p className="text-gray-500 mt-1">
            Explore our diverse selection of dishes
          </p>
        </div>
      </section>
      <Divider />

      <section className="pt-8 lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ pb: 2 }}>
                Food Type
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="food_type"
                  value={foodType || "all"}
                  onChange={handleFilter}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h5" sx={{ pb: 2 }}>
                  Food Categories
                </Typography>
                <RadioGroup
                  name="food_category"
                  value={foodCategory || "all"}
                  onChange={handleFilter}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                    sx={{ color: "gray" }}
                  />
                  {categories?.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          {foodsByCategory.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
