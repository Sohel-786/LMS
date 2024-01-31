import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { isEmail, isValidPassword } from "../helpers/RegexMatcher";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/slices/authSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState();
  const [viewPassword, setViewpassword] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullname: "",
    password: "",
    avatar: "",
    role: "USER",
  });

  function handlePassView() {
    setViewpassword(viewPassword ? false : true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.avatar ||
      !signupDetails.role ||
      !signupDetails.fullname
    ) {
      toast.error("Please Fill all the field");
      return;
    }

    if (signupDetails.fullname.length < 5) {
      toast.error("Name Should at least 5 characters long");
      return;
    }

    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid Email, Please Enter Valid Email");
      return;
    }

    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Password Must be 6 to 16 character long with atleast a number and symbol"
      );
      return;
    }

    const formData = new FormData();

    formData.append("fullname", signupDetails.fullname);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("avatar", signupDetails.avatar);
    formData.append("role", signupDetails.role);

    const res = await dispatch(createUser(formData));

    if (res?.payload?.data?.success) {
      navigate("/");
      setSignupDetails({
        email: "",
        fullname: "",
        password: "",
        avatar: "",
        role: "USER",
      })
    }
  }

  function handleImage(e) {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    setSignupDetails({
      ...signupDetails,
      avatar: uploadedImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center my-16 w-full">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center w-[90%] p-5 shadow-formshadow bg-gradient-to-r from-zinc-950 to-zinc-700 rounded-xl text-white md:w-[65%] lg:w-[38%]"
        >
          <img
            className="w-[240px] sm:w-[270px] aspect-auto mb-5 select-none"
            src="/assets/signUp.svg"
            alt="sign In"
          />

          {previewImage ? (
            <div className="flex flex-col">
              <img
                className="max-w-28 max-h-28 rounded-full m-auto "
                src={previewImage}
                alt="userImage"
              />
              <label htmlFor="avatar">
                <FaEdit className="relative text-4xl -right-20 -top-8 text-red-300 cursor-pointer hover:text-red-400" />
              </label>
            </div>
          ) : (
            <label htmlFor="avatar">
              <FaUserCircle className="w-28 h-28 cursor-pointer rounded-full border-[1px] border-red-300 hover:border-red-400 text-gray-400 hover:text-gray-600" />
              <FaEdit className="relative text-4xl -right-20 -top-8 text-red-300 cursor-pointer hover:text-red-400" />
            </label>
          )}

          <input
            onChange={handleImage}
            name="avatar"
            type="file"
            id="avatar"
            hidden
            accept=".jpg , .jpeg, .webp, .png, .svg"
          />

          <input
            onChange={handleChange}
            className="w-[95%] sm:w-[80%] px-3 py-3 bg-transparent border-b-[2px] border-t-0 border-l-0 border-r-0 focus:ring-0 border-sky-500 focus:outline-none focus:border-sky-500 placeholder:font-semibold font-bold my-3 capitalize"
            type="text"
            name="fullname"
            placeholder="Enter your full name"
          />

          <input
            onChange={handleChange}
            className="w-[95%] sm:w-[80%] px-3 py-3 bg-transparent border-t-0 border-l-0 border-r-0 border-b-[2px] focus:ring-0 focus:border-sky-500 border-sky-500 focus:outline-none placeholder:font-semibold font-bold my-3"
            type="email"
            name="email"
            placeholder="Enter your Email"
          />

          <select
            onChange={handleChange}
            name="role"
            className="w-[95%] sm:w-[80%] px-3 py-3 bg-transparent border-t-0 border-l-0 border-r-0 border-b-[2px] focus:ring-0 focus:border-sky-500 border-sky-500 focus:outline-none placeholder:font-semibold font-bold my-3"
          >
            <option value="USER" className="text-black">User</option>
            <option value="ADMIN" className="text-black">Admin</option>
          </select>

          <p className="text-xs w-[80%] font-semibold text-gray-300">
            Admin & User Role Can Be Defined From Here, Because It's A Personal
            Project.
          </p>

          <div className="w-[95%] sm:w-[80%] bg-transparent border-b-[2px] border-sky-500 my-3 flex justify-center items-center">
            <input
              onChange={handleChange}
              className="bg-transparent py-3 focus:outline-none border-none focus:ring-0 w-full placeholder:font-semibold font-bold"
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="Choose your Password"
            />
            {viewPassword ? (
              <span type="button">
                <FiEye
                  className="text-2xl"
                  aria-label="eye"
                  onClick={handlePassView}
                />
              </span>
            ) : (
              <span type="button">
                <FiEyeOff
                  className="text-2xl"
                  aria-label="eyeOff"
                  onClick={handlePassView}
                />
              </span>
            )}
          </div>

          <button
            aria-label="Submit Details"
            className="btn text-white py-2 px-5 rounded-lg transition-all duration-300 bg-blue-500 font-bold hover:bg-blue-600 focus:scale-110 hover:scale-110 mt-5"
          >
            Submit
          </button>
          <p className="font-bold text-[15px] tracking-wide my-4">
            Already have an account ?{" "}
            <span
              type="button"
              className="text-sky-300 underline cursor-pointer text-[16px] hover:text-sky-400 hover:scale-110"
            >
              <Link to={"/signin"}>Login</Link>
            </span>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
