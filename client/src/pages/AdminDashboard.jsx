import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { getPaymentRecords } from "../redux/slices/paymentSlice";
import { getStatsData } from "../redux/slices/statsSlice";
import { useEffect } from "react";
import { getAllCourses } from "../redux/slices/courseSlice";
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
import { BiChevronRight, BiLeftArrowAlt } from "react-icons/bi";

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

  useEffect(() => {
    (async () => {
      await dispatch(getPaymentRecords());
      await dispatch(getStatsData());
      await dispatch(getAllCourses());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="pt-12 w-full pl-10">
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
                  <h3 className="text-2xl lg:text-4xl font-bold">{allUserCount}</h3>
                </div>
                <FaUsers className="text-[#00bfff] text-5xl" />
              </div>
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[#f3007a]">
                    Subscribed Users
                  </p>
                  <h3 className="text-2xl lg:text-4xl font-bold">{subscriberCount}</h3>
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
                  <h3 className="text-2xl lg:text-4xl font-bold">{allPayments?.count}</h3>
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
                          className="w-80 h-auto bg-transparent resize-none"
                        ></textarea>
                      </td>
                      <td className="flex items-center gap-4">
                        <button
                          className="bg-green-600 hover:bg-green-700 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold text-white hover:scale-110"
                          onClick={() =>
                            navigate("/course/lectures", {
                              state: { ...course },
                            })
                          }
                        >
                          <BsCollectionPlayFill />
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold text-white hover:scale-110"
                          onClick={() => onCourseDelete(course?._id)}
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
    </HomeLayout>
  );
}

export default AdminDashboard;
