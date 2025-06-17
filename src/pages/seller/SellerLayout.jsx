import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { isSeller, axios, navigate } = useAppContext();
  async function logout() {
    const { data } = await axios.get("/api/seller/logout");
    if (data) {
      toast.success(data.message);
      navigate("/");
      console.log(isSeller);
    } else {
      toast.error(data.message);
    }
  }

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "ProductList",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <Link to={"/"}>
          <img
            className="h-9"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
            alt="dummyLogoColored"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path == "/seller "}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
            ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                : "hover:bg-gray-100/90 border-white text-gray-700"
            }`}
            >
              <img src={item.icon} alt="Icon" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
