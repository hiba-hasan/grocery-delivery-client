import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("hello");
  const [isSeller, setIsSeller] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const currency = import.meta.env.VITE_CURRENCY;

  //set Products for Best Sellers
  function fetchProducts() {
    setProducts(dummyProducts);
  }
  //run the above func only when initially mounted
  useEffect(fetchProducts, []);

  /*CART ITEMS FUNCTIONALITIES*/

  function addCartItems(itemId) {
    try {
      let cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
        cartData[itemId] += 1;
      } else {
        cartData[itemId] = 1;
      }
      setCartItems(cartData);
      toast.success("Added to Cart");
    } catch (error) {
      console.log(error);
    }
  }

  function removeCartItem(itemId) {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] == 0) {
        delete cartData[itemId];
      }
      toast.success("Item removed successfully");
      setCartItems(cartData);
    } else {
      toast.error("Item not present in the cart");
    }
  }
  function updateCartItem(itemId, quantity) {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success(`Updated Item successfully`);
  }

  function getCartItemCount() {
    return Object.values(cartItems).reduce(
      (acc, quantity) => acc + quantity,
      0
    );
  }

  function calculateTotalAmount() {
    setTotalAmount(0);
    for (const item in cartItems) {
      const product = products.find((pro) => pro._id == item);
      setTotalAmount(
        (prevAmount) => prevAmount + product.offerPrice * cartItems[item]
      );
    }
  }

  const values = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    navigate,
    products,
    currency,
    cartItems,
    setCartItems,
    addCartItems,
    updateCartItem,
    removeCartItem,
    searchQuery,
    setSearchQuery,
    getCartItemCount,
    totalAmount,
    calculateTotalAmount,
    axios,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
