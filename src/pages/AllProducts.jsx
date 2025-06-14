import React from "react";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import Product from "../components/Product";

function AllProducts() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, searchQuery } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filProd = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredProducts(filProd);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);
  return (
    <div className="mt-24 flex flex-col">
      {filteredProducts.length > 0 && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl uppercase font-medium">ALL PRODUCTS</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt:6">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .filter((pro) => pro.inStock)
            .map((product) => <Product product={product} />)
        ) : (
          <h1 className="text-2xl uppercase font-medium">
            Oops!NO Items Found!!
          </h1>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
