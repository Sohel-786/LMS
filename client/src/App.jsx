import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Aboutus from "./pages/Aboutus";
import Notfound from "./pages/Notfound";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";
import Courses from "./pages/Course/Courses";
import CourseDescription from "./pages/Course/CourseDescription";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-description" element={<CourseDescription />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
