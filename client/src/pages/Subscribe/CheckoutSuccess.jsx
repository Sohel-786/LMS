import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPatchCheckFill, BsFillPersonVcardFill } from "react-icons/bs";
import { FaSquareYoutube } from "react-icons/fa6";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { getUserDetails } from "../../redux/slices/authSlice";

function CheckoutSuccess() {
  const data = useSelector((s) => s?.auth?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function load() {
    await dispatch(getUserDetails());
  }

  useEffect(() => {
    load();

    const id = setTimeout(() => {
      toast.custom((t) => (
        <div
          style={{
            userSelect: "none",
          }}
          data-aos="fade-down"
          data-aos-duration={500}
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-14 w-14 rounded-full"
                  src={data.avatar.secure_url}
                  alt="Profile"
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-base sm:text-lg text-gray-700 font-bold">
                  {data.fullname.toUpperCase()}
                </p>
                <p className="mt-1 text-base text-green-600 font-bold font-roboto tracking-wider">
                  Subscription Activated
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              aria-label="Close the Notification"
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-base font-bold text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:bg-indigo-100"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }, 100);

    const id2 = setTimeout(() => {
      const showImage = document.getElementById("showImage");
      showImage.style.display = "none";

      const showMsg = document.getElementById("showMsg");
      showMsg.style.display = "flex";
    }, 6000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <HomeLayout>
      <div className="w-full flex flex-col justify-center items-center py-14">
        <div
          id="showImage"
          style={{ userSelect: "none" }}
          className="w-full flex justify-center items-center"
        >
          <img
            className="h-full max-w-full"
            src={"/assets/paymentSuccess.gif"}
            alt="gif"
          />
        </div>
        <div
          id="showMsg"
          className="hidden flex-col justify-center items-center m-auto w-[98%] sm:w-[90%] bg-blue-100 py-10 md:py-14 lg:py-20 rounded-3xl"
        >
          <div className="flex items-center text-center  font-poppins font-bold gap-2 text-2xl sm:gap-4 md:text-4xl lg:text-6xl">
            <BsFillPatchCheckFill className="text-green-500 text-center inline-block sm:block text-2xl md:text-5xl lg:text-7xl" />
            <h1 className="text-orange-600 inline-block sm:block">
              Payment Successful
            </h1>
          </div>

          <div className="flex flex-col gap-2 md:gap-4 lg:gap-5 justify-center items-center ml-4 md:ml-12 lg:ml-20 mt-4 md:mt-6 lg:mt-8">
            <h1 className="font-slab tracking-wide text-lg text-center md:text-[38px] lg:text-[42px] text-blue-600">
              Welcome to Pro Membership
            </h1>
            <BsFillPersonVcardFill className="text-5xl md:text-6xl lg:text-7xl text-indigo-500" />
            <p className="text-sm md:text-2xl lg:text-4xl font-bold font-sans tracking-wide text-cyan-600 flex items-center gap-1 lg:gap-3 md:gap-2">
              Now Enjoy All Premium Content{" "}
              <FaSquareYoutube className="text-xl inline-block lg:block md:text-4xl lg:text-5xl text-[#dc2525]" />
            </p>
          </div>

          <button
            aria-label="Go to Dashboard"
            style={{
              userSelect: "none",
            }}
            onClick={() => {
              navigate("/");
            }}
            className="py-1 md:py-3 lg:py-4 my-4 md:my-8 lg:my-10 ml-4 md:ml-14 lg:ml-20 px-10 md:px-20 lg:px-28 rounded-xl bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 text-white font-bold text-lg md:text-2xl lg:text-3xl hover:scale-110 transition-all duration-300 ease-in-out flex items-center gap-4"
          >
            Go to dashboard <BsBoxArrowInRight />
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
