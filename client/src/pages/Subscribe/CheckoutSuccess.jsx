import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function CheckoutSuccess(){

    const data = useSelector((s) => s?.auth?.data);

    useEffect(() =>{
        const id = setTimeout(() =>{
            toast.custom((t) => (
                <div
                  data-aos='fade-down'
                  data-aos-easing="ease-in"
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-14 w-14 rounded-full"
                          src= {data.avatar.secure_url}
                          alt="Profile"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-base sm:text-lg text-gray-700 font-bold">
                          {(data.fullname).toUpperCase()}
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
              ))
        },200)

        return () => {
            clearTimeout(id);
        }
    }, []);

    return (
        <>
            <div>

            </div>
        </>
    )
}

export default CheckoutSuccess;