import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { PiShootingStarFill } from 'react-icons/pi';

function CourseDescription(){

    const { state } = useLocation();

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col justify-center items-center">
                <div>
                   <PiShootingStarFill/> <h1>Become a {state.title}</h1>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDescription;