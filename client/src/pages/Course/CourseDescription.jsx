import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { PiShootingStarFill } from 'react-icons/pi';

function CourseDescription(){

    const { state } = useLocation();

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col justify-center items-center">
                <div className="flex justify-center items-center flex-col">
                    <h1 className="flex justify-center items-center gap-2 text-5xl font-bold"><PiShootingStarFill className="text-yellow-400"/>Become Master In {state.title}</h1>
                    <h3 className="text-cyan-500 text-4xl my-6 font-bold">( Extensive Learning Course ) <span className="bg-yellow-500 px-4 py-1 text-base font-black text-stone-800 rounded-2xl">REMOTE</span></h3>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDescription;