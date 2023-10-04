import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail, isValidPhoneNumber } from "../helpers/RegexMatcher";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { contact } from "../redux/slices/authSlice";

function Contact() {
  const disptach = useDispatch();
  const [disableBtn, setDisableBtn] = useState(false);

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phNo: "",
    message: "",
    term: false,
  });

  function handleChange(e) {
    const { type, value, name, checked } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit() {
    if (
      !userDetails.firstname ||
      !userDetails.lastname ||
      !userDetails.email ||
      !userDetails.phNo ||
      !userDetails.message
    ) {
      toast.error("All fields required");
      return;
    }

    if (!isEmail(userDetails.email)) {
      toast.error("Please Provide Valid Email");
      return;
    }

    if (!isValidPhoneNumber(userDetails.phNo)) {
      toast.error("Please Provide Valid Phone Number");
      return;
    }

    setDisableBtn(true);

    const res = await disptach(contact(userDetails));

    setDisableBtn(false);

    if (res?.payload?.data?.success) {
      setUserDetails({
        firstname: "",
        lastname: "",
        email: "",
        phNo: "",
        message: "",
        term: false,
      });
    }
  }

  return (
    <HomeLayout>
      <section className="flex justify-center items-center w-full py-10">
        <div className="isolate px-6 py-10 sm:py-10 lg:px-8 w-[65%] rounded-xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How can we help you?
            </h2>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-10 max-w-xl sm:mt-14"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    value={userDetails.firstname}
                    onChange={handleChange}
                    type="text"
                    name="firstname"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    value={userDetails.lastname}
                    onChange={handleChange}
                    type="text"
                    name="lastname"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    value={userDetails.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6"
                >
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>IN</option>
                      <option>US</option>
                      <option>CA</option>
                      <option>EU</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    value={userDetails.phNo}
                    onChange={handleChange}
                    type="tel"
                    name="phNo"
                    maxLength={18}
                    id="phone-number"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    value={userDetails.message}
                    onChange={handleChange}
                    name="message"
                    id="message"
                    rows="4"
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <input
                    className="focus:outline-none focus:ring-0"
                    checked={userDetails.term}
                    name="term"
                    onChange={handleChange}
                    type="checkbox"
                  />
                </div>
                <label
                  className="text-sm leading-6"
                  id="switch-1-label"
                >
                  By selecting this, you agree to our{" "}
                  <a href="#" className="font-semibold text-indigo-400">
                    privacy&nbsp;policy
                  </a>
                  .
                </label>
              </div>
            </div>
            <div className="mt-10">
              <button
                disabled={userDetails.term ? (disableBtn ? true : false) : true}
                type="submit"
                onClick={handleSubmit}
                className="block w-full text-white rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-sky-300 disabled:cursor-not-allowed"
              >
                Let's talk
              </button>
            </div>
          </form>
        </div>
      </section>
    </HomeLayout>
  );
}

export default Contact;
