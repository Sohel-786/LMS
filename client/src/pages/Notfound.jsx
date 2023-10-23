import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();
  return (
    <div
      data-theme="dark"
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <h1 className="text-[200px] font-semibold">404</h1>
      <p className="relative text-xl -top-36 font-bold bg-black font-mono -rotate-12">
        Page not found...
      </p>
      <button
        aria-label="Go Back to Previous Page"
        onClick={() => {
          navigate(-1);
        }}
        className="btn relative -top-10 border-2 border-white hover:bg-purple-900 hover:scale-125 hover:text-white hover:border-sky-300"
      >
        Go Back
      </button>
    </div>
  );
}

export default Notfound;
