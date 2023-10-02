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
          className="flex flex-col items-center w-[38%] p-5 shadow-formshadow bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl text-white"
        >
          <img className="w-[200px] aspect-auto mb-8" src="/assets/Sign In.svg" alt="sign In" />

          <input
            onChange={handleChange}
            className="w-[80%] py-4 px-5 bg-transparent border-t-0 border-r-0 border-l-0 border-b-[2px] border-sky-500 focus:border-sky-300 focus:outline-none placeholder:font-semibold focus:ring-0 font-bold my-3"
            type="email"
            name="email"
            placeholder="Enter your Email"
          />

          <div className="w-[80%] p-2 bg-transparent flex justify-center items-center border-b-[2px] border-sky-500 my-3 focus-within:border-sky-300">
            <input
              onChange={handleChange}
              className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="Choose your Password"
            />
            {viewPassword ? (
              <span type="button"><FiEye aria-label="eyeOn" className="text-2xl" onClick={handlePassView} /></span>
            ) : (
              <span type="button"><FiEyeOff aria-label="eyeOff" className="text-2xl" onClick={handlePassView} /></span>
              
            )}
          </div>

          <button className="btn bg-blue-500 text-white font-bold hover:bg-blue-600 focus:scale-110 hover:scale-110 mt-5">
            Login
          </button>
          <p className=" font-bold text-[15px] tracking-wide my-3">
            Create new account.{" "}
            <span
              type="button"
              className="text-sky-300 underline cursor-pointer text-[16px] hover:text-sky-400 hover:scale-110 ml-1"
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
