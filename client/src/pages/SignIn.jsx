import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { isEmail, isValidPassword } from "../helpers/RegexMatcher";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [viewPassword, setViewpassword] = useState(false);
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });

  function handlePassView() {
    setViewpassword(viewPassword ? false : true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSigninDetails({ ...signinDetails, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!signinDetails.email || !signinDetails.password) {
      toast.error("Please Fill all the field");
      return;
    }

    if (!isEmail(signinDetails.email)) {
      toast.error("Invalid Email, Please Enter Valid Email");
      return;
    }

    const res = await dispatch(login(signinDetails));

    if (res?.payload?.data?.success) {
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-[100vh] w-full">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center w-[38%] p-5 shadow-formshadow bg-white rounded-xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-blue-500">Sign In</h1>

          <input
            onChange={handleChange}
            className="w-[80%] p-2 bg-transparent border-b-[2px] border-sky-500 focus:outline-none focus:bg-sky-100 focus:rounded-lg placeholder:font-semibold font-bold text-green-900 my-3"
            type="email"
            name="email"
            placeholder="Enter your Email"
          />

          <div className="w-[80%] p-2 bg-transparent border-b-[2px] border-sky-500 focus-within:bg-sky-100 focus-within:rounded-lg text-green-900 my-3 flex">
            <input
              onChange={handleChange}
              className="bg-transparent focus:outline-none w-full placeholder:font-semibold font-bold"
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="Choose your Password"
            />
            {viewPassword ? (
              <FiEye className="text-xl" onClick={handlePassView} />
            ) : (
              <FiEyeOff className="text-xl" onClick={handlePassView} />
            )}
          </div>

          <button className="btn bg-blue-500 text-white font-bold border-4 border-transparent hover:bg-blue-700 hover:border-green-700 focus:scale-110 hover:scale-110 mt-5">
            Login
          </button>
          <p className="text-gray-500 font-bold text-[15px] tracking-wide my-3">
            Create new account.{" "}
            <span
              type="button"
              className="text-sky-500 underline cursor-pointer text-[16px] hover:text-sky-600 hover:scale-110 ml-1"
            >
              <Link to={"/signup"}>SingUp</Link>
            </span>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignIn;
