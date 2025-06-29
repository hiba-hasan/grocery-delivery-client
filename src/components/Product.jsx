import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Product = ({ product }) => {
  const { currency, addCartItems, removeCartItem, cartItems, navigate } =
    useAppContext();

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category}/${product._id}`);
      }}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2 bg-white">
        <img
          className="group-hover:scale-105 transition"
          src={product.image[0]}
          alt={product.name}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) =>
              i < 4 ? (
                <img className="md:w-3.5 w-3" src={assets.star_icon} />
              ) : (
                <img className="md:w-3.5 w-3" src={assets.star_dull_icon} />
              )
            )}
          <p>(4)</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            {currency} {product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency} {product.price}
            </span>
          </p>
          <div
            className="text-primary/100"
            onClick={(e) => e.stopPropagation()}
          >
            {!cartItems[product._id] ? (
              <button
                onClick={() => addCartItems(product._id)}
                className="flex items-center justify-center gap-1 bg-primary/10 border border-̵primary md:w-[80px] w-[64px] h-[34px] rounded text-primary-dull font-medium"
              >
                <img src={assets.cart_icon} alt="cartIcon" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                <button
                  className="cursor-pointer text-md px-2 h-full"
                  onClick={() => removeCartItem(product._id)}
                >
                  -
                </button>
                <span className="w-5 text-center">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={() => addCartItems(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
