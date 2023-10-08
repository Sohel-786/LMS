import { FiEye, FiEyeOff } from "react-icons/fi";

function ResetPassword() {
  function handleChange() {}

  function handleConfirmPassView() {}

  function handleNewPassView() {}

  return (
    <div className="flex flex-col items-center w-full h-[900px] lg:h-auto">
      <header
        style={{ userSelect: "none" }}
        className="flex justify-center items-center shadow-headershadow w-full h-[8%] lg:h-auto"
      >
        <div className="w-[160px] aspect-auto">
          <img
            className="w-full aspect-auto"
            src={"/assets/classroom.svg"}
            alt="logo"
          />
        </div>
      </header>
        <div
          className="flex flex-col justify-center w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-xl py-5 px-6"
        >
          <label
            htmlFor="newPassword"
            className="font-slab text-gray-600 mt-4 mb-2 pl-1"
          >
            Create New Password
          </label>

          <div className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-red-600 rounded-xl ">
            <input
              onChange={handleChange}
              className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
              type={viewOldPassword ? "text" : "password"}
              name="password"
              id="newPassword"
            />
            {viewOldPassword ? (
              <span type="button">
                <FiEye
                  aria-label="eyeOn"
                  className="text-xl"
                  onClick={handleNewPassView}
                />
              </span>
            ) : (
              <span type="button">
                <FiEyeOff
                  aria-label="eyeOff"
                  className="text-xl"
                  onClick={handleNewPassView}
                />
              </span>
            )}
          </div>
          <label
            htmlFor="confirmPassword"
            className="font-slab text-gray-600 mt-4 mb-2 pl-1"
          >
            Confirm New Password
          </label>

          <div className="w-full px-2 bg-transparent flex justify-center items-center border-[2px] border-sky-500 focus-within:border-red-600 rounded-xl ">
            <input
              onChange={handleChange}
              className="bg-transparent border-none focus:outline-0 focus:ring-0 w-full placeholder:font-semibold font-bold"
              type={viewNewPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
            />
            {viewNewPassword ? (
              <span type="button">
                <FiEye
                  aria-label="eyeOn"
                  className="text-xl"
                  onClick={handleConfirmPassView}
                />
              </span>
            ) : (
              <span type="button">
                <FiEyeOff
                  aria-label="eyeOff"
                  className="text-xl"
                  onClick={handleConfirmPassView}
                />
              </span>
            )}
          </div>

          <div
            style={{
              userSelect: "none",
            }}
            className="w-full flex items-center gap-5 mt-1"
          >
            <button className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-sky-800 via-sky-600 to-sky-400 hover:bg-gradient-to-t hover:from-sky-400 hover:via-sky-600 hover:to-sky-800 hover:scale-110 transition-all duration-300">
              SUBMIT
            </button>

            <button className="text-white px-6 py-2 font-roboto font-bold rounded-lg bg-gradient-to-t from-orange-800 via-orange-600 to-orange-400 hover:bg-gradient-to-t hover:from-orange-400 hover:via-orange-600 hover:to-orange-800 hover:scale-110 transition-all duration-300">
              CANCEL
            </button>
          </div>
        </div>
      </div>
  );
}

export default ResetPassword;
