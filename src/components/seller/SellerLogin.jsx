import React from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsSeller } = useAppContext();

  function onSubmitHandler(e) {
    e.preventDefault();
    setIsSeller(true);
  }

  return (
    <form
      className="min-h-screen flex items-center text-sm text-gray-600"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">Seller</span> Login
        </p>
        <div className="w-full">
          <p>Email:</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password:</p>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </div>
    </form>
  );
}

export default SellerLogin;
