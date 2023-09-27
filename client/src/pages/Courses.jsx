import { useEffect } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/slices/courseSlice";
import CourseCard from "../components/CourseCard";
import { FcApproval } from "react-icons/fc";

function Courses() {
  const data = useSelector((state) => state.course.courseData);

  const dispatch = useDispatch();

  async function handleData() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <HomeLayout>
      <section className="min-h-[90vh] flex flex-col justify-center items-center m-auto py-6 px-7">
        <div className="flex flex-col justify-center items-center my-7">
          <h1 className="text-5xl font-bold tracking-wide my-2">Our Courses</h1>
          <p className="text-xl font-semibold font-mono my-2">
            Become a <span className="text-cyan-400 font-bold font-sans tracking-wide">Software Developer</span>, <span className="text-cyan-400 font-bold font-sans tracking-wide">Testing Engineer</span> or a <span className="text-cyan-400 font-bold font-sans tracking-wide">Data Analyst</span> at <span className="text-green-400 font-bold font-sans tracking-wide">ZERO upfront fees<FcApproval className="inline ml-1 text-2xl"/></span></p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4">
          {data?.map((el) => {
            return <CourseCard key={el._id} el={el} />;
          })}
        </div>
      </section>
    </HomeLayout>
  );
}

export default Courses;
