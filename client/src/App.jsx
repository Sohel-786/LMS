import Aos from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router-dom";
import Aboutus from "./pages/Aboutus";
import Notfound from "./pages/Notfound";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";
import Courses from "./pages/Course/Courses";
import CourseDescription from "./pages/Course/CourseDescription";
import AuthRoute from "./components/AuthRoute";
import CreateCourse from "./pages/Course/CreateCourse";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgottenPassword from "./pages/ForgottenPassword";
import Checkout from "./pages/Subscribe/Checkout";
import CheckoutFail from "./pages/Subscribe/CheckoutFail";
import CheckoutSuccess from "./pages/Subscribe/CheckoutSuccess";
import { useEffect } from "react";
import DisplayLectures from "./pages/Lectures/DisplayLectures";
import AddLecture from "./pages/Lectures/AddLectures";
import AdminDashboard from "./pages/AdminDashboard";

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
