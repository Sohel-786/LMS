import { HiOutlinePhoto } from "react-icons/hi2";
import { RiCloseCircleFill } from "react-icons/ri";
import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createCourse,
  getAllCourses,
  updateCourse,
} from "../../redux/slices/courseSlice";

function CourseCreateUpdate({ courseData, closeCourseUpdate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dragActive, setDragActive] = useState(false);
  const [courseDetails, setCourseDetails] = useState(
    location.pathname === "/admin/dashboard"
      ? {
          ...courseData,
          previewImage: courseData?.thumbnail?.secure_url,
        }
      : {
          title: "",
          description: "",
          category: "",
          createdBy: "",
          thumbnail: null,
          previewImage: null,
        }
  );

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();

    const container = document.getElementById("container");
    container.style.borderColor = "red";

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }
    if (e.type === "dragleave") {
      container.style.borderColor = "transparent";
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const container = document.getElementById("container");
    container.style.borderColor = "transparent";

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedImage = e.dataTransfer.files[0];
      setCourseDetails(function (state) {
        return { ...state, thumbnail: uploadedImage };
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        let result = this.result;
        setCourseDetails(function (state) {
          return { ...state, previewImage: result };
        });
      });
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  }

  function handleImage(e) {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    setCourseDetails({
      ...courseDetails,
      thumbnail: uploadedImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setCourseDetails({
        ...courseDetails,
        previewImage: this.result,
      });
    });
  }

  function handleBlur() {
    const thumbnailBtn = document.querySelector("#thumbnailBtn");
    const thumbnail = document.querySelector("#thumbnail");
    thumbnail.style.filter = "blur(3px)";
    thumbnailBtn.style.display = "flex";
  }

  function handleBlurRemove() {
    const thumbnailBtn = document.querySelector("#thumbnailBtn");
    const thumbnail = document.querySelector("#thumbnail");
    thumbnail.style.filter = "blur(0)";
    thumbnailBtn.style.display = "none";
  }

  function handleFullImageView() {
    console.log('Sohel')
    disableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "flex";
  }

  function handleFullViewclose() {
    enableBodyScroll(document);
    const fullView = document.getElementById("fullView");
    fullView.style.display = "none";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !courseDetails.title ||
      !courseDetails.category ||
      !courseDetails.createdBy ||
      !courseDetails.description ||
      !courseDetails.thumbnail
    ) {
      toast.error("All fields are Required");
      return;
    }

    if (location.pathname === "/admin/dashboard") {
      if (!courseDetails._id) {
        toast.error("Something Went Wrong");
        return;
      }

      const res = await dispatch(updateCourse(courseDetails));
      console.log(res);
      if (res?.payload?.success) {
        setCourseDetails({
          title: "",
          description: "",
          category: "",
          createdBy: "",
          thumbnail: null,
          previewImage: null,
        });
        closeCourseUpdate();
      }
    } else {
      const res = await dispatch(createCourse(courseDetails));
      if (res?.payload?.success) {
        setCourseDetails({
          title: "",
          description: "",
          category: "",
          createdBy: "",
          thumbnail: null,
          previewImage: null,
        });
        await dispatch(getAllCourses());
        navigate("/courses");
      }
    }
  }
  return (
    <section
      className={`flex flex-col items-center w-full ${
        location.pathname === "/admin/dashboard" ? "py-0" : "py-20"
      } pt-12`}
    >
      <h1 className="mb-4 lg:mb-8 text-4xl font-bold tracking-wider">
        {location.pathname === "/admin/dashboard"
          ? "Update Course"
          : "Create Course"}
      </h1>

         {/* To View Image on Full Screen */}
         <div
          id="fullView"
          className="fixed top-0 h-[100vh] w-[100vw] hidden z-50 bg-black flex-col justify-center items-center"
        >
          <RiCloseCircleFill
            onClick={handleFullViewclose}
            size={"50px"}
            className="absolute top-3 right-2 md:right-3 sm:right-8 cursor-pointer text-red-600 hover:text-red-800 bg-black border-[2px] border-transparent rounded-full hover:border-white"
          />
          <img
            className="w-auto h-auto"
            src={courseDetails.previewImage ? courseDetails.previewImage : ""}
            alt="Preview Image"
          />
        </div>

        <div
          id="container"
          style={{
            userSelect : 'none'
          }}
          onDragEnter={handleDrag}
          className="w-[95%] md:w-[70%] lg:w-[50%] h-[200px] sm:h-56 flex flex-col items-center justify-center mb-6 border-[2px] border-transparent border-dashed overflow-hidden"
        >
          {courseDetails.previewImage ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onMouseOver={handleBlur}
              onMouseOut={handleBlurRemove}
              className="w-full h-full flex justify-center items-center"
            >
              <div
                id="thumbnailBtn"
                className="lg:hidden z-10 absolute flex-col gap-2"
              >
                <button
                  onClick={() => {
                    handleFullImageView()
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-cyan-400 hover:text-white hover:border-transparent"
                >
                  VIEW
                </button>
                <button
                  onClick={() => {
                    setCourseDetails({
                      ...courseDetails,
                      previewImage: "",
                      thumbnail: "",
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-red-500 hover:text-white hover:border-transparent"
                >
                  CANCEL
                </button>
              </div>

              <img
                id="thumbnail"
                src={
                  courseDetails.previewImage ? courseDetails.previewImage : ""
                }
                alt="Course Thumbnail"
                className="max-w-full h-full m-auto"
              />
            </div>
          ) : dragActive ? (
            <div
              className="w-full h-full bg-gray-200 border-gray-300 transition-all duration-200 ease-in-out flex justify-center items-center border-[2px] border-dashed "
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          ) : (
            <div className="border-[2px] border-dashed flex flex-col justify-center items-center w-full h-full">
              <HiOutlinePhoto size={"70px"} className="text-gray-300" />
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
            </div>
          )}
        </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-white text-black px-4 sm:px-32 rounded-xl w-[95%] lg:w-[70%] flex flex-col items-center"
      >

        <input
          type="file"
          hidden
          id="courseImage"
          onChange={handleImage}
          accept=".jpg, .jpeg, .png, .webp, .svg"
        />

        <div className="my-2 w-full">
          <label
            className="block text-black font-semibold tracking-wide mb-3 font-sans"
            htmlFor="title"
          >
            Title
          </label>
          <input
            name="title"
            onChange={handleChange}
            className="rounded-lg border-gray-300 border-[1.2px] w-full"
            type="text"
            id="title"
            value={courseDetails?.title}
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
              name="category"
              onChange={handleChange}
              className="rounded-lg border-gray-300 border-[1.2px] w-full"
              type="text"
              id="category"
              value={courseDetails?.category}
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
              name="createdBy"
              onChange={handleChange}
              className="rounded-lg border-gray-300 border-[1.2px] w-full"
              type="text"
              id="createdBy"
              value={courseDetails?.createdBy}
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
            name="description"
            onChange={handleChange}
            rows={"8"}
            className="rounded-lg border-gray-300 border-[1.2px] w-full resize-y"
            type="text"
            id="description"
            value={courseDetails?.description}
          />
        </div>

        <div className="mt-6 flex items-center justify-end w-full border-t-[2px] border-gray-100 pt-3">
          {location.pathname === "/admin/dashboard" ? (
            <button
              type="submit"
              className="rounded-md text-white bg-indigo-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-110 focus:scale-110 transition-all duration-200"
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-md text-white bg-indigo-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-110 focus:scale-110 transition-all duration-200"
            >
              Create
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default CourseCreateUpdate;
