import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiEdit, BiSolidEdit } from "react-icons/bi";
import { TbDeviceDesktopCancel } from "react-icons/tb";
import { useState } from "react";
import { MdFreeCancellation } from "react-icons/md";
import { GiSave } from "react-icons/gi";
import { getUserDetails, updateUser } from "../redux/slices/authSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { avatar, fullname, email, createdAt } = useSelector(
    (s) => s?.auth?.data
  );

  const [editable, setEditable] = useState(false);
  const [enableSave, setEnableSave] = useState(false);

  const [viewPassChange, setViewPassChange] = useState(false);

  const [formData, setFormdata] = useState({
    fullname: fullname,
    avatar: null,
    previewImage: avatar.secure_url,
  });

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

  return (
    <div className="flex flex-col items-center w-full h-[900px]">
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

      <div className="w-[90%] h-[90%] sm:h-[500px] flex flex-col lg:flex-row justify-center items-center shadow-profile my-8 rounded-lg">
        <div
          style={{ userSelect: "none" }}
          className="flex flex-col w-full h-[43%] lg:h-full lg:items-center lg:w-1/2 lg:justify-normal"
        >
          <div className="w-full p-3 h-[20%] sm:h-auto">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-300 ease-in-out w-fit px-4 py-2 active:scale-90 active:duration-100 active:bg-stone-200"
            >
              <FaArrowLeftLong size={"36px"} className="text-stone-500" />
            </div>
          </div>

          <div className="flex justify-center items-center w-full h-[80%] sm:h-auto">
            <div
              style={{
                backgroundImage: `url(${formData.previewImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="w-[230px] h-[230px] rounded-full border-[1px] border-transparent hover:border-pink-400 lg:w-[350px] lg:h-[350px]"
            >
              <label htmlFor="profile" className="hidden sm:inline-block">
                <BiSolidEdit
                  hidden={!editable}
                  size={"80px"}
                  className="relative left-60 top-[270px] text-pink-500 hover:text-green-700 transition-colors duration-300 ease-in-out"
                />
              </label>

              <label htmlFor="profile" className="inline-block sm:hidden">
                <BiSolidEdit
                  hidden={!editable}
                  size={"60px"}
                  className="relative left-36 top-44 text-pink-500 hover:text-green-700 transition-colors duration-300 ease-in-out"
                />
              </label>
            </div>
          </div>

          <div>
            <input onChange={handleImage} type="file" hidden id="profile" />
          </div>
        </div>

        <div className="flex flex-col px-5 py-4 w-full h-[57%] lg:w-1/2 lg:h-full">
          <div className="w-full sm:h-[20%]">
            <p className="float-right font-slab text-stone-500">
              Joined On {createdAt.slice(0, 10)}
            </p>
          </div>

          <div className="w-full flex flex-col gap-5 justify-center sm:pb-16 sm:h-[80%]">
            <fieldset
              style={{
                userSelect: "none",
                border: editable ? "2px solid #4f46e5" : "2px solid #e5e7eb",
              }}
              className="w-full border-[2px] px-2 sm:px-4 pb-1 sm:pb-2 rounded-xl"
            >
              <legend className="font-slab text-stone-500 sm:text-lg">
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
                className="capitalize text-xl w-full font-roboto font-semibold tracking-wide outline-none border-none focus:outline-none focus:ring-0 bg-transparent sm:text-4xl"
              />
            </fieldset>

            <fieldset className="w-[90%] border-[2px] px-4 py-2 pb-3 select-none sm:select-auto sm:py-3 rounded-xl cursor-not-allowed">
              <legend className="font-slab text-stone-500 sm:text-lg">
                Email
              </legend>
              <h1 className="text-xl font-roboto font-semibold tracking-wide">
                {email}
              </h1>
            </fieldset>

            {viewPassChange ? (
              <div>
                <div className="w-[95%] p-2 bg-transparent flex justify-center items-center border-b-[2px] border-sky-500 my-3 focus-within:border-sky-300 sm:w-[80%]">
                  <input
                    onChange={handleChange}
                    className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    placeholder="Choose your Password"
                  />
                  {viewPassword ? (
                    <span type="button">
                      <FiEye
                        aria-label="eyeOn"
                        className="text-2xl"
                        onClick={handlePassView}
                      />
                    </span>
                  ) : (
                    <span type="button">
                      <FiEyeOff
                        aria-label="eyeOff"
                        className="text-2xl"
                        onClick={handlePassView}
                      />
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setViewPassChange(true);
                }}
                className="bg-gradient-to-t from-sky-800 via-sky-600 to-sky-400 w-fit px-5 py-2 text-lg font-slab text-white rounded-xl border-2 border-white mt-2 hover:scale-110 transition-all duration-300 ease-in-out shadow-marquee hover:bg-gradient-to-t hover:from-sky-400 hover:via-sky-600 hover:to-sky-800"
              >
                Change your password
              </button>
            )}

            <div className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 sm:mt-6">
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
                    className="flex justify-center items-center rounded-xl bg-gradient-to-t from-stone-800 via-stone-600 to-stone-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-stone-900 hover:via-stone-700 hover:to-stone-500  py-2 gap-2 px-4 sm:text-xl sm:px-5"
                  >
                    <MdFreeCancellation size={"22px"} />
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={!enableSave}
                    className="flex justify-center items-center rounded-xl bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-green-900 hover:via-green-700 hover:to-green-500 disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:from-red-800 disabled:to-red-500 py-2 gap-2 px-4 sm:text-xl sm:px-5"
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
                    className="flex justify-center items-center rounded-xl bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-green-900 hover:via-green-700 hover:to-green-500 py-2 gap-2 px-4 sm:text-xl sm:px-5"
                  >
                    <BiEdit size={"22px"} />
                    Edit Profile
                  </button>

                  <button className="flex justify-center items-center rounded-xl bg-gradient-to-b from-red-800 via-red-600 to-red-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-red-900 hover:via-red-700 hover:to-red-500 py-2 gap-2 px-4 sm:text-xl sm:px-5">
                    <TbDeviceDesktopCancel size={"22px"} />
                    Cancel Subscription
                  </button>
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
