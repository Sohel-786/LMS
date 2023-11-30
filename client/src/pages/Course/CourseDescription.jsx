import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { PiShootingStarFill } from "react-icons/pi";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { FcApproval } from "react-icons/fc";

function CourseDescription() {
  const { state } = useLocation();
  const { role, data, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex text-white justify-center items-center flex-col bg-gradient-to-r from-stone-900 via-[#980fc6] to-blue-600 h-[320px] gap-2 text-center sm:gap-0 sm:h-[300px] px-6 w-full py-3 sm:py-0">
          <h1 className="flex justify-center items-center gap-2 text-3xl font-bold sm:text-[46px]">
            <span className="hidden h-full sm:flex justify-center text-5xl">
              <PiShootingStarFill className="text-yellow-400" />
            </span>
            Become Master In {state.title}
          </h1>
          <span className="sm:hidden justify-center text-5xl">
            <PiShootingStarFill className="text-yellow-400" />
          </span>
          <h3 className="text-cyan-400 text-2xl font-bold sm:text-4xl sm:my-6">
            ( Extensive Learning Course ){" "}
            <span className="bg-yellow-500 px-4 py-1 text-sm font-slab text-stone-600 rounded-xl">
              REMOTE
            </span>
          </h3>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center my-12 lg:px-20 w-full lg:gap-0 lg:w-auto lg:grid lg:grid-cols-2">
          <div className="rounded-xl overflow-hidden bg-[#f6ede7] w-[90%] lg:w-auto">
            <div className="rounded-xl overflow-hidden w-full">
              <img
                src={state?.thumbnail?.secure_url}
                alt={"Course Thumbnail"}
                className="w-full aspect-auto"
              />
            </div>

            <div className="flex flex-col justify-center items-center my-6">
              <h1 className="text-lg text-stone-800 font-bold text-center sm:flex sm:justify-center sm:items-center gap-1 sm:text-[22px]">
                Your Instructor Will Be{" "}
                <span className="text-yellow-600">{state.createdBy}</span>
                <BsFillBookmarkStarFill className="text-green-600 inline-block ml-2 sm:m-0" />
              </h1>

              <h1 className="sm:text-xl text-lg text-slate-500 my-2 font-bold text-center sm:flex sm:justify-center sm:items-center gap-1">
                There are{" "}
                <span className="text-yellow-600">
                  {state.numberofLectures}
                </span>{" "}
                Lectures.
                <RiVideoFill className="text-red-600 inline-block ml-1 sm:m-0 sm:block" />
              </h1>
            </div>

            <div className="px-10 pb-7 text-white">
              {role === "ADMIN" ||
              (role === "USER" && data?.subscription?.status === "active") ? (
                <button
                  aria-label="View Lectures"
                  className="bg-green-500 py-[10px] w-full rounded-lg sm:mt-2 text-lg font-bold tracking-wider hover:scale-110 transition-all duration-300 active:scale-95 ease-in-out hover:bg-gradient-to-r from-green-700 via-green-600 to-green-700 border-transparent"
                  onClick={() => {
                    scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                    navigate("/course/lectures", { state: { ...state } });
                  }}
                >
                  View Lectures
                </button>
              ) : (
                <button
                  aria-label="Subscribe To Course"
                  className="bg-red-500 py-[10px] w-full rounded-lg sm:mt-2 text-lg font-bold tracking-wider hover:scale-110 transition-all duration-300 active:scale-95 ease-in-out hover:bg-gradient-to-r from-red-700 via-red-600 to-red-700 border-transparent"
                  onClick={() => {
                    if (!isLoggedIn) {
                      scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                      navigate("/signin", {
                        path: "/course-description",
                        state: { ...state },
                      });
                    } else {
                      scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                      navigate("/checkout");
                    }
                  }}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2 px-10 sm:gap-5">
            <h1 className="sm:text-4xl text-[32px] font-roboto font-black tracking-wide text-indigo-400">
              Course Description
            </h1>
            <p className="text-xl font-slab text-zinc-500 tracking-wider">
              {state.description}{" "}
              <span className="inline-block text-2xl relative top-[6px]">
                <FcApproval />
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
