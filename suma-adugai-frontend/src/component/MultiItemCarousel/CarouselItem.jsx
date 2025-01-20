import React from "react";

const CarouselItem = ({ image, title }) => {
  return (
    <div className="px-2">
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-[10rem] h-[10rem] lg:w-[14rem] lg:h-[14rem] rounded-full object-cover object-center aspect-square"
          src={image}
          alt={title}
        />
        <span className="py-5 font-semibold text-xl text-gray-400">
          {title}
        </span>
      </div>
    </div>
  );
};

export default CarouselItem;
