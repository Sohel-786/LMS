import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiEdit } from 'react-icons/bi';
import { TbDeviceDesktopCancel } from 'react-icons/tb';

function Profile() {
  const navigate = useNavigate();
  const { avatar, fullname, email, createdAt } = useSelector(
    (s) => s?.auth?.data
  );

  return (
    <div className="h-[100vh] flex flex-col items-center">
      <header className="flex justify-center items-center shadow-headershadow w-full">
        <div className="w-[160px] aspect-auto">
          <img
            className="w-full aspect-auto"
            src={"/assets/classroom.svg"}
            alt="logo"
          />
        </div>
      </header>

      <div className="w-[90%] h-[80%] flex justify-center items-center shadow-profile my-8 pb-16 rounded-lg">
        <div style={{userSelect : 'none'}} className="flex flex-col justify-center items-center w-1/2">
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
          <div
            style={{
              backgroundImage: `url(${avatar.secure_url})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            className="w-[350px] h-[350px] rounded-full border-[1px] border-transparent hover:border-pink-400 "
          ></div>
        </div>

        <div className="flex flex-col w-1/2 h-full px-5 py-4">
          <div className="w-full h-[20%]">
            <p className="float-right font-slab text-stone-500">
              Joined On {createdAt.slice(0, 10)}
            </p>
          </div>

          <div className="w-full h-[80%] flex flex-col gap-5 justify-center">
            <fieldset className="w-[80%] border-[2px] px-4 py-3 rounded-xl">
              <legend className="font-slab text-stone-500 text-lg">Name</legend>
              <h1 className="capitalize text-4xl font-roboto font-semibold tracking-wide">
                {fullname}
              </h1>
            </fieldset>

            <fieldset className="w-[80%] border-[2px] px-4 py-3 rounded-xl">
              <legend className="font-slab text-stone-500 text-lg">Email</legend>
              <h1 className="text-xl font-roboto font-semibold tracking-wide">
                {email}
              </h1>
            </fieldset>

            <div className="w-full flex items-center gap-6 mt-8">
              <button className="flex justify-center items-center gap-1 text-xl px-3 py-2 rounded-xl bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-green-900 hover:via-green-700 hover:to-green-500"><BiEdit size={'22px'} />Edit Profile</button>

              <button className="flex justify-center items-center gap-1 text-xl px-3 py-2 rounded-xl bg-gradient-to-b from-red-800 via-red-600 to-red-400 text-white font-bold hover:scale-110 transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-red-900 hover:via-red-700 hover:to-red-500"><TbDeviceDesktopCancel size={'22px'} />Cancel Subscription</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
