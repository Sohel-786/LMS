import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { getPaymentRecords } from "../redux/slices/paymentSlice";
import { getStatsData } from "../redux/slices/statsSlice";
import { useEffect, useState } from "react";
import { deleteCourse, getAllCourses } from "../redux/slices/courseSlice";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);
import { BiChevronRight, BiLeftArrowAlt, BiSolidEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdVideoLibrary } from "react-icons/md";
import CourseCreateUpdate from '../components/Course/CourseCreateUpdate';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { IoCloseSharp } from 'react-icons/io5';

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUserCount, subscriberCount } = useSelector((s) => s?.stat);

  const { allPayments, monthlySalesRecord } = useSelector((s) => s?.payment);
  const courses = useSelector((s) => s?.course?.courseData);

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUserCount, subscriberCount],
        backgroundColor: ["#0084ff", "#00bf86"],
        borderWidth: 1,
        borderColor: ["white", "white"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["#e89e00"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const [data, setData] = useState(null);

  function handleDelete(course) {
    if (!course) {
      toast.error("Something Went Wrong");
      return;
    }

    const deleteContainer = document.getElementById("delete");
    deleteContainer.style.display = "flex";
    setData(course);
  }

  async function handleCourseDelete() {
    if (!data) {
      toast.error("Something Went Wrong");
      return;
    }
    const res = await dispatch(deleteCourse(data._id));

    if (res?.payload?.success) {
      setData(null);
      const deleteContainer = document.getElementById("delete");
      deleteContainer.style.display = "none";
      await dispatch(getAllCourses());
    }
  }

  function handleClose() {
    const deleteContainer = document.getElementById("delete");
    deleteContainer.style.display = "none";
    setData(null);
  }

  function handleCourseUpdate(courseData){
    if(!courseData) {
      toast.error('Something Went Wrong');
      return;
    }

    setData(courseData);
    disableBodyScroll("document");
    const courseUpdate = document.getElementById('courseUpdate');
    courseUpdate.style.display = 'flex';
  }

  function closeCourseUpdate(){
    setData(null);
    enableBodyScroll("document");
    const courseUpdate = document.getElementById('courseUpdate');
    courseUpdate.style.display = 'none';
  }

  useEffect(() => {
    (async () => {
      await dispatch(getPaymentRecords());
      await dispatch(getStatsData());
      await dispatch(getAllCourses());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="pt-12 w-full pl-2 md:pl-3 lg:pl-10">
        <p className="flex items-center gap-[1px]">
          {" "}
          <span
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center gap-1 rounded-lg cursor-pointer hover:bg-gray-200 p-2 font-bold sm:text-lg font-slab text-green-700"
          >
            <BiLeftArrowAlt className="text-red-600" /> Back
          </span>
          <span className="text-2xl text-red-600">
            <BiChevronRight />
          </span>
          <span className="text-indigo-500 font-slab sm:text-lg ">
            Admin Dashboard
          </span>
        </p>
      </div>

      <div className="min-h-[90vh] w-full mt-3 flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full px-3 md:px-4 lg:px-10">
          <div className="flex w-full sm:w-[50%] flex-col items-center gap-1 sm:gap-10 px-3 py-5 sm:p-5 shadow-marquee rounded-md">
            <div className="w-full h-56 md:h-72 lg:h-80 flex justify-center items-center">
              <Pie data={userData} />
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-3 md:gap-1 lg:gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[#f3007a]">
                    Registered Users
                  </p>
                  <h3 className="text-2xl lg:text-4xl font-bold">
                    {allUserCount}
                  </h3>
                </div>
                <FaUsers className="text-[#00bfff] text-5xl" />
              </div>
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[#f3007a]">
                    Subscribed Users
                  </p>
                  <h3 className="text-2xl lg:text-4xl font-bold">
                    {subscriberCount}
                  </h3>
                </div>
                <FaUsers className="text-[#00bf66] text-5xl" />
              </div>
            </div>
          </div>

          <div className="flex w-full sm:w-[50%] flex-col items-center gap-1 sm:gap-10 px-3 py-5 sm:p-5 shadow-marquee rounded-md">
            <div className="h-64 md:h-72 lg:h-80 w-full flex justify-center items-center">
              <Bar data={salesData} />
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-3 md:gap-1 lg:gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[#f3007a]">
                    Subscription Count
                  </p>
                  <h3 className="text-2xl lg:text-4xl font-bold">
                    {allPayments?.count}
                  </h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[#f3007a]">Total Revenue</p>
                  <h3 className="text-2xl lg:text-4xl font-bold">
                    {allPayments?.count && allPayments?.count * 1}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-2 md:px-6 lg:px-8 self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-base md:text-2xl lg:text-3xl font-bold font-roboto tracking-wide">
              Courses overview
            </h1>

            <button
              onClick={() => {
                navigate("/course-create");
              }}
              className="w-fit bg-gradient-to-t from-cyan-700 via-cyan-600 to-cyan-400 transition-all ease-in-out duration-300 sm:py-2 py-1 px-2 sm:px-4 font-bold text-lg cursor-pointer text-white rounded-lg hover:scale-110 hover:bg-gradient-to-t hover:from-cyan-400 hover:via-cyan-600 hover:to-cyan-700"
            >
              Create new course
            </button>
          </div>

          <div className="w-full overflow-x-scroll">
            <table className="table font-semibold">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses?.map((course, idx) => {
                  return (
                    <tr key={course._id}>
                      <td>{idx + 1}</td>
                      <td>
                        <textarea
                          readOnly
                          value={course?.title}
                          className="w-40 h-auto bg-transparent resize-none"
                        ></textarea>
                      </td>
                      <td>{course?.category}</td>
                      <td>{course?.createdBy}</td>
                      <td>{course?.numberofLectures}</td>
                      <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                        <textarea
                          value={course?.description}
                          readOnly
                          className="w-72 h-auto bg-transparent resize-none"
                        ></textarea>
                      </td>
                      <td className="flex items-center gap-4">
                        <button
                          className="bg-gradient-to-t from-green-950 via-green-700 to-green-400 hover:bg-gradient-to-t hover:from-green-600 hover:via-green-800 hover:to-green-950 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold text-white hover:scale-110"
                          onClick={() =>
                            navigate("/course/lectures", {
                              state: { ...course },
                            })
                          }
                        >
                          <BsCollectionPlayFill />
                        </button>

                        <button
                          className="bg-gradient-to-t from-indigo-900 via-indigo-600 to-indigo-400 hover:bg-gradient-to-t hover:from-indigo-500 hover:via-indigo-700 hover:to-indigo-950 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold text-white hover:scale-110"
                          onClick={() => handleCourseUpdate(course)}
                        >
                          <BiSolidEdit />
                        </button>

                        <button
                          className="bg-gradient-to-t from-red-950 via-red-700 to-red-500 hover:bg-gradient-to-t hover:from-red-600 hover:via-red-800 hover:to-red-950 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold text-white hover:scale-110"
                          onClick={() => handleDelete(course)}
                        >
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        id="delete"
        className="hidden top-0 right-0 bottom-0 left-0 fixed bg-gradient-to-r from-[#00000095] to-[#00000095] justify-center items-center z-50"
      >
        <div
          id="changePass"
          className="flex flex-col justify-center items-center w-[80%] md:w-[50%] lg:w-[40%] bg-white rounded-xl py-5 px-6 gap-4"
        >
          <h1 className="font-slab">
            Are you sure you wanna delete this course{" "}
            <span className="text-red-600 text-xl">?</span>
          </h1>

          <div className="lg:w-[300px] md:h-[380px] w-full md:w-[70%] rounded-lg overflow-y-scroll bg-white hover:scale-105 transition-all duration-300 shadow-course">
            <div className="w-full h-[38%] mb-2">
              <img
                className="h-full md:w-full lg:aspect-auto aspect-auto"
                src={data?.thumbnail?.secure_url}
                alt={"course thumbnail"}
              />
            </div>
            <div className="flex flex-col justify-center px-6">
              <div className="flex justify-center flex-col">
                <h1 className="text-black font-bold text-[18px] md:text-[17px] sm:text-[22px]">
                  {data?.title}
                </h1>
                <h3 className="text-gray-600 font-bold text-base sm:text-lg font-mono tracking-wide">
                  {data?.category}
                </h3>
              </div>
              <hr className="border-t-[1px] my-3" />
              <div>
                <div className="flex text-gray-700 text-[15.5px] font-bold tracking-wider">
                  <FaCheck
                    size={"50px"}
                    className="bg-green-100 p-1 h-5 font-semibold rounded-full text-green-600 mt-1 mr-2"
                  />
                  <p>{data?.description}</p>
                </div>

                <div className="flex text-black text-[15.5px] font-bold tracking-wide my-3">
                  <BsPersonWorkspace
                    size={"22px"}
                    className="h-5 font-semibold rounded-full text-green-600 mr-2"
                  />
                  <p>
                    Mentor :{" "}
                    <span className="text-yellow-900">{data?.createdBy}</span>
                  </p>
                </div>

                <div className="flex text-black text-[15.5px] font-bold tracking-wide my-4">
                  <MdVideoLibrary
                    size={"23px"}
                    className="h-5 font-semibold rounded-full text-green-700 mt-1 mr-[6px]"
                  />
                  <p>
                    Totol Lectures :{" "}
                    <span className="text-yellow-900">
                      {data?.numberofLectures}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              userSelect: "none",
            }}
            className="w-full flex justify-center items-center gap-5 mt-1"
          >
            <button
              onClick={handleCourseDelete}
              className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-sky-800 via-sky-600 to-sky-400 hover:bg-gradient-to-t hover:from-sky-400 hover:via-sky-600 hover:to-sky-800 hover:scale-110 transition-all duration-300"
            >
              Yes
            </button>

            <button
              onClick={handleClose}
              className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-orange-800 via-orange-600 to-orange-400 hover:bg-gradient-to-t hover:from-orange-400 hover:via-orange-600 hover:to-orange-800 hover:scale-110 transition-all duration-300"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>

      <div id="courseUpdate" className="hidden justify-center items-center fixed top-0 right-0 left-0 bottom-0 overflow-y-scroll bg-white pt-56 z-50">
        <div onClick={closeCourseUpdate} className="w-full absolute top-0 flex justify-end px-5"><IoCloseSharp className="text-4xl cursor-pointer text-red-600 mt-3" /></div>
        { data &&  <CourseCreateUpdate courseData={data} />}
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
