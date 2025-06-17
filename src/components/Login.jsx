import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowUserLogin, setUser, axios } = useAppContext();

  async function onSubmitHandler(e) {
    e.preventDefault();
    console.log(state);
    try {
      if (state == "login") {
        const { data } = await axios.post("/api/user/sign-in", {
          email,
          password,
        });

        if (data.success) {
          console.log("login:if");
          toast.success(data.message);
          setShowUserLogin(false);
          setUser({ name, email });
        } else {
          console.log("Login: else ");
          toast.error(data.error);
        }
      } else if (state == "register") {
        const { data } = await axios.post("/api/user/sign-up", {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          setShowUserLogin(false);
          setUser({ name, email });
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || error.message;

      toast.error(msg);
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
