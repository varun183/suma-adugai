import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React from "react";

const demo = [
  { category: "Nuts & seeds", ingredients: ["Cashews"] },
  { category: "Protein", ingredients: ["chicken", "Egg"] },
  { category: "bread", ingredients: ["Brown bread", "Ham buns"] },
  { category: "Vegetables", ingredients: ["Lettuce", "Tomato", "Onion"] },
  { category: "Condiment", ingredients: ["Ketchup"] },
];

const MenuCard = () => {
  const handleCheckboxChange = (value) => {
    console.log("value");
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:space-x-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
                alt=""
              />
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">Burger</p>
                <p>₹400</p>
                <p className="text-gray-400">
                  item description item description item description
                </p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="flex gap-5 flex-wrap">
              {demo.map((item) => (
                <div className="pr-5">
                  <p>{item.category}</p>
                  <FormGroup>
                    {item.ingredients.map((item) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => handleCheckboxChange(item)}
                            label={item}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>
            <div className="pt-5">
              <Button variant="contained" disabled={false} type="submit">
                {true ? "Add To Cart" : "Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MenuCard;
