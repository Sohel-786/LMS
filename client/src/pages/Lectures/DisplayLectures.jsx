import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../redux/slices/lectureSlice";
import { current } from "@reduxjs/toolkit";

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
            <div className="w-full grid grid-cols-2 px-12 my-16">
                <div className="w-full border-2 border-black">
                    <video className="w-full h-[330px]" controls autoPlay>
                        <source src={lectures[currentId]} type="video/mp4" />
                    </video>
                </div>

                <div>
                  
                </div>
            </div>
        </HomeLayout>
    )
}

export default DisplayLectures;