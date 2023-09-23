import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SignUp() {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState();
  const [viewPassword, setViewpassword] = useState(false);

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullname: "",
    password: "",
    avatar: "",
  });

  function handlePassView() {
    setViewpassword(viewPassword ? false : true);
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh] w-full">
        <form
          noValidate
          className="flex flex-col items-center w-[40%] p-12 shadow-formshadow bg-white rounded-xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-blue-500">
            Registration
          </h1>
          {previewImage ? (
            <img src="" alt="" />
          ) : (
            <label htmlFor="avatar">
              <FaUserCircle
                aria-label="avatar"
                className="w-28 h-28 cursor-pointer rounded-full border-[1px] border-red-300 hover:border-red-400 text-gray-400 hover:text-gray-600"
              />
              <FaEdit className="relative text-4xl -right-20 -top-8 text-red-300 cursor-pointer hover:text-red-400" />
            </label>
          )}

          <input
            className="w-[80%] p-2 bg-inherit border-b-[2px] border-sky-500 focus:outline-none focus:bg-sky-100 focus:rounded-lg placeholder:font-semibold font-bold text-green-900 my-3"
            type="text"
            name="fullname"
            placeholder="Enter your full name"
          />

          <input
            className="w-[80%] p-2 bg-inherit border-b-[2px] border-sky-500 focus:outline-none focus:bg-sky-100 focus:rounded-lg placeholder:font-semibold font-bold text-green-900 my-3"
            type="email"
            name="email"
            placeholder="Enter your Email"
          />

          <div className="w-[80%] p-2 bg-inherit border-b-[2px] border-sky-500 focus:bg-sky-100 focus:rounded-lg placeholder:font-semibold font-bold text-green-900 my-3 flex">
            <input
              className="bg-inherit focus:outline-none w-full"
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="Choose your Password"
            />
            {viewPassword ? (
              <FiEye onClick={handlePassView} />
            ) : (
              <FiEyeOff onClick={handlePassView} />
            )}
          </div>

          <button className="btn font-bold">Create Account</button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
