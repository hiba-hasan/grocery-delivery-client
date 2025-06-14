import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Product from "../components/Product";
import { categories } from "../assets/assets";

function ProductCategory() {
  const { products } = useAppContext();
  const { category } = useParams();

  const categ = categories.find((item) => item.path.toLowerCase() == category);
  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() == category
  );

  return (
    <div className="mt-5">
      {categ ? (
        <div className="flex flex-col gap:2 mt-9 ">
          <p className="font-medium mb-3 sm:text-xl md:text-2xl lg:text-3xl">
            {categ.text.toUpperCase()}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt:6">
            {filteredProducts
              .filter((pro) => pro.inStock)
              .map((product) => (
                <Product product={product} />
              ))}
          </div>
        </div>
      ) : (
        <h1 className="text-2xl uppercase font-medium">
          Sorry!!NO ITEMS IN THIS CATEGORY
        </h1>
      )}
    </div>
  );
}

export default ProductCategory;
