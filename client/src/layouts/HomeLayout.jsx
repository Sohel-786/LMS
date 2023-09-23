import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((s) => s?.auth?.isLoggedIn);
  const role = useSelector((s) => s?.auth?.role);

  function handleLogout() {}

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
      <div className="drawer absolute left-0 z-50 w-full">
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
                  className="btn bg-red-600 rounded-md border-[2px] border-white hover:bg-red-800"
                >
                  LogOut
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4 w-[90%] absolute bottom-4">
                <Link to={"/login"}>
                  <button className="btn border-[2px] border-white bg-green-500 rounded-md hover:bg-green-700">
                    Sign In
                  </button>
                </Link>
                <Link to={"signup"}>
                  <button className="btn border-[2px] border-white bg-sky-500 rounded-md hover:bg-sky-700">Sign Up</button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>

      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
