import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../redux/slices/lectureSlice";
import { nanoid } from "nanoid";

function DisplayLectures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((s) => s?.lectures);
  const { role } = useSelector((s) => s?.auth);
  const [currentId, setCurrentId] = useState(0);
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="w-full flex pl-12 pr-4 my-20">
        <div className="w-[60%] ">
          <video
            src={
              !lectures[currentId]
                ? ""
                : lectures[currentId]?.lecture?.secure_url
            }
            className="w-full h-[400px]"
            controls
            autoPlay
          ></video>
          <h1 className="text-3xl font-semibold my-4 font-slab">
            {lectures[currentId]?.title}
          </h1>
          <p className="text-lg font-semibold font-sans text-gray-600">
            {lectures[currentId]?.description}
          </p>
        </div>

        <div className="w-[40%] flex flex-col border-2 border-red-500 over">
          {role === "ADMIN" && (
            <button
              onClick={() => {
                navigate("/course/addlecture", { state: { ...state } });
              }}
              className="self-end py-2 px-5 relative -top-6 text-roboto tracking-wide bg-gradient-to-t from-cyan-800 via-cyan-600 to-cyan-400 text-white font-bold rounded-lg hover:scale-110 transition-all duration-300 ease-in-out"
            >
              ADD LECTURE
            </button>
          )}
          <div className="w-full h-[80%] flex flex-col items-center gap-3 pl-3">
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
                      ? `w-[90%] h-[115px] flex items-center cursor-pointer rounded-lg shadow-marquee px-2 gap-2 scale-105 bg-cyan-500 text-white`

                      : `w-[90%] h-[115px] flex items-center cursor-pointer rounded-lg shadow-marquee px-2 bg-gray-100 gap-2 hover:scale-110 hover:bg-sky-100 transition-all duration-300 ease-in-out`
                  }
                >
                  <video className="w-[30%] h-full">
                    <source src={el?.lecture?.secure_url} type="video/mp4" />
                  </video>
                  <div className="flex flex-col gap-1 h-full py-3 px-1 w-[70%]">
                    <h1 className="font-bold font-slab">
                      {el.title.length > 60
                        ? el.title.slice(0, 60) + "..."
                        : el.title}
                    </h1>
                    <p className={`font-semibold font-roboto tracking-wide ${focus === idc ? 'text-red-800' : 'text-indigo-600'}`}>
                      {el?.lecture?.duration}
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
