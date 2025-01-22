import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuCard from "../../components/MenuCard/MenuCard";

const categories = ["pizza", "biryani", "burger", "chicken", "rice"];

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarion only", value: "vegetarian" },
  { label: "Non-Vegetarion only", value: "non_vegetrian" },
  { label: "Seasonal", value: "seasonal" },
];

const menu = [1, 1, 1, 1, 1, 1];

const Menu = () => {
  const [foodType, setFoodType] = useState("all");
  const handleFilter = (e) => {
    console.log(e.targt.valuse, e.targt.name);
  };
  return (
    <>
      <div className="px-5 lg:px-20 ">
        <section>
          <div className="pt-10 pb-5">
            <h1 className="text-4xl font-semibold">South Indian food</h1>
            <p className="text-gray-500 mt-1">
              Indulge with the best of North Indian cuisines.
            </p>
          </div>
        </section>
        <Divider />

        <section className="pt-[2rem] lg:flex relative ">
          <div className="space-y-10 lg:w-[20%] filter">
            <div className="box space-y-5 lg:sticky top-28">
              <div className="">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                  Food Type
                </Typography>
                <FormControl className="py-10 space-y-5" component="fieldset">
                  <RadioGroup
                    name="food_type"
                    value={foodType}
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
                  <Divider />
                </FormControl>
              </div>
              <div className="">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                  Food Categories
                </Typography>
                <FormControl className="py-10 space-y-5" component="fieldset">
                  <RadioGroup
                    name="food_type"
                    value={foodType}
                    onChange={handleFilter}
                  >
                    {categories.map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={<Radio />}
                        label={item}
                        sx={{ color: "gray" }}
                      />
                    ))}
                  </RadioGroup>
                  <Divider />
                </FormControl>
              </div>
            </div>
          </div>

          <div className="lg:w-[80%] space-y-5 lg:pl-10">
            {menu.map((item) => (
              <MenuCard />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Menu;
