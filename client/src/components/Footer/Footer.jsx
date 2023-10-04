import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import Li from "./LI";
import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const newDate = new Date();
  const year = newDate.getFullYear();
  const location = useLocation();

  return (
    <footer className="flex w-full bg-gradient-to-r from-[#0d0d0d] to-[#0d0d0de0] flex-col sm:flex-row items-center justify-between py-12 pb-6 px-2 sm:px-12 sm:pb-12">

      <div className="flex justify-center items-center w-full sm:w-[65%]">
        <section className="w-[50%] sm:w-[48%] flex flex-col justify-center items-center">
          <img
            className="w-[80%] sm:w-full aspect-auto"
            src="/assets/classroom2.svg"
            alt="classroomLogo"
          />
          <h1 className="text-white mt-2 font-mono font-bold text-[9px] sm:mt-0 sm:text-base">
            Copyright {year} | All rights reserved
          </h1>
        </section>

        <section className="flex flex-col justify-center w-[50%] sm:w-[55%] pl-4">
          <h1 className="text-white text-base font-bold tracking-wider sm:text-2xl">
            Courses
          </h1>
          <ul className="flex flex-col justify-center text-xs text-gray-400 font-bold tracking-wide mt-4 gap-2 sm:mt-8 sm:text-base">
            <li>Full Stack Web Development</li>
            <li>Data Analytics</li>
            <li>Mobile Development</li>
            <li>Software Testing & Automation</li>
            <li>Backend Development</li>
          </ul>

          {!(
            location.pathname === "/courses" ||
            location.pathname === "/course-description"
          ) && (
            <div className="w-full hidden sm:flex justify-center items-center bg-black mt-10 rounded-2xl h-[115px]">
              <img className="w-[22%] aspect-auto" src="/assets/arrow.gif" />
              <div className="flex flex-col justify-center">
                <h1 className="text-white font-semibold text-xl">
                  Get Started
                </h1>
                <p className="text-yellow-300 text-base font-semibold">
                  Join the Program
                </p>
              </div>

              <button
                onClick={() => {
                  navigate("/courses");
                }}
                className="text-white py-2 px-2 ml-2 rounded-md font-semibold text-base bg-[#ed0331] hover:bg-[#ed0332eb] hover:scale-105 transition-all duration-200 hover:border-[1px] hover:border-white ease-in-out"
              >
                Get your course
              </button>
            </div>
          )}
        </section>
      </div>

        {!(
            location.pathname === "/courses" ||
            location.pathname === "/course-description"
          ) && (
            <div className="w-[70%] flex sm:hidden justify-center items-center bg-black mt-6 rounded-xl h-[70px]">
              <img className="w-[17%] aspect-auto" src="/assets/arrow.gif" />
              <div className="flex flex-col justify-center">
                <h1 className="text-white font-semibold text-sm">
                  Get Started
                </h1>
                <p className="text-yellow-300 text-xs font-semibold">
                  Join the Program
                </p>
              </div>

              <button
                onClick={() => {
                  navigate("/courses");
                }}
                className="text-white py-1 px-2 ml-2 rounded-md font-semibold text-sm bg-[#ed0331] hover:bg-[#ed0332eb] hover:scale-105 transition-all duration-200 hover:border-[1px] hover:border-white ease-in-out"
              >
                Get your course
              </button>
            </div>
          )}

      <section className="w-[100%] px-3 mt-3 flex flex-col gap-8 min-h-[300px] sm:mt-0 sm:px-0 sm:w-[35%]">
        <div>
          <h1 className="text-gray-400 text-lg tracking-wider font-slab sm:tracking-normal sm:font-sans font-semibold sm:text-xl">Follow Us</h1>
          <ul className="flex items-center justify-between sm:gap-6 text-2xl my-4">
            <Li>
              <BsFacebook />
            </Li>
            <Li>
              <BsTwitter />
            </Li>
            <Li>
              <BsInstagram />
            </Li>
            <Li>
              <BsLinkedin />
            </Li>
            <Li>
              <IoLogoYoutube />
            </Li>
            <Li>
              <BsGithub />
            </Li>
            <Li>
              <FaTelegramPlane />
            </Li>
          </ul>
        </div>

        <ul className="w-[100%] grid grid-cols-2 justify-center gap-2 text-gray-400 relative -top-4 font-mono font-bold sm:grid-cols-1 sm:w-full">
          <li className="cursor-pointer hover:text-white">Blog</li>
          <li className="cursor-pointer hover:text-white">Events</li>
          <li className="cursor-pointer hover:text-white">Community</li>
          <li className="cursor-pointer hover:text-white">Placement Statistics</li>
        </ul>
        

        <hr className="border-t-[0.4px] border-[#4f5961] sm:w-[95%] sm:self-center" />
        
        <div className="flex justify-center items-center w-full">
          <h1 className="text-lg text-white font-bold text-center sm:text-start">
            Made with{" "}
            <img
              className="w-7 h-7 inline-block"
              src="/assets/heart.svg"
              alt="heart Image"
            />{" "}
            by{" "}
            <img
              className="w-[171px] inline-block relative -top-[6px] -left-2"
              src="/assets/my name.png"
              alt="My Name"
            />
          </h1>
        </div>
        
      </section>
    </footer>
  );
}

export default Footer;
