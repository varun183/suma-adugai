import React from "react";
import MultiItemCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import "./Home.css";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <div className="">
      <section className="-z-50 banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-3 lg:gap-5">
          <div>
            <p className="text-2xl lg:text-7xl font-bold z-10 py-3">
              Suma Adugai
            </p>
            <p className="z-10   text-gray-300 text-xl lg:text-4xl">
              Healthy home cooked food
            </p>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              backgroundColor: "#424242", // Dark gray color
              textTransform: "none", // Prevents uppercase text
            }}
            onClick={() => console.log("Menu Opened")} // Example click handler
          >
            Show Menu
          </Button>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>
      <section className="p-10 lg:py-10 lg:px-20">
        <div className="">
          <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
            What's on your mind?
          </p>
          <MultiItemCarousel />
        </div>
      </section>
    </div>
  );
};

export default Home;
