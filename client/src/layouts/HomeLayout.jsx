import classroomLogo from "/assets/classroom.svg";
import { TfiMenu } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef, useState, lazy } from "react";
import { BiSolidUser } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillClipboard2DataFill } from "react-icons/bs";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const wrapperRef = useRef("profileMenu");

  const isLoggedIn = useSelector((s) => s?.auth?.isLoggedIn);
  const role = useSelector((s) => s?.auth?.role);
  const name = useSelector((s) => s?.auth?.data?.fullname);
  const img = useSelector((s) => s?.auth?.data?.avatar?.secure_url);

  //This is for the Profile Menu, to close on click of pointer device anywhere on the window except the element itself
  function handleProfilemenuview(ref, useClickOutside) {
    useEffect(() => {
      function handleClickoutside(e) {
        if (isLoggedIn) {
          if (ref.current && !ref.current.contains(e.target)) {
            useClickOutside();
          }
        }
      }

      document.addEventListener("mousedown", handleClickoutside);

      return () => {
        document.removeEventListener("mousedown", handleClickoutside);
      };
    }, [ref, useClickOutside]);
  }

  handleProfilemenuview(wrapperRef, () => {
    setShowProfile(false);
  });

  async function handleLogout() {
    const res = await dispatch(logout());

    if (res?.payload?.data) {
      scrollTo({
        top : 0,
        behavior : 'smooth'
      })
      navigate("/");
    }
  }

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
    disableBodyScroll("document");
  }

  function hideDrawer() {
    scrollTo({
      top : 0,
      behavior : 'smooth'
    })
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    enableBodyScroll("document");

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  return (
    <div className="lg:pt-9 w-100%">
      <div className="drawer absolute left-0 z-50 w-full lg:hidden">
        {/* this Input for toggle the burgur */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* this is burgur Icon */}
        <div className="drawer-content">
          <label htmlFor="my-drawer">
            <TfiMenu
              onClick={changeWidth}
              size={"33px"}
              className="ml-4 mt-7 cursor-pointer fixed z-20 text-black"
            />
          </label>
        </div>

        {/* From Here This is Drawer */}
        <div className="drawer-side w-0 h-full z-30">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          {/* This Drawer List */}
          <ul className="menu flex flex-col gap-3 p-4 w-80 bg-base-200 h-full font-slab text-xl tracking-wide pt-5 text-white bg-gradient-to-r from-slate-950 to-slate-700">
            <li className="absolute right-2 z-50">
              <button
                aria-label="Hide the Drawer"
                onClick={hideDrawer}
                className="w-fit"
              >
                <IoMdClose size={"28px"} />
              </button>
            </li>

            <li onClick={hideDrawer}>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li onClick={hideDrawer}>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <li onClick={hideDrawer}>
                <Link to="/course-create">Create Course</Link>
              </li>
            )}
            <li onClick={hideDrawer}>
              <Link to="/courses">All Courses</Link>
            </li>
            <li onClick={hideDrawer}>
              <Link to="/about">About Us</Link>
            </li>
            <li onClick={hideDrawer}>
              <Link to="/contact">Contact Us</Link>
            </li>

            {isLoggedIn ? (
              <li className="w-[90%] absolute bottom-5">
                <div onClick={hideDrawer} className="flex items-center gap-4">
                  <button
                    aria-label="Logout"
                    onClick={handleLogout}
                    className="btn bg-red-600 text-white rounded-md border-[2px]  hover:bg-red-800"
                  >
                    LogOut
                  </button>
                </div>
              </li>
            ) : (
              <li className="w-[90%] absolute bottom-5">
                <div className="flex justify-center items-center gap-4">
                  <Link to={"/signin"}>
                    <button
                      aria-label="Sign In"
                      onClick={hideDrawer}
                      className="btn border-[2px] text-white bg-green-500 rounded-md hover:bg-green-700"
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to={"/signup"}>
                    <button
                      aria-label="Create New Account"
                      onClick={hideDrawer}
                      className="btn border-[2px] text-white bg-sky-500 rounded-md hover:bg-sky-700"
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* This Header is for Bigger Screens */}
      <header className="hidden lg:flex justify-between items-center py-1 px-10 shadow-headershadow z-50 bg-white fixed w-full top-0">
        <div
          style={{ userSelect: "none" }}
          className="w-[160px] aspect-auto relative -top-1"
        >
          <img
            onClick={() => {
              scrollTo({
                top : 0,
                behavior : 'smooth'
              });
              navigate("/");
            }}
            rel="preload"
            fetchpriority="high"
            className="w-full aspect-auto cursor-pointer"
            src={classroomLogo}
            alt="logo"
          />
        </div>

        <div className="flex justify-center items-center gap-4 text-black">
          <div>
            <ul className="flex justify-center items-center gap-8 px-3">
              {role === "ADMIN" && (
                <li
                  onClick={() => {
                    scrollTo({
                      top : 0,
                      behavior : 'smooth'
                    });
                    navigate("/course-create");
                  }}
                  className="text-lg font-bold cursor-pointer font-mono hover:bg-pink-50 py-1 px-2 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110"
                >
                  Create Course
                </li>
              )}

                <li onClick={() => {
                   scrollTo({
                    top : 0,
                    behavior : 'smooth'
                  });
                    navigate("/courses");
                  }} className="text-lg font-bold cursor-pointer font-mono hover:bg-pink-50 py-1 px-2 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  Courses
                </li>

                <li onClick={() => {
                   scrollTo({
                    top : 0,
                    behavior : 'smooth'
                  });
                    navigate("/about");
                  }} className="text-lg font-bold cursor-pointer font-mono hover:bg-pink-50 py-1 px-2 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  About Us
                </li>

                <li onClick={() => {
                   scrollTo({
                    top : 0,
                    behavior : 'smooth'
                  })
                    navigate("/contact");
                  }} className="text-lg font-bold cursor-pointer font-mono hover:bg-pink-50 py-1 px-2 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  Contact Us
                </li>

                <li onClick={() => {
                   scrollTo({
                    top : 0,
                    behavior : 'smooth'
                  });
                    navigate("/");
                  }} className="text-lg font-bold font-mono cursor-pointer hover:bg-pink-50 py-1 px-3 rounded-lg  hover:text-red-600 transition-all duration-300 hover:scale-110">
                  Home
                </li>
            </ul>
          </div>

          {isLoggedIn ? (
            <div
              className="flex flex-col justify-center items-center"
              ref={wrapperRef}
            >
              <div
                rel="preload"
                fetchpriority="high"
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
                className="rounded-full w-11 h-11 mr-3 cursor-pointer bg-center bg-cover hover:border-[1px] border-transparent hover:border-pink-300"
                style={{
                  userSelect: "none",
                  backgroundImage: `url(${img})`,
                }}
              ></div>

              {showProfile && (
                <div className="absolute flex flex-col justify-center w-36 bg-white shadow-menu top-16 right-4 rounded-md">
                  <div className="w-full p-2">
                    <h1 className="font-slab text-sm tracking-wide text-indigo-500">
                      Hay
                    </h1>
                    <p className="font-roboto font-semibold tracking-wide text-gray-600 mt-1 capitalize">
                      {name}
                    </p>
                  </div>
                  <hr className="w-[90%] self-center" />
                  <Link to={"/profile"}>
                    <div className="flex gap-4 items-center py-2 px-2 font-bold text-sm text-stone-700 hover:bg-slate-200">
                      <BiSolidUser size={"18px"} /> My Profile
                    </div>
                  </Link>
                  {role === "ADMIN" && (
                    <div
                      onClick={() => {
                        scrollTo({
                          top : 0,
                          behavior : 'smooth'
                        });
                        navigate("/admin/dashboard");
                      }}
                      className="flex gap-4 items-center py-2 px-2 font-bold text-sm text-stone-700 hover:bg-slate-200 cursor-pointer"
                    >
                      <BsFillClipboard2DataFill size={"18px"} />
                      Dashboard
                    </div>
                  )}
                  <div
                    onClick={handleLogout}
                    className="flex gap-4 cursor-pointer items-center py-2 px-2 font-bold text-sm text-stone-700 hover:bg-slate-200"
                  >
                    <RiLogoutBoxRLine size={"18px"} /> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center gap-5">
              <button
                aria-label="Login to your account"
                onClick={() => {
                  scrollTo({
                    top : 0,
                    behavior : 'smooth'
                  });
                  navigate("/signin");
                }}
                className="py-[6px] px-4 text-lg transition-all duration-300 ease-in-out bg-cyan-100 rounded-lg font-mono font-black text-indigo-500 tracking-wider border-[3px] border-transparent hover:scale-110 hover:border-indigo-300 focus:outline-none focus:scale-110 focus:border-indigo-300"
              >
                LOGIN
              </button>

              <button
                aria-label="Create New Account"
                onClick={() => {
                  scrollTo({
                    top : 0,
                    behavior : 'smooth'
                  });
                  navigate("/signup");
                }}
                className="py-[6px] px-4 text-lg transition-all duration-300 ease-in-out bg-red-50 rounded-lg font-mono font-black text-red-500 tracking-wider border-[3px] border-transparent hover:scale-110 hover:border-pink-300 
            focus:outline-none focus:scale-110 focus:border-pink-300"
              >
                SING UP
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="lg:hidden z-30 bg-white flex justify-center items-center w-full py-2 pt-3 shadow-headershadow fixed">
        <div
          style={{
            userSelect: "none",
          }}
        >
          <img
            rel="preload"
            fetchpriority="high"
            className="w-40"
            src={classroomLogo}
            alt="Classroom Logo"
          />
        </div>

        {isLoggedIn && (
          <div
            onClick={() => {
              scrollTo({
                top : 0,
                behavior : 'smooth'
              })
              navigate("/profile");
            }}
            className="rounded-full w-[50px] h-[50px] cursor-pointer bg-center bg-cover border-[1px] border-pink-300 absolute right-3 top-5"
            style={{
              userSelect: "none",
              backgroundImage: `url(${img})`,
            }}
          ></div>
        )}
      </div>

      <div className="pt-16 lg:pt-0">{children}</div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
