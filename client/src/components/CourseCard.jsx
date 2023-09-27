import { FaCheck } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdVideoLibrary } from "react-icons/md";

function CourseCard({ el }) {
  return (
    <div className="w-[380px] h-[560px] rounded-lg overflow-hidden bg-white hover:scale-105 transition-all duration-300">
      <div className="w-full h-[40%]">
        <img
          className="w-full aspect-auto max-h-full"
          src={el.thumbnail.secure_url}
          alt={"course"}
        />
      </div>
      <div className="flex flex-col justify-center px-6">
        <div className="flex justify-center flex-col">
          <h1 className="text-black font-bold text-[22px]">{el.title}</h1>
          <h3 className="text-gray-600 font-bold text-lg font-mono tracking-wide">
            {el.category}
          </h3>
        </div>
        <hr className="border-t-[1px] my-3" />
        <div>
          <div className="flex text-gray-700 text-[15.5px] font-bold tracking-wider">
            <FaCheck
              size={"50px"}
              className="bg-green-100 p-1 h-5 font-semibold rounded-full text-green-600 mt-1 mr-2"
            />
            <p>{el.description}</p>
          </div>

          <div className="flex text-black text-[15.5px] font-bold tracking-wide my-3">
            <BsPersonWorkspace
              size={"22px"}
              className="h-5 font-semibold rounded-full text-green-600 mr-2"
            />
            <p>
              Mentor : <span className="text-yellow-900">{el.createdBy}</span>
            </p>
          </div>

          <div className="flex text-black text-[15.5px] font-bold tracking-wide my-4">
            <MdVideoLibrary
              size={"23px"}
              className="h-5 font-semibold rounded-full text-green-700 mt-1 mr-[6px]"
            />
            <p>
              Totol Lectures :{" "}
              <span className="text-yellow-900">{el.numberofLectures}</span>
            </p>
          </div>
        </div>
        <button
          className="bg-[#ed0331] py-[10px] text-white w-full rounded-lg mt-2 text-sm font-medium tracking-wider active:scale-105 active:border-green-500  border-[2px] hover:bg-gradient-to-r from-red-500
      via-purple-500 to-blue-600 border-transparent"
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
