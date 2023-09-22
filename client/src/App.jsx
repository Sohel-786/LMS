import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
