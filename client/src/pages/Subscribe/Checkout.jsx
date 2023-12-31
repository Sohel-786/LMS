import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { GrClose } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { SiBookstack, SiWebmoney } from "react-icons/si";
import { FcApproval } from "react-icons/fc";
import { GiDuration } from "react-icons/gi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { HiReceiptRefund } from "react-icons/hi2";
import { RiRefund2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyPayment,
} from "../../redux/slices/paymentSlice";
import toast from "react-hot-toast";
import { getUserDetails } from "../../redux/slices/authSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const razorpayKey = useSelector((s) => s?.payment?.key);
  const data = useSelector((s) => s?.auth?.data);
  const subscription_id = useSelector((s) => s?.payment?.subscription_id);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_signature: "",
    razorpay_subscription_id: "",
  };

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(getUserDetails());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();

    const id = setTimeout(() => {
      const notice = document.getElementById("notice");
      const notice_p = document.getElementById("notice_p");
      const notice_close = document.getElementById("notice_close");

      notice.style.height = "62px";
      notice_p.style.display = "block";
      notice_close.style.display = "block";
    }, 1500);

    return () => {
      clearTimeout(id);
    };
  }, []);

  async function handleSubmit() {
    if (data?.subscription?.status === "active") {
      toast("You have already subscribed for the course!", {
        icon: "✌️",
        style: {
          borderRadius: "10px",
          background: "#0062ff",
          color: "#fff",
        },
      });
      return;
    }

    if (!razorpayKey || !subscription_id) {
      toast.error("Something Went Wrong");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Classroom .pvt .ltd",
      description: "Yearly Pro Plan",
      image: "/assets/classroom.svg",
      theme: {
        color: "#0073ff",
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        const res = await dispatch(verifyPayment(paymentDetails));
        res?.payload?.data?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    const paymentOptions = new window.Razorpay(options);
    paymentOptions.open();
  }

  return (
    <HomeLayout>
      <div
        className="w-full flex flex-col justify-center items-center pt-[18px] lg:pt-8 bg-cover lg:bg-contain"
        style={{
          backgroundImage: 'url("/assets/bg2.svg")',
        }}
      >
        <div
          id="notice"
          className="flex justify-end items-center w-full h-0 px-2 sm:px-4 bg-red-400 transition-all ease-in-out duration-300"
        >
          <p
            id="notice_p"
            className="font-roboto font-bold tracking-wide text-sm sm:my-0 sm:text-lg text-center lg:mr-28 hidden"
          >
            This is just for the development purpose, no ammount will be charged
            from you, you can proceed with buying option.
          </p>
          <div className="">
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
              className="cursor-pointer hidden"
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-6 px-2 lg:pl-20 lg:pr-4">
          <div className="w-full h-full lg:hidden block">
            <img
              className="w-full aspect-auto"
              src={"/assets/paymentPageImage.svg"}
              alt="PaymentPage Image"
            />
          </div>

          <div className="lg:w-[45%] md:w-[70%] w-full flex flex-col rounded-xl overflow-hidden lg:h-[700px] lg:my-[50px] md:my-[30px] my-[15px] shadow-marquee bg-white">
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

              <hr className="border-b-[1.2px] rounded-xl my-1 mb-4 border-indigo-100" />

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

              <button
                aria-label="Buy Course Bundle"
                type="submit"
                onClick={handleSubmit}
                className="w-[90%] mt-3 mb-5 lg:mb-0 flex justify-center items-center gap-[9px] py-3 m-auto bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 text-2xl font-bold rounded-xl text-white hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <SiWebmoney />
                Buy Now
              </button>
            </div>
          </div>

          <div className="w-[55%] h-full hidden lg:block">
            <img
              className="w-full aspect-auto"
              src={"/assets/paymentPageImage.svg"}
              alt="PaymentPage Image"
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Checkout;
