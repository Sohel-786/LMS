import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import homepageImage from "/assets/homepage.png";
import Typewriter from "typewriter-effect";
import Marquee from "react-fast-marquee";
import MarqueeDiv from "../components/MarqueeDiv";
import { nanoid } from "nanoid";

function Home() {
  const array = [
    "airmeet",
    "ajio",
    "bharatagri",
    "bharatpe",
    "byjus",
    "paytm",
    "swiggy",
    "capgemini",
    "dream11",
    "eatfit",
    "globallogic",
    "homelane",
    "ibm",
    "leapfinance",
    "moneytap",
    "ola",
    "pagarbook",
    "salesken",
    "sharechat",
    "simplilearn",
    "smallcase",
    "urbanpiper",
    "vyapar",
    "whitehat",
  ];

  const array2 = array.reverse();

  return (
    <HomeLayout>
      <section className="flex flex-col justify-center items-center">
        <div className="pt-16  flex items-center justify-center gap-10 mx-16 min-h-[90vh]">
          <div className="w-1/2">
            <h1 className="text-[53px] tracking-wide font-semibold font-poppins leading-[70px]">
              Learning is better with{" "}
              <span className="inline-block text-[#f00037] after:content-[''] after:h-2 after:w-full after:float-left after:bg-gradient-to-r from-[#2d23a6] to-[#e10e5afc]">
                <Typewriter
                  options={{
                    strings: [
                      "Code",
                      "Coaches",
                      "Cohorts",
                      "Community",
                      "Classroom",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 60,
                    pauseFor: 2000,
                  }}
                />
              </span>
            </h1>

            <h1 className="text-4xl font-slab my-7">
              Find Out Best{" "}
              <span className="text-yellow-500 font-extrabold">
                Online Courses
              </span>
            </h1>

            <p className="text-2xl font-roboto tracking-wide font-semibold text-stone-500">
              We have a large library of courses taught by highly skilled and
              qualified faculties at a very affordable cost.
            </p>

            <div className="flex gap-7 my-6">
              <Link to="/courses">
                <button className="bg-[#f00037] border-[2px] border-transparent text-white font-bold px-5 py-3 rounded-md text-xl hover:scale-110 cursor-pointer hover:bg-[#cc032a] transition-all ease-in-out duration-300">
                  Expolore Courses
                </button>
              </Link>

              <Link to="/contact">
                <button className="bg-transparent hover:scale-110  px-5 py-3 border-2 border-[#f00037] text-[#f00037] font-bold rounded-md text-xl cursor-pointer hover:bg-[#f00037] hover:text-white transition-all ease-in-out duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <img src={homepageImage} alt="homepage" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full my-8">
          <h1 className="text-[43px] font-slab font-bold mb-3">
            Our <span className="text-[#f00037]">Students</span> are{" "}
            <span className="text-cyan-500">Placed</span> At{" "}
            <img
              className="relative left-28"
              src="/assets/line.svg"
              alt="line"
            />
          </h1>
          <Marquee className="py-10" direction="right" pauseOnClick={true}>
            {array.map((el) => (
              <MarqueeDiv
                key={nanoid()}
                url={`/assets/companies/${el}.svg`}
              />
            ))}
          </Marquee>
          <Marquee className="py-5" pauseOnClick={true}>
            {array2.map((el) => (
              <MarqueeDiv
                key={nanoid()}
                url={`/assets/companies/${el}.svg`}
              />
            ))}
          </Marquee>
        </div>
      </section>
    </HomeLayout>
  );
}

export default Home;
