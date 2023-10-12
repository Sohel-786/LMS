import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../redux/slices/lectureSlice";
import { nanoid } from "nanoid";

function DisplayLectures(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();
    const { lectures } = useSelector((s) => s?.lectures)
    const { role } = useSelector((s) => s?.auth)
    const [ currentId , setCurrentId ] = useState(0);

    useEffect(() => {
        if(!state) navigate('/courses');
        dispatch(getCourseLectures(state._id));
    }, [])

    return (
        <HomeLayout>
            <div className="w-full flex px-12 my-20 gap-5">
              
                <div className="w-[60%] border-2 border-black">
                    <video className="w-full h-[400px]" controls autoPlay>
                        <source src={lectures[currentId]?.lecture?.secure_url} type="video/mp4" />
                    </video>
                    <h1>{lectures[currentId]?.title}</h1>
                    <p>{lectures[currentId]?.description}</p>
                </div>

                <div className="w-[40%] border-2 border-black flex flex-col">
                {
                    role === 'ADMIN' && <button onClick={() => { navigate('/course/addlecture', { state : {...state} }) }} className="self-end py-2 px-5 relative -top-6 text-roboto tracking-wide bg-gradient-to-t from-cyan-800 via-cyan-600 to-cyan-400 text-white font-bold rounded-lg hover:scale-110 transition-all duration-300 ease-in-out">ADD LECTURE</button>
                }
                    {
                        lectures.map((el, idc) => {
                            return(
                                <div onClick={() => {
                                    setCurrentId(idc)
                                }} key={nanoid()} className="w-full h-[100px] flex justify-center items-center">
                                        <video className="w-[30%] h-full">
                                        <source src={el?.lecture?.secure_url} type="video/mp4" />
                                        </video>
                                        <div className="flex flex-col justify-center">
                                            <h1>{el.title}</h1>
                                        </div>  
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default DisplayLectures;