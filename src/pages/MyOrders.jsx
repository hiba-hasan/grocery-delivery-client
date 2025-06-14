import React from "react";
import { useState } from "react";
import { dummyOrders } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function MyOrders() {
  const [myOrders, setMyOrders] = useState(dummyOrders);

  const { currency } = useAppContext();

  return (
    <div>
      <div className="m-3">
        <p>MY ORDERS</p>
      </div>
      <div>
        {myOrders.map((order) => (
          <div className="border-gray mb-10 border p-6 rounded">
            <p className="flex justify-between md:items-center gap-2 text-gray-400 md:font-medium max-md:flex-col">
              <span>Order Id: {order._id}</span>
              <span>Payment : {order.paymentType}</span>
              <span>Total Amount : {order.amount}</span>
            </p>
            {order.items.map((item) => (
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 py-5 font-gray">
                <div className="flex items-center mb-4 md:mb-0 md:flex-col">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <img
                      src={item.product.image[0]}
                      alt="Product Image"
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium text-gray-400 mt-2">
                      {item.product.name}
                    </h2>
                    <p className=" text-gray-400 md:font-medium mt-2">
                      Category:{item.product.category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-gray-400 md:font-medium">
                  <p>Quantity:{item.quantity || 1}</p>
                  <p>Status:{order.status}</p>
                  <p>Date:{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-primary text-lg font-medium">
                  Amount:{currency} {item.quantity * item.product.offerPrice}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
