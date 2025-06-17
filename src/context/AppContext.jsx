import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const currency = import.meta.env.VITE_CURRENCY;

  async function fetchSellerStatus() {
    try {
      console.log("HEllo");
      const { data } = await axios.get("/api/seller/is-Auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
      const msg = error.response?.data?.message || error.message;

      toast.error(msg);
      setIsSeller(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/is-Auth");
      if (data.success) {
        const email = data.user.email;
        const pass = data.user.password;
        console.log(email, pass);
        setUser({ email, password: pass });
        console.log(data.user.cartItems);
        setCartItems(data.user.cartItems);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }

  //set Products for Best Sellers
  async function fetchProducts() {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  //run the above func only when initially mounted
  useEffect(() => {
    fetchProducts();
    fetchSellerStatus();
    fetchUser();
  }, []);

  useEffect(() => {
    async function updateCart() {
      try {
        console.log("CArt ITEMS in uodate CArt function", cartItems);
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    if (user) {
      updateCart();
    }
  }, [cartItems]);
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
    fetchProducts,
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
