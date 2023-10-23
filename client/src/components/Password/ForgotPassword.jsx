import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmail } from "../../helpers/RegexMatcher";
import { MdEmail } from "react-icons/md";

function ForgotPassword({ hideForgotPass }) {
  const { isLoggedIn, data } = useSelector((s) => s?.auth);
  const navigate = useNavigate();

  const [showSendMail, setshowSendMail] = useState(false);

  const [registeredEmail, setRegisteredEmail] = useState({
    email: "",
  });

  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoggedIn && pathname === "/forgot-password") {
      const forgotPass = document.getElementById("forgotPass");
      forgotPass.style.display = "flex";
    }
  }, []);

  async function handleChange(e) {
    const { name, value } = e.target;
    setRegisteredEmail({
      ...registeredEmail,
      [name]: value,
    });
  }

  function handleSubmit() {
    if (!registeredEmail.email) {
      toast.error("Please enter an email first");
      return;
    }

    if (!isEmail(registeredEmail.email)) {
      toast.error("Invalid Email");
      return;
    }

    setshowSendMail(true);
  }

  async function handleSendMail() {
    try {
      const res = axiosInstance.post("/user/reset", registeredEmail);
      toast.promise(res, {
        loading: "Wait, Sending Mail",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Something Went Wrong",
      });

      const response = await res;

      if (response?.data?.success) {
        setRegisteredEmail({
          email: "",
        });
        navigate("/signin");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  async function handleCurrentSubmit() {
    if (!data.email) {
      toast.error("User Is Not Logged In");
      return;
    }

    try {
      const res = axiosInstance.post("/user/reset", { email: data.email });
      toast.promise(res, {
        loading: "Wait, Sending Mail",
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

      if (response?.data?.success) {
        hideForgotPass();
      }
    } catch (err) {
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
          aria-label="Continue Reset Password Process"
          onClick={handleCurrentSubmit}
          className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 hover:bg-gradient-to-t hover:from-blue-400 hover:via-blue-600 hover:to-blue-800 hover:scale-110 transition-all duration-300"
        >
          Continue
        </button>

        <button
        aria-label="Cancel Reset Password Process"
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
      className="hidden flex-col justify-center w-[90%] md:w-[60%] lg:w-[50%] bg-gradient-to-r from-zinc-950 to-zinc-700 rounded-xl py-5 px-6"
    >
      <label
        htmlFor="email"
        className="font-slab text-gray-300 mt-4 mb-4 pl-1 sm:text-xl tracking-wide"
      >
        Enter Your Registered Email
      </label>

      <div className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-green-600 rounded-xl ">
        <input
          onChange={handleChange}
          className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full text-white font-semibold my-2 sm:text-xl"
          type="email"
          name="email"
          id="email"
          value={registeredEmail.email}
        />
      </div>

      {showSendMail && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-[#00000095] to-[#00000095] flex justify-center items-center z-30">
          <div className="flex flex-col justify-center w-[90%] md:w-[60%] lg:w-[50%] bg-white rounded-xl py-8 px-6 text-center">
            <h1 className="font-poppins sm:text-xl font-bold tracking-wide text-zinc-600">
              We will send you mail to the provided registered email address
            </h1>
            <p className="my-5 font-slab tracking-wider sm:text-xl text-blue-600 flex justify-center items-center gap-1">
              <MdEmail size={"30px"} />
              {registeredEmail.email}
            </p>

            <hr className="border-b-[1.5px] my-2 sm:my-4" />

            <div className="w-full flex justify-center items-center gap-5">
              <button
                aria-label="Send Mail"
                onClick={handleSendMail}
                className="bg-gradient-to-t from-indigo-900 via-indigo-600 to-indigo-400 w-fit self-center text-white px-5 py-3 text-sm sm:text-xl font-bold font-poppins rounded-xl hover:bg-gradient-to-t hover:from-indigo-400 hover:via-indigo-600 hover:to-indigo-900 transition-all duration-300 ease-in-out hover:scale-110"
              >
                OK
              </button>
              <button
              aria-label="Change Emal Address"
                onClick={() =>{
                  setRegisteredEmail({
                    email: "",
                  });
                  setshowSendMail(false)
                }}
                className="bg-gradient-to-t from-orange-900 via-orange-600 to-orange-400 w-fit self-center text-white px-5 py-3 text-sm sm:text-xl font-bold font-poppins rounded-xl hover:bg-gradient-to-t hover:from-orange-400 hover:via-orange-600 hover:to-orange-900 transition-all duration-300 ease-in-out hover:scale-110"
              >
                CHANGE EMAIL
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          userSelect: "none",
        }}
        className="w-full flex items-center gap-3 sm:gap-5 mt-6"
      >
        <button
          aria-label='Send Mail to Registered Email Address'
          onClick={handleSubmit}
          className="text-white px-4 sm:px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 hover:bg-gradient-to-t hover:from-blue-400 hover:via-blue-600 hover:to-blue-800 hover:scale-110 transition-all duration-300"
        >
          CONTINUE
        </button>

        <button
          aria-label="Cancel Reset Password Process"
          onClick={() => {
            setRegisteredEmail({
              email: "",
            });
            hideForgotPass();
          }}
          className="text-white px-4 sm:px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-red-800 via-red-600 to-red-400 hover:bg-gradient-to-t hover:from-red-400 hover:via-red-600 hover:to-red-800 hover:scale-110 transition-all duration-300"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
