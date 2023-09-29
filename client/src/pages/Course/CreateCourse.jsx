import { HiOutlinePhoto } from "react-icons/hi2";
import HomeLayout from "../../layouts/HomeLayout";
import { useState } from "react";

function CreateCourse() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  return (
    <HomeLayout>
      <section className="flex flex-col justify-center items-center w-full py-20 pt-12">
        <h1 className="mb-6 text-4xl font-bold tracking-wider">Create Course</h1>
        <form className="bg-white py-12 px-32 rounded-xl w-[70%] flex flex-col items-center">
          <div
            onDragEnter={handleDrag}
            className="w-full h-56 border-[2px] border-dashed flex flex-col items-center justify-center mb-6"
          >
            {dragActive ? (
              <div
                className="w-full h-full bg-gray-200 border-[2px] border-dotted border-gray-300 transition-all duration-200 ease-in-out flex justify-center items-center"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {" "}
                <h1 className="text-2xl font-bold text-gray-400">
                  Drop Your Image
                </h1>{" "}
              </div>
            ) : (
              <>
                <HiOutlinePhoto size={"70px"} />
                <p className="text-gray-500 text-sm font-semibold text-center">
                  <label htmlFor="courseImage">
                    <span
                      type="button"
                      className="text-indigo-600 text-base font-bold cursor-pointer p-1 px-[5px] hover:bg-indigo-100 hover:text-indigo-500 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      Upload a file
                    </span>{" "}
                  </label>
                  or drag and drop <br /> PNG, JPG, JPEG, WEBP
                </p>
              </>
            )}
          </div>

          <div className="my-2 w-full">
            <label
              className="block text-black font-semibold tracking-wide mb-3 font-sans"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="rounded-lg border-gray-300 border-[1.2px] w-full"
              type="text"
              id="title"
            />
          </div>

          <div className="grid grid-cols-2 w-full gap-3 my-4">
            <div className="my-2 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans"
                htmlFor="category"
              >
                Category
              </label>
              <input
                className="rounded-lg border-gray-300 border-[1.2px] w-full"
                type="text"
                id="category"
              />
            </div>
            <div className="my-2 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans"
                htmlFor="createdBy"
              >
                Created By
              </label>
              <input
                className="rounded-lg border-gray-300 border-[1.2px] w-full"
                type="text"
                id="createdBy"
              />
            </div>
          </div>

          <div className="my-2 w-full">
              <label
                className="block text-black font-semibold tracking-wide mb-3 font-sans"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                rows={'8'}
                className="rounded-lg border-gray-300 border-[1.2px] w-full resize-y"
                type="text"
                id="description"
              />
            </div>

          <div className="mt-6 flex items-center justify-end w-full">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </HomeLayout>
  );
}

export default CreateCourse;
