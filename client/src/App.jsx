import { useEffect, lazy, Suspense } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthRoute from "./components/Auth/AuthRoute";
import Loading from "./components/Loading";
import Denied from "./pages/Denied";
import Notfound from "./pages/Notfound";
import CurrentActiveRoute from "./components/Auth/CurrentActiveRoute";
const Aboutus = lazy(() => import("./pages/Aboutus"));
const SignUp = lazy(() => import("./pages/Signup"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Contact = lazy(() => import("./pages/Contact"));
const Courses = lazy(() => import("./pages/Course/Courses"));
const CourseDescription = lazy(() =>
  import("./pages/Course/CourseDescription")
);
const CreateCourse = lazy(() => import("./pages/Course/CreateCourse"));
const Profile = lazy(() => import("./pages/Profile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgottenPassword = lazy(() => import("./pages/ForgottenPassword"));
const Checkout = lazy(() => import("./pages/Subscribe/Checkout"));
const CheckoutFail = lazy(() => import("./pages/Subscribe/CheckoutFail"));
const CheckoutSuccess = lazy(() => import("./pages/Subscribe/CheckoutSuccess"));
const DisplayLectures = lazy(() => import("./pages/Lectures/DisplayLectures"));
const AddLecture = lazy(() => import("./pages/Lectures/AddLectures"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  useEffect(() => {
    Aos.init();
  });

  return (
    <div className="mx-auto max-w-[1490px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <Aboutus />
            </Suspense>
          }
        />

        <Route element={<CurrentActiveRoute />}>
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loading />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={<Loading />}>
                <SignIn />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          }
        />
        <Route path="/denied" element={<Denied />} />

        <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
          <Route
            path="/course-create"
            element={
              <Suspense fallback={<Loading />}>
                <CreateCourse />
              </Suspense>
            }
          />
          <Route
            path="/course/addlecture"
            element={
              <Suspense fallback={<Loading />}>
                <AddLecture />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            }
          />
        </Route>

        <Route element={<AuthRoute allowedRoles={["ADMIN", "USER"]} />}>
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<Loading />}>
                <Checkout />
              </Suspense>
            }
          />
          <Route
            path="/checkout/success"
            element={
              <Suspense fallback={<Loading />}>
                <CheckoutSuccess />
              </Suspense>
            }
          />
          <Route
            path="/checkout/failed"
            element={
              <Suspense fallback={<Loading />}>
                <CheckoutFail />
              </Suspense>
            }
          />
          <Route
            path="/course/lectures"
            element={
              <Suspense fallback={<Loading />}>
                <DisplayLectures />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/courses"
          element={
            <Suspense fallback={<Loading />}>
              <Courses />
            </Suspense>
          }
        />
        <Route
          path="/course-description"
          element={
            <Suspense fallback={<Loading />}>
              <CourseDescription />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgottenPassword />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:resetToken"
          element={
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
