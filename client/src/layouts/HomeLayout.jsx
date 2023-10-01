import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((s) => s?.auth?.isLoggedIn);
  const role = useSelector((s) => s?.auth?.role);

  async function handleLogout() {
    const res = await dispatch(logout());

    if (res?.payload?.data) {
      navigate("/");
    }
  }

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  return (
    <div className="min-h-[90vh]">
      <header className="drawer absolute left-0 z-50 w-full sm:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <label htmlFor="my-drawer">
            <TfiMenu
              onClick={changeWidth}
              size={"28px"}
              className="font-bold m-4 cursor-pointer"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 min-h-full bg-base-200 text-base-content relative">
            <li className="absolute right-2 z-50">
              <button onClick={hideDrawer} className="w-fit">
                <IoMdClose size={"24px"} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/course-create">Create Course</Link>
              </li>
            )}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            {isLoggedIn && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-4 w-[90%] absolute bottom-4">
                <button
                  onClick={handleLogout}
                  className="btn bg-red-600 rounded-md border-[2px]  hover:bg-red-800"
                >
                  LogOut
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4 w-[90%] absolute bottom-4">
                <Link to={"/signin"}>
                  <button className="btn border-[2px]  bg-green-500 rounded-md hover:bg-green-700">
                    Sign In
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="btn border-[2px]  bg-sky-500 rounded-md hover:bg-sky-700">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </header>

      <header className="hidden sm:flex justify-between items-center py-3 px-10 shadow-headershadow z-50">
        <div className="w-[160px] aspect-auto relative -top-1">
          <img src={"/assets/classroom.svg"} alt="logo" />
        </div>

        <div className="flex justify-center items-center gap-4">
          <div>
            <ul className="flex justify-center items-center gap-8 px-3">
              <Link to={"/courses"}>
                <li className="text-lg font-bold font-mono hover:bg-pink-50 py-1 px-2 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  Courses
                </li>
              </Link>
              <Link to={"/about"}>
                <li className="text-lg font-bold font-mono hover:bg-pink-50 py-1 px-2 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  About Us
                </li>
              </Link>
              <Link to={"/contact"}>
                <li className="text-lg font-bold font-mono hover:bg-pink-50 py-1 px-2 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  Contact Us
                </li>
              </Link>
              <Link to={"/"}>
                <li className="text-lg font-bold font-mono hover:bg-pink-50 py-1 px-3 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  Home
                </li>
              </Link>
            </ul>
          </div>

          <div className="flex justify-center items-center gap-5">
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="py-[6px] px-4 text-lg transition-all duration-300 ease-in-out bg-cyan-100 rounded-lg font-mono font-black text-indigo-500 tracking-wider border-[3px] border-transparent hover:scale-110 hover:border-indigo-300 focus:outline-none focus:scale-110 focus:border-indigo-300"
            >
              LOGIN
            </button>

            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="py-[6px] px-4 text-lg transition-all duration-300 ease-in-out bg-red-50 rounded-lg font-mono font-black text-red-500 tracking-wider border-[3px] border-transparent hover:scale-110 hover:border-pink-300 
            focus:outline-none focus:scale-110 focus:border-pink-300"
            >
              SING UP
            </button>
          </div>
        </div>
      </header>

      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
