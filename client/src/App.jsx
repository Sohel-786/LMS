import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";
import Aboutus from "./pages/Aboutus";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<Aboutus />}/>
      </Routes>
    </div>
  );
}

export default App;
