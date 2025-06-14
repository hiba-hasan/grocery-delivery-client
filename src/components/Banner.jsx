import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="Banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="BannerMobileScreen"
        className="w-full md:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
          GroceryGo: Where convenience <br /> meets your cravings.
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
            to={"/products"}
          >
            Shop Now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="White arrow"
            />
          </Link>
          <Link
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
            to={"/products"}
          >
            Explore Deals
            <image
              className="transition group:hover-translate-x-1 w-3 h-3"
              src={assets.black_arrow_icon}
              alt="Black Arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
