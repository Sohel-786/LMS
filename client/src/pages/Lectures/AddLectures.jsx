import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useEffect, useState } from "react";
import { addCourseLecture } from "../../redux/slices/lectureSlice";
import { BiSolidVideos } from "react-icons/bi";

function AddLecture() {
  const courseDetails = useLocation().state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lecture: undefined,
    VideoSrc: "",
    id: courseDetails._id,
  });

  const [dragActive, setDragActive] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const src = window.URL.createObjectURL(video);
    console.log("src", src, video);
    setFormData({
      ...formData,
      lecture: video,
      VideoSrc: src,
    });
  }

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
      const video = e.dataTransfer.files[0];
      const src = window.URL.createObjectURL(video);
      console.log("src", src, video);
      setFormData({
        ...formData,
        lecture: video,
        VideoSrc: src,
      });
    }
  };

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  });

  async function handleSubmit() {
    if (!formData.lecture || !formData.title || !formData.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const res = await dispatch(addCourseLecture(formData));
    if (response?.payload?.success) {
      navigate(-1);
      formData({
        lecture: undefined,
        title: "",
        description: "",
        VideoSrc: "",
      });
    }
  }

  return (
    <HomeLayout>
      <section className="flex flex-col justify-center items-center w-full py-20 pt-14">
        <h1 className="text-4xl font-bold tracking-wider font-slab">
          ADD LECTURE
        </h1>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-white text-black py-6 sm:py-12 px-4 sm:px-12 rounded-xl w-[95%] flex flex-col lg:flex-row items-center"
        >
          <div className="w-full lg:w-[50%] h-[300px] lg:h-[450px] border-2 border-black">
            <div
              id="container"
              onDragEnter={handleDrag}
              className="w-full h-[90%] sm:h-[85%] flex flex-col items-center justify-center mb-6 border-[2px] border-transparent border-dashed"
            >
              {formData.VideoSrc ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className="w-full h-full flex justify-center items-center"
                >
                  <video
                    className=" rounded-tl-lg rounded-tr-lg w-full h-full"
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                  >
                    <source src={formData.VideoSrc} type="video/mp4" />
                  </video>
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
                  <BiSolidVideos size={"70px"} className="text-gray-300" />
                  <p className="text-gray-500 text-sm font-semibold text-center">
                    <label htmlFor="lecture">
                      <span
                        type="button"
                        className="text-indigo-600 text-base font-bold cursor-pointer p-1 px-[5px] hover:bg-indigo-100 hover:text-indigo-500 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
                      >
                        Upload a Video
                      </span>{" "}
                    </label>
                    or drag and drop <br /> video/mp4 video/x-mp4 video/*
                  </p>
                </div>
              )}
            </div>

            {formData.VideoSrc && (
              <div className="">
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      lecture: undefined,
                      VideoSrc: "",
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 font-bold text-sm border-[2px] border-stone-400 hover:scale-110 transition-all duration-200 ease-in-out hover:bg-red-500 hover:text-white hover:border-transparent"
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>

          <div className="w-full sm:w-[50%]">
            <input
              type="file"
              hidden
              id="lecture"
              name="lecture"
              onChange={handleVideo}
              accept="video/mp4 video/x-mp4 video/*"
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
              />
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
              />
            </div>

            <div className="mt-6 flex items-center justify-end w-full border-t-[2px] border-gray-100 pt-3">
              <button
                onClick={handleSubmit}
                type="submit"
                className="rounded-md text-white bg-indigo-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-110 focus:scale-110 transition-all duration-200"
              >
                ADD
              </button>
            </div>
          </div>
        </form>
      </section>
    </HomeLayout>
  );
}

export default AddLecture;
