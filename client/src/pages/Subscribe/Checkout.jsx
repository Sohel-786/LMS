import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { GrClose } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { SiBookstack } from "react-icons/si";
import { FcApproval } from "react-icons/fc";
import { GiDuration } from "react-icons/gi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { HiReceiptRefund } from "react-icons/hi2";
import { RiRefund2Line } from "react-icons/ri";

function Checkout() {
  useEffect(() => {
    const id = setTimeout(() => {
      const notice = document.getElementById("notice");
      const notice_p = document.getElementById("notice_p");
      const notice_close = document.getElementById("notice_close");

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
              const notice_p = document.getElementById("notice_p");
              const notice_close = document.getElementById("notice_close");

              notice.style.height = "0px";
              notice_p.style.display = "none";
              notice_close.style.display = "none";
            }}
            size={"22px"}
            className="cursor-pointer hidden transition-all ease-in-out duration-500"
          />
        </div>

        <div className="w-[40%] flex flex-col rounded-xl overflow-hidden h-[650px] my-[50px] shadow-marquee">
          <div className="w-full h-[32%]">
            <img
              className="h-full w-full"
              src={
                "https://res.cloudinary.com/da3zef4f0/image/upload/v1696837273/lms/classroomlogo_n9974k.png"
              }
              alt="classroom logo"
            />
          </div>

          <div className="flex flex-col px-2">
            <h1 className="flex items-center gap-2 text-2xl font-slab text-orange-500 my-3 px-2">
              {" "}
              <SiBookstack className="text-blue-500" /> Subscription bundle
            </h1>

            <hr className="border-b-[1.2px] rounded-xl my-1 border-indigo-100" />

            <div className="flex flex-col px-4">
              <div className="flex gap-2">
                <div>
                  <FcApproval size={"20px"} className="inline-block" />
                </div>
                <div>
                  <h1 className="text-lg font-roboto font-bold text-slate-600 tracking-wide">
                    This purchase will allow you to access all the available
                    courses on our platform for{" "}
                    <span className="font-slab text-blue-500 block text-center text-xl my-[10px] tracking-wider">
                      <GiDuration className="inline-block text-4xl text-green-700 mr-1" />{" "}
                      1 Year Duratrion
                    </span>{" "}
                    & all the existing and new launched courses will also be
                    available.
                  </h1>
                </div>
              </div>

              <p className="flex items-center justify-center my-3">
                <BiRupee className="text-green-600 text-3xl" />
                <span className="font-poppins text-orange-500 block text-3xl font-bold">
                  499{" "}
                </span>
                <span className="font-slab text-xl text-blue-500 tracking-wide ml-2">
                  Only
                </span>
              </p>

              <div className="flex flex-col gap-1 my-3">
                <div className="flex items-center gap-2 sm:text-lg font-mono font-bold">
                  <HiReceiptRefund className="text-orange-600" />
                  <p className="flex items-center gap-2">
                    100% refund on cancellation{" "}
                    <RiRefund2Line className="text-green-600" />
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:text-lg font-mono font-bold">
                  <IoDocumentTextSharp className="text-yellow-500" />
                  <p>
                    Terms and conditions apply{" "}
                    <span className="text-red-600">*</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-[80%] py-2 m-auto bg-green-500">
            buy now
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Checkout;
