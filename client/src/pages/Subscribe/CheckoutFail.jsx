import { useEffect } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { BiSolidErrorCircle } from 'react-icons/bi';
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/slices/authSlice";

function CheckoutFail(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function load(){
      await dispatch(getUserDetails());
    }
  

    useEffect(() => {

      load();

      const id = setTimeout(() =>{
        const showImage = document.getElementById('showImage');
        showImage.style.display = 'none';
  
        const showMsg = document.getElementById('showMsg');
        showMsg.style.display = 'flex';
      },4000);
  
      return () => {
        clearTimeout(id);
      };
    }, []);


    return (
        <HomeLayout>
        <div className="w-full flex flex-col justify-center items-center py-20">
          <div
            id="showImage"
            style={{ userSelect: "none" }}
            className="w-full flex justify-center items-center"
          >
            <img
              className="h-[400px] max-w-full"
              src={"/assets/paymentFailed.webp"}
              alt="gif"
            />
          </div>
          <div
            id='showMsg'
            className="hidden flex-col justify-center items-center m-auto w-[90%] bg-red-200 py-20 rounded-3xl"
          >
            <div className="flex items-center gap-4 text-6xl font-poppins font-bold">
              <BiSolidErrorCircle className="text-red-600 text-7xl" />
              <h1 className="text-red-600">Payment Failed</h1>
            </div>
  
            <div className="flex flex-col gap-5 justify-center items-center ml-20 mt-8">
              <h1 className="font-slab tracking-wide text-[35px] text-blue-500">
                Please Try Again Later
              </h1>
            </div>
  
            <button
              style={{
                userSelect: "none",
              }}
              onClick={() => {
                navigate("/");
              }}
              className="py-4 my-10 ml-14 px-16 rounded-xl bg-gradient-to-t from-green-800 via-green-600 to-green-400 text-white font-bold text-3xl hover:scale-110 transition-all duration-300 ease-in-out flex items-center gap-4"
            >
              Go to dashboard <BsBoxArrowInRight />
            </button>
          </div>
        </div>
      </HomeLayout>
    )
}

export default CheckoutFail;