import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Aboutus from "./pages/Aboutus";
import Notfound from "./pages/Notfound";
import SignUp from "./pages/Signup";
import SignIn from './pages/SignIn'
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<Aboutus />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/denied" element={<Denied />}/>
        <Route path="*" element={<Notfound />}/>
      </Routes>
    </div>
  );
}

export default App;
