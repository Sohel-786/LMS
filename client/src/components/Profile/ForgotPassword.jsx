import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

function ForgotPassword({ hideForgotPass }) {
  const { isLoggedIn, data } = useSelector((s) => s?.auth);

  const [registeredEmail, setRegisteredEmail] = useState({
    email: "",
  });

  async function handleChange(e) {
    const { name, value } = e.target;
    setRegisteredEmail({
      ...registeredEmail,
      [name]: value,
    });
  }

  async function handleSubmit() {}
  async function handleCurrentSubmit() {
    if (!data.email) {
      toast.error("User Is Not Logged In");
      return;
    }

    try {
      const res = axiosInstance.post("/user/reset", { email : data.email});
      toast.promise(res, {
        loading: "Wait, Checking your email & changing password",
        success: (data) => {
          return data?.data?.message;
        },
        error: (data) => {
          const msg = data?.response?.data?.message;

          if (msg === "Email is required") {
            return "User Is Not Logged In";
          }
          if (msg === "Email is not registered") {
            return "User doesn't exists";
          } else {
            return "Something Went Wrong";
          }
        },
      });

      const response = await res;

      if(response?.data?.success) {
        hideForgotPass();
      }
    }catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  return isLoggedIn ? (
    <div
      id="forgotPass"
      className="hidden flex-col justify-center items-center w-[80%] md:w-[60%] lg:w-[60%] bg-white rounded-xl py-5 px-4"
    >
      <div className="w-full bg-transparent flex flex-col justify-center items-center">
        <h1 className="font-roboto tracking-wide text-2xl font-semibold my-4">
          We'll send you a mail to your registered email address
        </h1>

        <p className="font-mono text-lg font-semibold tracking-wider text-blue-500">
          {data.email.slice(0, 5)}**********
          {data.email.slice(data.email.length - 7, data.email.length)}
        </p>
      </div>

      <div
        style={{
          userSelect: "none",
        }}
        className="w-full flex items-center justify-center gap-5 mt-5"
      >
        <button
          onClick={handleCurrentSubmit}
          className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 hover:bg-gradient-to-t hover:from-blue-400 hover:via-blue-600 hover:to-blue-800 hover:scale-110 transition-all duration-300"
        >
          Continue
        </button>

        <button
          onClick={() => {
            setRegisteredEmail({
              email: "",
            });
            hideForgotPass();
          }}
          className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-red-800 via-red-600 to-red-400 hover:bg-gradient-to-t hover:from-red-400 hover:via-red-600 hover:to-red-800 hover:scale-110 transition-all duration-300"
        >
          CANCEL
        </button>
      </div>
    </div>
  ) : (
    <div
      id="forgotPass"
      className="hidden flex-col justify-center w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-xl py-5 px-6"
    >
      <label htmlFor="email" className="font-slab text-gray-600 mt-4 mb-2 pl-1">
        Enter Your Registered Email
      </label>

      <div className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-red-600 rounded-xl ">
        <input
          onChange={handleChange}
          className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
          type="email"
          name="email"
          id="email"
          value={registeredEmail.email}
        />
      </div>

      <div
        style={{
          userSelect: "none",
        }}
        className="w-full flex items-center gap-5 mt-5"
      >
        <button
          onClick={handleSubmit}
          className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 hover:bg-gradient-to-t hover:from-blue-400 hover:via-blue-600 hover:to-blue-800 hover:scale-110 transition-all duration-300"
        >
          SUBMIT
        </button>

        <button
          onClick={() => {
            setRegisteredEmail({
              email: "",
            });
            hideForgotPass();
          }}
          className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-red-800 via-red-600 to-red-400 hover:bg-gradient-to-t hover:from-red-400 hover:via-red-600 hover:to-red-800 hover:scale-110 transition-all duration-300"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
