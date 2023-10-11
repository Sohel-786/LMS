import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiEdit, BiSolidEdit } from "react-icons/bi";
import { TbDeviceDesktopCancel } from "react-icons/tb";
import { useState } from "react";
import { MdFreeCancellation } from "react-icons/md";
import { GiSave } from "react-icons/gi";
import { getUserDetails, updateUser } from "../redux/slices/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { RiCloseCircleFill } from "react-icons/ri";
import ForgotPassword from "../components/Password/ForgotPassword";
import { cancelSubscription } from "../redux/slices/paymentSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { avatar, fullname, email, createdAt, subscription } = useSelector(
    (s) => s?.auth?.data
  );

  const [editable, setEditable] = useState(false);
  const [enableSave, setEnableSave] = useState(false);

  const [forgotPassView, setForgotPassView] = useState(false);

  const [viewPassChange, setViewPassChange] = useState(false);
  const [viewOldPassword, setViewOldpassword] = useState(false);
  const [viewNewPassword, setViewNewpassword] = useState(false);

  const [formData, setFormdata] = useState({
    fullname: fullname,
    avatar: null,
    previewImage: avatar.secure_url,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleOldPassView() {
    setViewOldpassword(!viewOldPassword);
  }
  function handleNewPassView() {
    setViewNewpassword(!viewNewPassword);
  }

  function handleImage(e) {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;

    setFormdata((s) => {
      return { ...s, avatar: uploadedImage };
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      let result = this.result;
      setFormdata((s) => {
        return { ...s, previewImage: result };
      });
    });

    setEnableSave(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
    setEnableSave(true);
  }

  // For Change Password
  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }
  async function handleSubmit() {
    if (formData.fullname === fullname && !formData.avatar) {
      return;
    }

    const data = new FormData();
    data.append("fullname", formData.fullname);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    const res = await dispatch(updateUser(data));

    if (res?.payload?.data?.success) {
      await dispatch(getUserDetails());
    }

    setEditable(false);
  }

  async function handlePasswordSubmit() {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      toast.error("Please fill the password field");
      return;
    }

    try {
      const res = axiosInstance.post("/user/changepassword", passwordData);
      toast.promise(res, {
        loading: "Wait! Changing your password",
        success: (data) => {
          return data?.data?.message;
        },
        error: (data) => {
          let msg = data?.response?.data?.message;
          if (msg === "Invalid Old Password") {
            return "Please Enter Correct Old Password";
          }

          if (
            msg ===
            "Password must be 6 to 16 characters long with at least a number and symbol"
          ) {
            return "Please Create a Strong Password";
          }

          return "Something Went Wrong";
        },
      });

      const response = await res;

      if (response?.data?.success) {
        setViewPassChange(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  function handleFullImageView() {
    disableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "flex";
  }

  function handleFullViewclose() {
    enableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "none";
  }

  function handleBlur() {
    const profileBtn = document.querySelector("#profileBtn");
    const profileImage = document.querySelector("#profileImage");
    profileImage.style.filter = "blur(3px)";
    profileBtn.style.display = "block";
  }

  function handleBlurRemove() {
    const profileBtn = document.querySelector("#profileBtn");
    const profileImage = document.querySelector("#profileImage");
    profileImage.style.filter = "blur(0)";
    profileBtn.style.display = "none";
  }

  function ShowForgotPass() {
    const changePass = document.getElementById("changePass");
    changePass.style.display = "none";

    const forgotPass = document.getElementById("forgotPass");
    forgotPass.style.display = "flex";
  }

  function hideForgotPass() {
    const changePass = document.getElementById("changePass");
    changePass.style.display = "flex";

    const forgotPass = document.getElementById("forgotPass");
    forgotPass.style.display = "none";
  }

  async function handleCancelBundle() {
    const res = await dispatch(cancelSubscription());
    if(res?.payload?.data?.success){
      await dispatch(getUserData());
      toast.success("Cancellation complete");
      navigate("/");
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

      <div className="w-[90%] h-[90%] lg:h-[470px] flex flex-col lg:flex-row justify-center items-center shadow-profile my-8 rounded-lg">
        <div
          style={{ userSelect: "none" }}
          className="flex flex-col w-full h-[43%] items-center lg:h-full lg:items-center lg:w-1/2 lg:justify-normal"
        >
          <div className="w-full p-3 h-[20%] lg:h-auto">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-300 ease-in-out w-fit px-4 py-2 active:scale-90 active:duration-100 active:bg-stone-200"
            >
              <FaArrowLeftLong size={"36px"} className="text-stone-500" />
            </div>
          </div>

          <div
            onMouseOver={handleBlur}
            onMouseOut={handleBlurRemove}
            className="flex flex-col justify-center items-center h-[80%] lg:h-auto w-fit rounded-full"
          >
            <div
              id="profileImage"
              style={{
                backgroundImage: `url(${formData.previewImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="w-[230px] h-[230px] rounded-full border-[1px] border-transparent hover:border-pink-400 lg:w-[350px] lg:h-[350px] "
            ></div>

            <div id="profileBtn" className="hidden absolute flex-col gap-2">
              <button
                onClick={handleFullImageView}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-cyan-400 hover:text-white hover:border-transparent"
              >
                VIEW
              </button>
            </div>
          </div>

          {/* this for the small screens  */}
          <label htmlFor="profile" className="inline-block lg:hidden">
            <BiSolidEdit
              hidden={!editable}
              size={"60px"}
              className="relative -top-14 left-14 text-pink-500 hover:text-green-700 transition-colors duration-300 ease-in-out"
            />
          </label>

          {/* this for the large screens */}
          <label htmlFor="profile" className="hidden lg:inline-block">
            <BiSolidEdit
              hidden={!editable}
              size={"80px"}
              className="relative -top-20 left-24 text-pink-500 hover:text-green-700 transition-colors duration-300 ease-in-out cursor-pointer"
            />
          </label>

          <div>
            <input onChange={handleImage} type="file" hidden id="profile" />
          </div>
        </div>

        {/* Full View of Profile Image */}
        <div
          id="fullView"
          className="fixed top-0 right-0 left-0 bottom-0 hidden z-50 bg-black flex-col justify-center items-center"
        >
          <RiCloseCircleFill
            onClick={handleFullViewclose}
            size={"50px"}
            className="absolute top-3 right-8 cursor-pointer text-red-600 hover:text-red-800 bg-black border-[2px] border-transparent rounded-full hover:border-white"
          />
          <img
            className="max-h-full aspect-auto"
            src={formData.previewImage}
            alt="Preview Profile Image"
          />
        </div>

        <div className="flex flex-col px-5 py-4 w-full h-[57%] lg:w-1/2 lg:h-full">
          <div className="w-full lg:h-[20%]">
            <p className="float-right font-slab text-stone-500">
              Joined On {createdAt.slice(0, 10)}
            </p>
          </div>

          <div className="w-full flex flex-col gap-5 justify-center lg:pb-16 lg:h-[80%]">
            <fieldset
              style={{
                userSelect: "none",
                border: editable ? "2px solid #4f46e5" : "2px solid #e5e7eb",
              }}
              className="w-full border-[2px] px-2 lg:px-4 pb-1 lg:pb-2 rounded-xl"
            >
              <legend className="font-slab text-stone-500 lg:text-lg">
                Name
              </legend>

              <input
                spellCheck="false"
                style={{
                  caretColor: editable ? "green" : "transparent",
                  color: editable ? "#4f46e5" : "inherit",
                }}
                contentEditable={editable}
                name="fullname"
                id="fullname"
                onChange={handleChange}
                value={formData.fullname}
                className="capitalize text-xl w-full font-roboto font-semibold tracking-wide outline-none border-none focus:outline-none focus:ring-0 bg-transparent lg:text-4xl"
              />
            </fieldset>

            <fieldset className="w-[90%] border-[2px] px-4 py-2 pb-3 select-none lg:select-auto lg:py-3 rounded-xl cursor-not-allowed">
              <legend className="font-slab text-stone-500 lg:text-lg">
                Email
              </legend>
              <h1 className="text-xl font-roboto font-semibold tracking-wide">
                {email}
              </h1>
            </fieldset>

            {/* Change Password Input and Button Container */}
            {viewPassChange ? (
              // change password section
              <div className="top-0 right-0 bottom-0 left-0 fixed bg-gradient-to-r from-[#00000095] to-[#00000095] flex justify-center items-center z-30">
                <div
                  id="changePass"
                  className="flex flex-col justify-center w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-xl py-5 px-6"
                >
                  <label
                    htmlFor="oldpassword"
                    className="font-slab text-gray-600 mt-4 mb-2 pl-1"
                  >
                    Enter your old password
                  </label>

                  <div className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-red-600 rounded-xl ">
                    <input
                      onChange={handlePasswordChange}
                      className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
                      type={viewOldPassword ? "text" : "password"}
                      name="oldPassword"
                      id="oldpassword"
                      value={passwordData.oldPassword}
                    />
                    {viewOldPassword ? (
                      <span type="button">
                        <FiEye
                          aria-label="eyeOn"
                          className="text-xl"
                          onClick={handleOldPassView}
                        />
                      </span>
                    ) : (
                      <span type="button">
                        <FiEyeOff
                          aria-label="eyeOff"
                          className="text-xl"
                          onClick={handleOldPassView}
                        />
                      </span>
                    )}
                  </div>
                  <label
                    htmlFor="newpassword"
                    className="font-slab text-gray-600 mt-4 mb-2 pl-1"
                  >
                    Create new password
                  </label>

                  <div className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-red-600 rounded-xl ">
                    <input
                      onChange={handlePasswordChange}
                      className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
                      type={viewNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="newpassword"
                      value={passwordData.newPassword}
                    />
                    {viewNewPassword ? (
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

                  <div className="w-full pl-1 mt-2 flex justify-end">
                    <p
                      type="button"
                      onClick={ShowForgotPass}
                      className="text-[#1877f2] text-lg font-semibold cursor-pointer hover:underline"
                    >
                      Forgotten password?
                    </p>
                  </div>

                  <div
                    style={{
                      userSelect: "none",
                    }}
                    className="w-full flex items-center gap-5 mt-1"
                  >
                    <button
                      onClick={handlePasswordSubmit}
                      className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-sky-800 via-sky-600 to-sky-400 hover:bg-gradient-to-t hover:from-sky-400 hover:via-sky-600 hover:to-sky-800 hover:scale-110 transition-all duration-300"
                    >
                      SUBMIT
                    </button>

                    <button
                      onClick={() => {
                        setPasswordData({
                          oldPassword: "",
                          newPassword: "",
                        });
                        setViewPassChange(false);
                      }}
                      className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-orange-800 via-orange-600 to-orange-400 hover:bg-gradient-to-t hover:from-orange-400 hover:via-orange-600 hover:to-orange-800 hover:scale-110 transition-all duration-300"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>

                {/* forgot password container */}

                <ForgotPassword hideForgotPass={hideForgotPass} />
              </div>
            ) : (
              <button
                style={{
                  userSelect: "none",
                }}
                onClick={() => {
                  setViewPassChange(true);
                }}
                className="bg-gradient-to-t from-sky-800 via-sky-600 to-sky-400 w-fit px-5 py-2 text-lg font-slab text-white rounded-xl border-2 border-white mt-2 hover:scale-110 transition-all duration-300 ease-in-out shadow-marquee hover:bg-gradient-to-t hover:from-sky-400 hover:via-sky-600 hover:to-sky-800"
              >
                Change your password
              </button>
            )}

            {/* Profile buttons, for save, edit, cancel */}
            <div
              style={{
                userSelect: "none",
              }}
              className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mt-4 lg:mt-6"
            >
              {editable ? (
                <>
                  <button
                    onClick={() => {
                      setEditable(false);
                      setFormdata({
                        fullname: fullname,
                        previewImage: avatar.secure_url,
                      });
                      setEnableSave(false);
                    }}
                    className="flex justify-center items-center rounded-xl bg-gradient-to-t from-stone-800 via-stone-600 to-stone-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-stone-900 hover:via-stone-700 hover:to-stone-500  py-2 gap-2 px-4 lg:text-xl lg:px-5"
                  >
                    <MdFreeCancellation size={"22px"} />
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={!enableSave}
                    className="flex justify-center items-center rounded-xl bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-green-900 hover:via-green-700 hover:to-green-500 disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:from-red-800 disabled:to-red-500 py-2 gap-2 px-4 lg:text-xl lg:px-5"
                  >
                    <GiSave size={"22px"} />
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    aria-label="fullname"
                    onClick={() => {
                      setEditable(true);
                    }}
                    className="flex justify-center items-center rounded-xl bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-green-900 hover:via-green-700 hover:to-green-500 py-2 gap-2 px-4 lg:text-xl lg:px-5"
                  >
                    <BiEdit size={"22px"} />
                    Edit Profile
                  </button>

                  {subscription && subscription?.status && subscription?.status === 'active' && <button
                    onClick={handleCancelBundle}
                    className="flex justify-center items-center rounded-xl bg-gradient-to-b from-red-800 via-red-600 to-red-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-red-900 hover:via-red-700 hover:to-red-500 py-2 gap-2 px-4 lg:text-xl lg:px-5"
                  >
                    <TbDeviceDesktopCancel size={"22px"} />
                    Cancel Subscription
                  </button>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
