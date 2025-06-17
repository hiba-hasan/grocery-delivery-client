import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { axios } = useAppContext();
  async function fetchOrders() {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        console.log(data.orders);
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []);
  const { currency } = useAppContext();

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
      </div>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex   md:items-center md:flex-grow gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800 m-5"
        >
          {console.log(order)}
          <div className="flex gap-5 max-w-80">
            <img
              className="w-12 h-12 object-cover "
              src={assets.box_icon}
              alt="boxIcon"
            />
            <div className="flex flex-col ">
              {order.items.map((item, index) => (
                <div key={index}>
                  <p className="font-medium">
                    {item.product.name}{" "}
                    <span className="text-primary ">x {item.quantity}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm md:text-base text-black/60">
            <p className="text-balck/80">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
            </p>
            <p>
              {order.address.state},{order.address.zipcode},{" "}
              {order.address.country}
            </p>
            <p>{order.address.phone}</p>
          </div>
          <p className="font-medium text-base my- ">
            {currency}
            {order.amount}
          </p>
          <div className="flex flex-col text-sm md:text-base text-black/60">
            <p>Method: {order.paymentType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
