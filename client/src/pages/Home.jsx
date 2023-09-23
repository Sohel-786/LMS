import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import homepageImage from '/assets/homepage.png'

function Home() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-1/2 space-y-6">

          <h1 className="text-5xl font-semibold">
            Find Out Best{" "}
            <span className="text-yellow-500 font-extrabold">Online Courses</span>
          </h1>

          <p className="text-xl">
            We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
          </p>

          <div className="flex gap-7">
            <Link to="/courses">
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Expolore Courses
              </button>
            </Link>

            <Link>
            <button className="bg-transparent px-5 py-3 border-2 border-white rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
            <img src={homepageImage} alt="homepage" />
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
