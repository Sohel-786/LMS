import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { GrClose } from "react-icons/gr";

function Checkout() {

  useEffect(() => {
    const id = setTimeout(() =>{
        const notice = document.getElementById('notice');
        notice.style.height = '56px';

    }, 2000)

    return () => {
        clearTimeout(id);
    }
  }, []);

  return (
    <HomeLayout>
      <div className="w-full flex sm:pt-8">

        <div id='notice' className="flex justify-center items-center w-full h-0 px-4 bg-red-400 transition-all ease-in-out duration-500">
          <p id='notice_p' className="font-roboto font-bold tracking-wide sm:text-lg text-center mr-28">
            This is just for the development purpose, no ammount will be charged
            from you, you can proceed with buying option.
          </p>
          <GrClose id="notice_close" onClick={() => {
            const notice = document.getElementById('notice');
            notice.style.height = '0px';
          }} size={"22px"} className="cursor-pointer " />
        </div>

      </div>
    </HomeLayout>
  );
}

export default Checkout;
