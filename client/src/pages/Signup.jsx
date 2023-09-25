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

    formData.append('fullname', signupDetails.fullname)
    formData.append('email', signupDetails.email)
    formData.append('password', signupDetails.password)
    formData.append('avatar', signupDetails.avatar)

    const res = await dispatch(createUser(formData));

    if (res?.payload?.data?.success) {
      navigate("/");
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
      <div className="flex justify-center items-center min-h-[100vh] w-full">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center w-[38%] p-5 shadow-formshadow bg-white rounded-xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-blue-500">
            Registration
          </h1>

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
            className="w-[80%] p-2 bg-transparent border-b-[2px] border-sky-500 focus:outline-none focus:bg-sky-100 focus:rounded-lg placeholder:font-semibold font-bold text-green-900 my-3"
            type="text"
            name="fullname"
            placeholder="Enter your full name"
          />

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
            Create Account
          </button>
          <p className="text-gray-500 font-bold text-[15px] tracking-wide my-3">Already have an account ? <span type='button' className="text-sky-500 underline cursor-pointer text-[16px] hover:text-sky-600 hover:scale-110"><Link to={'/signin'}>Login</Link></span></p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
