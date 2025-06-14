import React from "react";
import { assets, features } from "../assets/assets";

function BottomBanner() {
  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="Banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="Banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
            Why We Are the Best?
          </h1>
          {features.map((feature) => (
            <div className="flex items-center gap-4 mt-2">
              <img className="md:w-11 w-9" src={feature.icon} />
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
