import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { BsFillPatchCheckFill, BsFillPersonVcardFill } from "react-icons/bs";
import { FaSquareYoutube } from 'react-icons/fa6';

function CheckoutSuccess() {
  const data = useSelector((s) => s?.auth?.data);

  useEffect(() => {
    const id = setTimeout(() => {
      toast.custom((t) => (
        <div
          style={{
            userSelect: "none",
          }}
          data-aos="fade-down"
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
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-base font-bold text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:bg-indigo-100"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }, 100);

    // const id2 = setTimeout(() => {
    //     const img = document.getElementById('successImg');
    //     img.style.display = 'none'

    //     const SuccessMsg = document.getElementById('successMsg');
    //     SuccessMsg.style.display = 'flex';
    // },6000)

    return () => {
      clearTimeout(id);
      //   clearTimeout(id2)
    };
  }, []);

  return (
    <>
      <div className="w-full h-[700px] flex justify-center items-center border-2 border-black">
        {/* <div id="successImg" style={{ userSelect : 'none'}} className="">
          <img src={'/assets/paymentSuccess.gif'} alt="gif" />
        </div> */}
        <div
          id="successMsg"
          className="flex flex-col justify-center items-center m-auto"
        >
          <div className="flex items-center gap-4 text-6xl font-poppins font-bold">
            <BsFillPatchCheckFill className="text-green-500 text-7xl" />
            <h1 className="text-orange-600">Payment Successful</h1>
          </div>

          <div className="flex flex-col gap-5 justify-center items-center ml-20 mt-8">
            <h1 className="font-slab tracking-wide text-[42px] text-blue-600">Welcome to Pro Membership</h1>
                <BsFillPersonVcardFill className="text-7xl text-indigo-500" />
            <p className="text-4xl font-bold font-sans tracking-wide text-cyan-600 flex items-center gap-3">Now Enjoy All Premium Content <FaSquareYoutube className="text-5xl text-[#dc2525]" /></p>
          </div>

 
            <button className="py-4 my-10 ml-20 px-28 rounded-xl bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 text-white font-bold text-3xl hover:scale-110 transition-all duration-300 ease-in-out">
                Go to dashboard
            </button>
        </div>
      </div>
    </>
  );
}

export default CheckoutSuccess;
