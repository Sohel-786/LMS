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
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <footer className="flex w-full bg-gradient-to-r from-[#0d0d0d] to-[#0d0d0de0] flex-col sm:flex-row items-center justify-between py-8 px-4 sm:px-12">
      <section className="w-[30%] flex flex-col justify-center items-center">
        <img
          className="w-full aspect-auto"
          src="/assets/classroom2.svg"
          alt="classroomLogo"
        />
        <h1 className="text-white font-mono font-bold">
          Copyright {year} | All rights reserved
        </h1>
      </section>

      <section className="flex flex-col justify-center w-[35%] pl-4">
        <h1 className="text-white text-2xl font-bold tracking-wider">
          Courses
        </h1>
        <ul className="flex flex-col justify-center text-base text-gray-400 font-bold tracking-wide gap-3 mt-8">
          <li>Full Stack Web Development</li>
          <li>Data Analytics</li>
          <li>Mobile Development</li>
          <li>Software Testing & Automation</li>
          <li>Backend Development</li>
        </ul>

        <div className="w-full flex justify-center items-center bg-black mt-10 rounded-2xl h-[115px]">
          <img className="w-[22%] aspect-auto" src="/assets/arrow.gif" />
          <div className="flex flex-col justify-center">
            <h1 className="text-white font-semibold text-xl">Get Started</h1>
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
      </section>

      <section className="flex flex-col gap-8 h-[300px]">
        <div>
          <h1 className="text-gray-400 font-semibold text-xl">Follow Us</h1>
          <ul className="flex items-center gap-4 sm:gap-6 text-lg sm:text-2xl my-4">
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

        <div className="flex justify-center items-center">
          <h1 className="text-lg text-white font-bold">
            Made with{" "}
            <img
              className="w-9 h-9 inline-block"
              src="/assets/heart.svg"
              alt="heart Image"
            />{" "}
            by{" "}
            <img
              className="w-[200px] inline-block relative -top-[6px] -left-2"
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
