import { useEffect } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/slices/courseSlice";
import CourseCard from "../components/CourseCard";

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
      <section className="min-h-[90vh] flex flex-col justify-center items-center m-auto">
        <div className="flex flex-col justify-center items-center ">
          <h1>Our Courses</h1>
          <p>
            Become a Software Developer, Testing Engineer or a Data Analyst at
            ZERO upfront fees.
          </p>
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
