import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodByCategory } from "../../../State/Customers/Menu/customerMenuThunks";
import { fetchAllCategories } from "../../../State/Customers/Category/categoryThunks";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-Vegetarian only", value: "non_vegetarian" },
];

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");

  const { foodsByCategory } = useSelector((state) => state.customerMenu);
  const { categories } = useSelector((state) => state.category);

  // Local state for food search and category search
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

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

  useEffect(() => {
    const filters = {
      categoryName: foodCategory && foodCategory !== "all" ? foodCategory : "",
      vegetarian: foodType === "vegetarian",
      isNonveg: foodType === "non_vegetarian",
      jwt,
    };
    dispatch(fetchFoodByCategory(filters));
    dispatch(fetchAllCategories({ jwt }));
  }, [foodCategory, foodType, dispatch, jwt]);

  // Filter foodsByCategory based on searchTerm (case insensitive)
  const filteredFoods = foodsByCategory.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter categories based on categorySearchTerm (case insensitive)
  const filteredCategories =
    categories?.filter((cat) =>
      cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
    ) || [];

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
        {/* Left Sidebar (Filters) */}
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
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

              {/* Category Search Bar */}
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search categories"
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

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
                {filteredCategories.map((cat) => (
                  <FormControlLabel
                    key={cat.id}
                    value={cat.name}
                    control={<Radio />}
                    label={cat.name}
                    sx={{ color: "gray" }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {/* Right Grid (Food List) */}
        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          {/* Food Name Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search food by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
          />

          {filteredFoods.map((foodItem) => (
            <FoodCard key={foodItem.id} item={foodItem} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
