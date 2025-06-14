import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Product from "./Product";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { id } = useParams();
  const { products, currency, addCartItems, navigate } = useAppContext();

  const product = products.find((item) => item._id == id);

  console.log(product);

  useEffect(() => {
    setThumbnail(product ? product.image[0] : null);
  }, [product]);

  useEffect(() => {
    const temp = products.filter((item) => item.category == product.category);
    setRelatedProducts(temp);
  }, [products]);

  return (
    product && (
      <div className="max-w-6xl w-full px-6 mt-10">
        <p>
          <Link to={"/"}>Home</Link> /<Link to={"/products"}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-primary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  i < 4 ? (
                    <img className="md:w-3.5 w-3" src={assets.star_icon} />
                  ) : (
                    <img className="md:w-3.5 w-3" src={assets.star_dull_icon} />
                  )
                )}
              <p className="text-base ml-2">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addCartItems(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addCartItems(product._id);
                  navigate("/my-cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center sm:gap-3 md:gap-5">
          <h2 className="text-2xl text-center md:text-3xl font-medium">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 ">
            {relatedProducts.map((product) => (
              <Product product={product} />
            ))}
          </div>

          <button
            onClick={() => navigate("/products")}
            type="button"
            class="px-6 py-2 active:scale-95 transition bg-primary/20 border border-primary rounded text-primary text-sm font-medium"
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
