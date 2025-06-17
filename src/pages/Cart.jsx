import React from "react";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

function Cart() {
  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [payment, setPayment] = useState("COD");

  const {
    cartItems,
    setCartItems,
    products,
    updateCartItem,
    totalAmount,
    calculateTotalAmount,
    currency,
    removeCartItem,
    getCartItemCount,
    navigate,
    axios,
    user,
  } = useAppContext();
  //   console.log(Object.values(cartItems));

  function addCartArray() {
    let temp = [];
    for (const item in cartItems) {
      const cartProduct = products.find((i) => i._id == item);
      cartProduct.quantity = cartItems[item];

      // const isPresent = cartArray.find((i) => i._id == cartProduct._id);

      // if (!isPresent) {
      //   setCartArray((prevCartArray) => [...prevCartArray, cartProduct]);

      // }
      temp.push(cartProduct);
    }
    setCartArray(temp);
  }
  async function getAddresses() {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        console.log(data.addresses);
        setAddresses(data.addresses);
        setSelectedAddress(data.addresses[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      getAddresses();
    }
  }, [user]);

  useEffect(() => {
    addCartArray(), calculateTotalAmount();
  }, [cartItems]);
  //   return <div>{cartArray.map((product)=><CartPage/>)}</div>;

  async function placeOrder() {
    if (payment == "COD") {
      try {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success("Order Placed Successfully");
          window.location.replace(data.url);
          setCartItems({});
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        const { data } = await axios.post("/api/order/stripe", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success("Order Placed Successfully");
          window.location.replace(data.url);
          // setCartItems({});
        } else {
          toast.error(data.error);
          console.log(data.message);
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {getCartItemCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div
              className="flex items-center md:gap-6 gap-3"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                <img
                  onClick={() =>
                    navigate(
                      `/products/${product.category.toLowerCase()}/${
                        product._id
                      }`
                    )
                  }
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={cartItems[product._id]}
                      onChange={(e) => {
                        updateCartItem(product._id, Number(e.target.value));
                        console.log(cartItems);
                      }}
                    >
                      {Array(
                        cartItems[product._id] > 5 ? cartItems[product._id] : 5
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * cartItems[product._id]}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => removeCartItem(product._id)}
            >
              <img src={assets.remove_icon} />
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {addresses.map((add) => (
                  <p
                    onClick={
                      () => {
                        setShowAddress(false);
                        setSelectedAddress(add);
                      }
                      //
                    }
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {add.street},{add.city},{add.state},{add.country}
                  </p>
                ))}

                <p
                  onClick={() => {
                    setShowAddress(false), navigate("/add-address");
                  }}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{totalAmount}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{totalAmount * 0.02}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>{totalAmount + totalAmount * 0.02}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {payment == "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
