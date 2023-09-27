import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { PiShootingStarFill } from "react-icons/pi";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
import { useSelector } from "react-redux";

function CourseDescription() {
  const { state } = useLocation();
  const { role, data, isLoggedIn } = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-col bg-gradient-to-r from-stone-900 via-[#810CA8] to-blue-700 h-[300px] px-6 w-[100%] relative">
          <h1 className="flex justify-center items-center gap-2 text-[46px] font-bold">
            <PiShootingStarFill className="text-yellow-400" />
            Become Master In {state.title}
          </h1>
          <h3 className="text-cyan-500 text-4xl my-6 font-bold">
            ( Extensive Learning Course ){" "}
            <span className="bg-yellow-500 px-4 py-1 text-base font-black text-stone-800 rounded-2xl">
              REMOTE
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-2 justify-center items-center my-12 px-20 ">
          <div className="rounded-xl overflow-hidden bg-[#f6ede7]">
            <div className="rounded-xl overflow-hidden">
              <img
                src={state?.thumbnail?.secure_url}
                alt={"Course Thumbnail"}
              />
            </div>

            <div className="flex flex-col justify-center items-center my-6">
              <h1 className="text-[22px] text-stone-800 font-bold flex justify-center items-center gap-1">
                Your Instructor Will Be{" "}
                <span className="text-yellow-600">{state.createdBy}</span>
                <BsFillBookmarkStarFill className="text-green-600" />
              </h1>

              <h1 className="text-xl text-slate-500 my-2 font-bold flex justify-center items-center gap-1">
                There are{" "}
                <span className="text-yellow-600">
                  {state.numberofLectures}
                </span>{" "}
                Lectures.
                <RiVideoFill className="text-red-600" />
              </h1>
            </div>

            <div className="px-10 pb-7">
              {role === "ADMIN" ? (
                <button
                  className="bg-green-500 py-[10px] text-white w-full rounded-lg mt-2 text-lg font-bold tracking-wider hover:scale-110 transition-all duration-300 active:scale-95 ease-in-out hover:bg-gradient-to-r from-green-700 via-green-600 to-green-700 border-transparent"
                  onClick={() => {
                    navigate("/course/lectures");
                  }}
                >
                  View Lectures
                </button>
              ) : data?.subscription?.status === "active" ? (
                <button
                  className="bg-green-500 py-[10px] text-white w-full rounded-lg mt-2 text-lg font-bold tracking-wider hover:scale-110 transition-all duration-300 active:scale-95 ease-in-out hover:bg-gradient-to-r from-green-700 via-green-600 to-green-700 border-transparent"
                  onClick={() => {
                    navigate("/course/lectures");
                  }}
                >
                  View Lectures
                </button>
              ) : (
                <button
                  className="bg-red-500 py-[10px] text-white w-full rounded-lg mt-2 text-lg font-bold tracking-wider hover:scale-110 transition-all duration-300 active:scale-95 ease-in-out hover:bg-gradient-to-r from-red-700 via-red-600 to-red-700 border-transparent"
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate("/signin");
                    } else {
                      navigate("/checkout");
                    }
                  }}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
