import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeals } from "../../../Data/topMeals";
import CarouselItem from "./CarouselItem";

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4, // Reduced to ensure spacing
    },
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    },
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  arrows: true,
  responsive,
};

const MultiItemCarousel = () => {
  return (
    <div>
      <Slider {...settings}>
        {topMeals.map((item) => (
          <CarouselItem image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
