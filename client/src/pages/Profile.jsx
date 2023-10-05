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

    console.log("reached");
    const res = await dispatch(updateUser(data));

    if (res?.payload?.data?.success) {
      console.log("sohel");
      await dispatch(getUserDetails());
    }

    setEditable(false);
  }

  return (
    <div className="flex flex-col items-center">
      <header className="flex justify-center items-center shadow-headershadow w-full">
        <div className="w-[160px] aspect-auto">
          <img
            className="w-full aspect-auto"
            src={"/assets/classroom.svg"}
            alt="logo"
          />
        </div>
      </header>

      <div className="w-[90%] h-[480px] flex justify-center items-center shadow-profile my-8 rounded-lg">
        <div
          style={{ userSelect: "none" }}
          className="flex flex-col items-center w-1/2 h-full"
        >
          <div className="w-full p-3">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-300 ease-in-out w-fit px-4 py-2 active:scale-90 active:duration-100 active:bg-stone-200"
            >
              <FaArrowLeftLong size={"36px"} className="text-stone-500" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div
              style={{
                backgroundImage: `url(${formData.previewImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="w-[350px] h-[350px] rounded-full border-[1px] border-transparent hover:border-pink-400 "
            >
              <label htmlFor="profile">
                <BiSolidEdit
                  hidden={!editable}
                  size={"80px"}
                  className="relative left-60 top-[270px] text-pink-500 hover:text-green-700 transition-colors duration-300 ease-in-out"
                />
              </label>
            </div>
          </div>

          <div>
            <input onChange={handleImage} type="file" hidden id="profile" />
          </div>
        </div>

        <div className="flex flex-col w-1/2 h-full px-5 py-4">
          <div className="w-full h-[20%]">
            <p className="float-right font-slab text-stone-500">
              Joined On {createdAt.slice(0, 10)}
            </p>
          </div>

          <div className="w-full h-[80%] flex flex-col gap-5 justify-center  pb-16">
            <fieldset
              style={{
                userSelect: "none",
              }}
              className="w-[80%] border-[2px] px-4 pb-2 rounded-xl"
            >
              <legend className="font-slab text-stone-500 text-lg">Name</legend>

              <input
                spellCheck="false"
                style={{
                  caretColor: editable ? "green" : "transparent",
                  borderBottom: editable
                    ? "2px solid #4f46e5"
                    : "2px solid transparent",
                  color: editable ? "#4f46e5" : "inherit",
                }}
                contentEditable={editable}
                name="fullname"
                onChange={handleChange}
                value={formData.fullname}
                className="capitalize text-4xl font-roboto font-semibold tracking-wide outline-none border-none focus:outline-none focus:ring-0 bg-transparent"
              />
            </fieldset>

            <fieldset className="w-[80%] border-[2px] px-4 py-3 rounded-xl cursor-not-allowed ">
              <legend className="font-slab text-stone-500 text-lg">
                Email
              </legend>
              <h1 className="text-xl font-roboto font-semibold tracking-wide">
                {email}
              </h1>
            </fieldset>

            <div className="w-full flex items-center gap-6 mt-8">
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
                    className="flex justify-center items-center gap-2 text-xl px-5 py-2 rounded-xl bg-gradient-to-t from-stone-800 via-stone-600 to-stone-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-stone-900 hover:via-stone-700 hover:to-stone-500"
                  >
                    <MdFreeCancellation size={"22px"} />
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={!enableSave}
                    className="flex justify-center items-center gap-2 text-xl px-5 py-2 rounded-xl bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-green-900 hover:via-green-700 hover:to-green-500 disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:from-red-800 disabled:to-red-500"
                  >
                    <GiSave size={"22px"} />
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditable(true);
                    }}
                    className="flex justify-center items-center gap-1 text-xl px-3 py-2 rounded-xl bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-green-900 hover:via-green-700 hover:to-green-500"
                  >
                    <BiEdit size={"22px"} />
                    Edit Profile
                  </button>{" "}
                  <button className="flex justify-center items-center gap-1 text-xl px-3 py-2 rounded-xl bg-gradient-to-b from-red-800 via-red-600 to-red-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-red-900 hover:via-red-700 hover:to-red-500">
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
