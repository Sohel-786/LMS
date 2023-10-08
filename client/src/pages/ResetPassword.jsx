import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { isValidPassword } from "../helpers/RegexMatcher";
import axiosInstance from "../config/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [viewPasswords, setViewPasswords] = useState({
    viewNewPassword: false,
    viewConfirmPassword: false,
  });

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { resetToken } = useParams();

  function handleChange(e) {
    const { name, value } = e.target;

    const confirm = document.getElementById("confirm");

    if (!value) {
      if (name === "password") {
        if (password.confirmPassword.length > 0) {
          confirm.style.borderColor = "red";
        }
      } else {
        confirm.style.borderColor = "#0ea5e9";
      }
    } else if (name === "password") {
      if (password.confirmPassword === value) {
        confirm.style.borderColor = "#4ade80";
      } else if (!password.confirmPassword) {
        confirm.style.borderColor = "#0ea5e9";
      } else if (!(password.confirmPassword === value)) {
        confirm.style.borderColor = "red";
      }
    } else if (!(password.password === value)) {
      confirm.style.borderColor = "red";
    } else {
      confirm.style.borderColor = "#4ade80";
    }

    setPassword({
      ...password,
      [name]: value,
    });
  }

  function handleConfirmPassView() {
    setViewPasswords({
      ...viewPasswords,
      viewConfirmPassword: !viewPasswords.viewConfirmPassword,
    });
  }

  function handleNewPassView() {
    setViewPasswords({
      ...viewPasswords,
      viewNewPassword: !viewPasswords.viewNewPassword,
    });
  }

  async function handleSubmit() {
    if (!password.password || !password.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!(password.password === password.confirmPassword)) {
      toast.error("Confirmation of new password doesn't match");
      return;
    }

    if (!isValidPassword(password.password)) {
      toast.error(
        "Password must be 6 to 16 characters long with at least a number and symbol"
      );
      return;
    }

    try {
      const res = axiosInstance.post(`/user/reset/${resetToken}`, password);
      toast.promise(res, {
        loading: "Wait, Changing your password",
        success: (data) => {
          return data?.data?.message;
        },
        error: (data) => {
          const msg = data?.response?.data?.message;
          if (msg === "Token in invalid or expired, please try again") {
            return "Provide email again and generate new token";
          }
          return "Something Went Wrong";
        },
      });

      const response = await res;

      if (response?.data?.success) {
        setPassword({
          password: "",
          confirmPassword: "",
        });
        navigate("/signin");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      if (
        err.response?.data?.message ===
        "Token in invalid or expired, please try again"
      ) {
        setPassword({
          password: "",
          confirmPassword: "",
        });
        navigate("/signin");
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-[900px] lg:h-auto">
      <header
        style={{ userSelect: "none" }}
        className="flex justify-center items-center shadow-headershadow w-full h-[8%] lg:h-auto"
      >
        <div className="w-[160px] aspect-auto">
          <img
            className="w-full aspect-auto"
            src={"/assets/classroom.svg"}
            alt="logo"
          />
        </div>
      </header>
      <div className="w-full flex justify-center items-center h-[563px]">
        <div className="flex flex-col justify-center w-[90%] md:w-[60%] lg:w-[50%] bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 rounded-xl py-5 px-6">
          <label
            htmlFor="newPassword"
            className="font-slab tracking-wider text-gray-300 mt-4 mb-2 sm:mb-4 pl-1"
          >
            Create New Password
          </label>

          <div className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-green-400 rounded-xl text-white">
            <input
              onChange={handleChange}
              className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold "
              type={viewPasswords.viewNewPassword ? "text" : "password"}
              name="password"
              id="newPassword"
            />
            {viewPasswords.viewNewPassword ? (
              <span type="button">
                <FiEye
                  aria-label="eyeOn"
                  className="text-xl"
                  onClick={handleNewPassView}
                />
              </span>
            ) : (
              <span type="button">
                <FiEyeOff
                  aria-label="eyeOff"
                  className="text-xl"
                  onClick={handleNewPassView}
                />
              </span>
            )}
          </div>
          <label
            htmlFor="confirmPassword"
            className="font-slab tracking-wider text-gray-300 mt-4 mb-2 sm:mb-4 pl-1"
          >
            Confirm New Password
          </label>

          <div
            id="confirm"
            className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-green-400 rounded-xl text-white"
          >
            <input
              onChange={handleChange}
              className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
              type={viewPasswords.viewConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
            />
            {viewPasswords.viewConfirmPassword ? (
              <span type="button">
                <FiEye
                  aria-label="eyeOn"
                  className="text-xl"
                  onClick={handleConfirmPassView}
                />
              </span>
            ) : (
              <span type="button">
                <FiEyeOff
                  aria-label="eyeOff"
                  className="text-xl"
                  onClick={handleConfirmPassView}
                />
              </span>
            )}
          </div>

          <div
            style={{
              userSelect: "none",
            }}
            className="w-full flex items-center justify-center gap-5 mt-5"
          >
            <button
              onClick={handleSubmit}
              className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-green-800 via-green-600 to-green-400 hover:bg-gradient-to-t hover:from-green-400 hover:via-green-600 hover:to-green-800 hover:scale-110 transition-all duration-300"
            >
              CHANGE PASSWORD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
