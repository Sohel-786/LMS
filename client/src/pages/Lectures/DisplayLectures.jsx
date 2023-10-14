import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../redux/slices/lectureSlice";
import { nanoid } from "nanoid";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import toast from "react-hot-toast";
import { FiChevronRight } from "react-icons/fi";

function DisplayLectures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((s) => s?.lectures);
  const { role } = useSelector((s) => s?.auth);
  const [currentId, setCurrentId] = useState(0);
  const [focus, setFocus] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  function handleShow(lectureData) {
    setData({ ...lectureData });
    disableBodyScroll("document");
    const deleteLecture = document.getElementById("deleteLecture");
    deleteLecture.style.display = "flex";
  }

  function handleCancel() {
    setData({});
    enableBodyScroll("document");
    const deleteLecture = document.getElementById("deleteLecture");
    deleteLecture.style.display = "none";
  }

  async function handleDelete(id) {
    const deleteLecture = document.getElementById("deleteLecture");

    if (!id || !state._id) {
      toast.error("Something Went Wrong");
      deleteLecture.style.display = "none";
      setData({});
      enableBodyScroll("document");
      return;
    }

    const res = await dispatch(
      deleteCourseLecture({ courseId: state._id, lectureId: id })
    );
    if (res?.payload?.data?.success) {
      toast("Done", {
        style: {
          borderRadius: "10px",
          background: "#004cff",
          color: "white",
        },
      });
    }

    deleteLecture.style.display = "none";
    setData({});
    enableBodyScroll("document");
  }
  return (
    <HomeLayout>
      <div className={` ${role === "ADMIN" ? "mt-14" : "mt-14"}`}>
        <p className="flex items-center font-slab text-sm pl-4 md:pl-9 lg:pl-12">
          <span
            className="cursor-pointer text-red-600 hover:underline hover:text-red-800"
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </span>
          <FiChevronRight className="text-red-600" />
          <span className="text-indigo-400">{state.title}</span>
        </p>
      </div>
      <div
        className={`w-full flex flex-col sm:flex-row px-3 md:pl-4 lg:pl-12 md:pr-2 lg:pr-4 mb-2`}
      >
        <div
          id="deleteLecture"
          className="hidden fixed h-[100vh] w-[100vw] top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-[#0000007a] to-[#0000007a] justify-center items-center z-50"
        >
          <div className="w-[40%] rounded-lg bg-white py-6 px-4 flex flex-col justify-center items-center gap-5">
            <h1 className="text-indigo-500 font-slab text-2xl">
              Do you really want to delete this{" "}
              <span className="text-red-600 text-3xl">?</span>
            </h1>
            <div
              className={`w-[90%] min-h-[100px] flex items-center cursor-pointer rounded-lg shadow-marquee px-2 bg-gray-100 gap-2`}
            >
              <video
                src={data?.lecture?.secure_url}
                className="w-[30%] h-full"
              ></video>
              <div className="flex flex-col gap-1 h-full py-3 px-1 w-[70%] justify-between">
                <h1 className="font-bold font-slab">
                  {data?.title?.length > 40
                    ? data?.title.slice(0, 40) + "..."
                    : data?.title}
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => {
                  handleDelete(data._id);
                }}
                className="px-5 py-2 font-bold font-roboto bg-gradient-to-t from-green-800 via-green-700 to-green-300 rounded-lg text-white hover:scale-110 transition-all duration-200 ease-in-out"
              >
                Yes
              </button>

              <button
                onClick={handleCancel}
                className="px-5 py-2 font-bold font-roboto bg-gradient-to-t from-red-800 via-red-700 to-red-300 rounded-lg text-white hover:scale-110 transition-all duration-200 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className=" w-full mt-5 sm:w-[60%] sm:mt-0">
          <video
            src={
              !lectures[currentId]
                ? ""
                : lectures[currentId]?.lecture?.secure_url
            }
            className="w-full md:h-[300px] lg:h-[390px]"
            controls
            autoPlay
          ></video>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold my-4 font-slab">
            {lectures[currentId]?.title}
          </h1>
          <p className="text-base lg:text-lg font-semibold font-sans text-gray-600">
            {lectures[currentId]?.description}
          </p>
        </div>

        <div className="w-full sm:w-[40%] flex flex-col mt-4 sm:mt-0">
          {role === "ADMIN" && (
            <button
              onClick={() => {
                navigate("/course/addlecture", { state: { ...state } });
              }}
              className="self-end py-2 px-5 relative sm:-top-6 text-roboto tracking-wide bg-gradient-to-t from-cyan-800 via-cyan-600 to-cyan-400 text-white font-bold rounded-lg hover:scale-110 transition-all duration-300 ease-in-out"
            >
              ADD LECTURE
            </button>
          )}
          <div className="w-full h-[400px] sm:h-[80%] overflow-y-auto flex flex-col items-center gap-4 sm:gap-3 sm:pl-2 py-6 sm:py-3">
            {lectures.map((el, idc) => {
              return (
                <div
                  onClick={() => {
                    setCurrentId(idc);
                    setFocus(idc);
                  }}
                  key={nanoid()}
                  className={
                    idc === focus
                      ? `w-[93%] sm:w-[90%] min-h-[100px] flex items-center cursor-pointer rounded-lg shadow-marquee px-2 gap-2 scale-105 bg-cyan-500 text-white`
                      : `w-[90%] min-h-[100px] flex items-center cursor-pointer rounded-lg shadow-marquee px-2 bg-gray-100 gap-2 hover:scale-110 hover:bg-sky-100 transition-all duration-300 ease-in-out`
                  }
                >
                  <video className="w-[30%] h-full">
                    <source src={el?.lecture?.secure_url} type="video/mp4" />
                  </video>
                  <div className="flex flex-col gap-1 h-full py-3 px-1 w-[70%] justify-between">
                    <h1 className="font-bold font-slab text-sm lg:text-base">
                      {el.title.length > 40
                        ? el.title.slice(0, 40) + "..."
                        : el.title}
                    </h1>
                    <p
                      className={`font-semibold font-roboto tracking-wide flex justify-between items-center w-full ${
                        focus === idc ? "text-red-800" : "text-indigo-600"
                      }`}
                    >
                      {el?.lecture?.duration}
                      {role === "ADMIN" && (
                        <RiDeleteBin6Fill
                          onClick={() => {
                            handleShow(el);
                          }}
                          className="text-lg md:text-xl lg:text-2xl self-end text-green-700 hover:text-red-600 hover:scale-125 transition-all duration-200 ease-in-out"
                        />
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
