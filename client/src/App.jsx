import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";
import Aboutus from "./pages/Aboutus";
import Notfound from "./pages/Notfound";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<Aboutus />}/>
        <Route path="*" element={<Notfound />}/>
      </Routes>
    </div>
  );
}

export default App;
