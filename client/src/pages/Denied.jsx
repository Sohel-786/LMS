import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();

  return (
    <div
      data-theme="dark"
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <h1 className="text-[200px] font-semibold">403</h1>
      <p className=" text-xl relative -top-20 font-bold bg-black font-mono -rotate-12">
        Access Denied
      </p>
      <button
         onClick={() =>
          navigate('/')
        }
        className="btn border-2 border-white hover:bg-purple-900 hover:scale-125 hover:text-white hover:border-sky-300 relative -top-8"
      >
        Go Back
      </button>
    </div>
  );
}

export default Denied;
