import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { GrClose } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { SiBookstack } from 'react-icons/si';

function Checkout() {
  useEffect(() => {
    const id = setTimeout(() => {
      const notice = document.getElementById("notice");
      const notice_p = document.getElementById('notice_p');
      const notice_close = document.getElementById('notice_close');

      notice.style.height = "56px";
      notice_p.style.display = "block";
      notice_close.style.display = "block";

    }, 1500);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <HomeLayout>
      <div className="w-full flex flex-col justify-center items-center sm:pt-8">
        <div
          id="notice"
          className="flex justify-center items-center w-full h-0 px-4 bg-red-400 transition-all ease-in-out duration-500"
        >
          <p
            id="notice_p"
            className="font-roboto font-bold tracking-wide sm:text-lg text-center mr-28 hidden transition-all ease-in-out duration-500"
          >
            This is just for the development purpose, no ammount will be charged
            from you, you can proceed with buying option.
          </p>
          <GrClose
            id="notice_close"
            onClick={() => {
              const notice = document.getElementById("notice");
              const notice_p = document.getElementById('notice_p');
              const notice_close = document.getElementById('notice_close');

              notice.style.height = "0px";
              notice_p.style.display = "none";
              notice_close.style.display = "none";
            }}
            size={"22px"}
            className="cursor-pointer hidden transition-all ease-in-out duration-500"
          />
        </div>

        <div className="w-[40%] rounded-xl overflow-hidden h-[400px] my-[50px] shadow-marquee">
          <div className="w-full h-[45%]">
            <img
              className="h-full w-full"
              src={
                "https://res.cloudinary.com/da3zef4f0/image/upload/v1696837273/lms/classroomlogo_n9974k.png"
              }
              alt="classroom logo"
            />
          </div>

          <div className="flex flex-col px-2">
            <h1 className="flex items-center gap-2 text-2xl font-slab text-orange-500 my-3 px-2"> <SiBookstack  className="text-blue-500"/> Subscription bundle</h1>

            <hr className="border-b-[1.5px] rounded-xl my-1" />

            <div className="flex flex-col">
              <h1>
                This purchase will allow you to access all the available courses
                on our platform for{" "}
                <span className="font-bold text-yellow-500">
                  1 yr duratrion
                </span>{" "}
                All the existing and new launched courses will be available
              </h1>
              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                <BiRupee />
                <span>499</span> only
              </p>
              <div className="text-gray-200">
                <p>100% refund on cancellation</p>
                <p>Terms and conditions apply *</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
          >
            buy now
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Checkout;
