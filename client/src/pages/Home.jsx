import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

function Home() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-1/2 space-x-6">
          <h1 className="text-5xl font-semibold">
            Find Out Best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>

          <div className="space-x-6">
            <Link to="/courses">
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg">
                Expolore Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
