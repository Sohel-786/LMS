import React , { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthRoute from "./components/AuthRoute";
const Aboutus = React.lazy(() => import("./pages/Aboutus"));
const Notfound = React.lazy(() => import("./pages/Notfound"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Denied = React.lazy(() => import("./pages/Denied"));
const Courses = React.lazy(() => import("./pages/Course/Courses"));
const CourseDescription = React.lazy(() => import("./pages/Course/CourseDescription"));
const CreateCourse = React.lazy(() => import("./pages/Course/CreateCourse"));
const Profile = React.lazy(() => import("./pages/Profile"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const ForgottenPassword = React.lazy(() => import("./pages/ForgottenPassword"));
const Checkout = React.lazy(() => import("./pages/Subscribe/Checkout"));
const CheckoutFail = React.lazy(() => import("./pages/Subscribe/CheckoutFail"));
const CheckoutSuccess = React.lazy(() => import("./pages/Subscribe/CheckoutSuccess"));
const DisplayLectures = React.lazy(() => import("./pages/Lectures/DisplayLectures"));
const AddLecture = React.lazy(() => import("./pages/Lectures/AddLectures"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));

function App() {
  useEffect(() => {
    Aos.init();
  });

  return (
    <div className="mx-auto max-w-[1490px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />

        <Route element={<AuthRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/course-create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<AuthRoute allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/failed" element={<CheckoutFail />} />
          <Route path="/course/lectures" element={<DisplayLectures />} />
        </Route>

        <Route path="/courses" element={<Courses />} />
        <Route path="/course-description" element={<CourseDescription />} />
        <Route path="/forgot-password" element={<ForgottenPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
