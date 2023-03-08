import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";

function App() {
  const location = useLocation();
  console.log(location.search);
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/day" element={<Detail />} />
    // </Routes>
    <Home />
  );
}

export default App;
