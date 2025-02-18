import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const navigateToMenu = () => {
    navigate(`/menu?food_category=${category.name}`);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition"
      onClick={navigateToMenu}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <CardContent className="text-center">
        <Typography variant="h6" fontWeight={500}>
          {category.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
