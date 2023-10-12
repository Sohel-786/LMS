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
    const [ currentId , setCurrentId ] = useState(0);

    useEffect(() => {
        if(!state) navigate('/courses');
        dispatch(getCourseLectures(state._id));
    }, [])

    return (
        <HomeLayout>
            <div className="w-full flex px-12 my-16 gap-5">
                <div className="w-[60%] border-2 border-black">
                    <video className="w-full h-[350px]" controls autoPlay>
                        <source src={lectures[currentId]?.lecture?.secure_url} type="video/mp4" />
                    </video>
                    <h1>{lectures[currentId]?.title}</h1>
                    <p>{lectures[currentId]?.description}</p>
                </div>

                <div className="w-[40%] border-2 border-black">
                    {
                        lectures.map((el) => {
                            return(
                                <div key={nanoid()} className="w-full h-[100px] flex justify-center items-center">
                                        <video className="w-[30%] h-full">
                                        <source src={el?.lecture?.secure_url} type="video/mp4" />
                                        </video>
                                        <div className="flex flex-col justify-center">

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