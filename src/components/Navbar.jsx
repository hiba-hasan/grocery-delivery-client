import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartItemCount,
    setCartItems,
  } = useAppContext();

  function logout() {
    setCartItems({});
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  return (
    <nav className="sticky top-0 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-40">
      <NavLink
        to="/"
        onClick={() => {
          setOpen(false);
        }}
      >
        <img className="h-10 w-20" src={assets.logo} alt="groceryGoLogo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="Search Icon" className="w-4 h-4" />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => {
            navigate("/my-cart");
          }}
        >
          <img
            src={assets.nav_cart_icon}
            alt="Cart icon"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartItemCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => {
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-ftransition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="ProfileImage"
              className="w-10"
            />
            <ul className=" hidden group-hover:block absolute top-10 right-0 bg-white shadow border border gray-200 py-2.5 w-30 rounded-md text-sm z-90">
              <li
                className="p-1.5 pl-3 hover:bg-primary/10 cursor:pointer"
                onClick={() => {
                  navigate("/my-orders");
                }}
              >
                <NavLink>My Orders</NavLink>
              </li>
              <li
                className="p-1.5 pl-3 hover:bg-primary/10 cursor:pointer"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="Menu Icon" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/products" onClick={() => setOpen(false)}>
          All Products
        </NavLink>

        {user && (
          <NavLink
            to="/my-cart"
            onClick={() => {
              setOpen(false);
            }}
          >
            My Cart
          </NavLink>
        )}

        {user && (
          <NavLink
            to="/my-orders"
            onClick={() => {
              setOpen(false);
            }}
          >
            My Orders
          </NavLink>
        )}

        <NavLink to="/" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-ftransition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(false);

              logout();
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-ftransition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
