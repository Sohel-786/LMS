import { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice";
import CourseCard from "../../components/Course/CourseCard";


function Courses() {
  const data = useSelector((state) => state.course.courseData);
  const [isLodding, setIslodding] = useState(true);

  const dispatch = useDispatch();

  async function handleData() {
    await dispatch(getAllCourses());
    setIslodding(false);
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <HomeLayout>
      <section className="min-h-[90vh] flex flex-col justify-center items-center m-auto py-6 px-7 mb-7">
        <div className="flex flex-col justify-center items-center w-[95%] gap-7 my-10 bg-[#fcf4f5] rounded-xl sm:rounded-lg py-14 lg:w-[90%]">
          <h1 className="text-4xl text-black sm:text-5xl font-bold">Our Courses</h1>
          <p className="sm:text-xl text- text-base text-center font-roboto font-semibold text-stone-600">
            Fast forward your career with our high impact, hands on and
            intensive courses.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-6 lg:gap-12">
          {!isLodding ? (
            data?.map((el) => {
              return <CourseCard key={el._id} data={el} />;
            })
          ) : (
            <div className="shadow overflow-hidden rounded-xl max-w-sm mx-auto ">
              <div className="animate-pulse w-[280px] h-[480px] sm:w-[380px] sm:h-[560px]  flex flex-col items-center">
                <div className="w-full h-[38%] bg-slate-700"></div>

                <div className="flex flex-col justify-center px-6 mt-3 w-full">
                  <div className="flex justify-center flex-col w-full gap-3">
                    <div className="bg-slate-700 h-[35px] w-[80%] rounded-xl"></div>
                    <div className="bg-slate-700 h-[22px] w-[60%] rounded-xl"></div>
                  </div>
                </div>

                <hr className="border-t-[3px] my-3 w-[95%]" />

                <div className="flex flex-col w-full">
                  <div className="flex w-full gap-3 pl-6">
                    <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                    <div className="w-[90%] flex flex-col gap-3">
                      <div className="w-[80%] h-4 rounded-2xl bg-slate-700"></div>
                      <div className="w-[80%] h-4 rounded-2xl bg-slate-700"></div>
                      <div className="w-[80%] h-4 rounded-2xl bg-slate-700"></div>
                    </div>
                  </div>

                  <div className="flex items-center w-full gap-3 pl-6 mt-8">
                    <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                    <div className="w-[90%] flex flex-col gap-3">
                      <div className="w-[80%] h-4 rounded-2xl bg-slate-700"></div>
                    </div>
                  </div>

                  <div className="flex items-center w-full gap-3 pl-6 my-5">
                    <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                    <div className="w-[90%] flex flex-col gap-3">
                      <div className="w-[80%] h-4 rounded-2xl bg-slate-700"></div>
                    </div>
                  </div>
                </div>

                <div className="w-[80%] h-10 bg-stone-600 rounded-xl"></div>
              </div>
            </div>
          )}
        </div>
      </section>
    </HomeLayout>
  );
}

export default Courses;
