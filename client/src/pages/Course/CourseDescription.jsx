import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { PiShootingStarFill } from "react-icons/pi";
import {BsFillBookmarkStarFill} from 'react-icons/bs';
import {RiVideoFill} from 'react-icons/ri';

function CourseDescription() {
  const { state } = useLocation();

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col justify-center items-center">

        <div className="flex justify-center items-center flex-col bg-gradient-to-r from-stone-900 via-[#810CA8] to-blue-700 h-[300px] px-6 w-[100vw]">
          <h1 className="flex justify-center items-center gap-2 text-5xl font-bold">
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
                <div className="rounded-xl overflow-hidden"><img src={state?.thumbnail?.secure_url} alt={'Course Thumbnail'} /></div>

                <div className="flex flex-col justify-center items-center my-6">
                    <h1 className="text-xl text-stone-800 font-bold flex justify-center items-center gap-1">Your Mentor Will Be {" "}<span className="text-yellow-600">{state.createdBy}</span><BsFillBookmarkStarFill className="text-green-600"/></h1>

                    <h1 className="text-xl text-stone-800 font-bold flex justify-center items-center gap-1">There are <span className="text-yellow-600">{state.numberofLectures}</span> Lectures.<RiVideoFill className="text-red-600"/></h1>

                </div>
            </div>

        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
